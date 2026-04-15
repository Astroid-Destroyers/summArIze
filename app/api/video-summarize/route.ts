export const runtime = "nodejs";

import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

function isNonEmptyString(value: unknown): value is string {
    return typeof value === "string" && value.trim().length > 0;
}

function normalizeRapidApiTranscript(data: any): string {
    if (isNonEmptyString(data?.transcription)) {
        return data.transcription.trim();
    }

    if (isNonEmptyString(data?.transcript)) {
        return data.transcript.trim();
    }

    if (Array.isArray(data?.transcript)) {
        const joined = data.transcript
            .map((item: any) => {
                if (typeof item === "string") return item;
                if (isNonEmptyString(item?.text)) return item.text;
                return "";
            })
            .filter(Boolean)
            .join(" ")
            .trim();

        if (joined) return joined;
    }

    if (isNonEmptyString(data?.text)) {
        return data.text.trim();
    }

    return "";
}

async function fetchYoutubeTranscript(url: string): Promise<string> {
    const host = process.env.RAPIDAPI_HOST;
    const key = process.env.RAPIDAPI_KEY;

    if (!host || !key) {
        return "";
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);

    try {
        const response = await fetch(`https://${host}/transcribe`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-rapidapi-key": key,
                "x-rapidapi-host": host,
            },
            body: JSON.stringify({ url }),
            signal: controller.signal,
        });

        const data = await response.json().catch(() => ({}));
        console.log("RapidAPI response:", data);

        if (!response.ok) {
            console.error("RapidAPI non-200 response:", response.status, data);
            return "";
        }

        return normalizeRapidApiTranscript(data);
    } catch (error) {
        console.error("RapidAPI request failed:", error);
        return "";
    } finally {
        clearTimeout(timeout);
    }
}

async function extractInputText(
    url: string | null,
    transcript: string | null,
    file: File | null
): Promise<{ inputText?: string; error?: string; status?: number }> {
    if (isNonEmptyString(transcript)) {
        return { inputText: transcript.trim() };
    }

    if (isNonEmptyString(url)) {
        const rapidTranscript = await fetchYoutubeTranscript(url);

        if (rapidTranscript) {
            return { inputText: rapidTranscript };
        }

        return {
            inputText: `
A user provided this YouTube link: ${url}

The transcript could not be retrieved from the external transcript service.
Please generate a useful high-level educational summary based on the likely topic and context signaled by the link, and be honest that this is a best-effort summary when source transcript access is unavailable.
`.trim(),
        };
    }

    if (file) {
        const mime = file.type || "";
        const lowerName = file.name.toLowerCase();

        const isTextLike =
            mime.startsWith("text/") ||
            lowerName.endsWith(".txt") ||
            lowerName.endsWith(".md") ||
            lowerName.endsWith(".csv") ||
            lowerName.endsWith(".json");

        const isAudioLike = mime.startsWith("audio/");

        const isVideoLike = mime.startsWith("video/");

        if (isTextLike) {
            const text = await file.text();
            if (!text.trim()) {
                return {
                    error: "The uploaded text file is empty.",
                    status: 400,
                };
            }

            return { inputText: text.trim() };
        }

        if (isAudioLike) {
            try {
                const transcription = await openai.audio.transcriptions.create({
                    file,
                    model: "whisper-1",
                });

                if (!transcription.text?.trim()) {
                    return {
                        error: "Audio transcription was empty.",
                        status: 400,
                    };
                }

                return { inputText: transcription.text.trim() };
            } catch (error) {
                console.error("Whisper transcription failed:", error);
                return {
                    error: "Failed to transcribe the uploaded audio file.",
                    status: 500,
                };
            }
        }

        if (isVideoLike) {
            return {
                error:
                    "Raw video upload is not enabled yet on the server. Upload an audio file, a transcript, or a text document instead.",
                status: 400,
            };
        }

        return {
            error:
                "Unsupported file type. Upload a text file, transcript, or audio file.",
            status: 400,
        };
    }

    return {
        error: "No input provided.",
        status: 400,
    };
}

function buildSummaryPrompt(inputText: string): string {
    return `
Summarize the following study content for a student.

Requirements:
- Start with a short overview.
- Then list the most important key concepts.
- Then explain the main ideas in simple language.
- Remove repetition.
- If the input is noisy or incomplete, still produce the best useful summary possible and say briefly when the source seems incomplete.
- Keep the output clean and readable.

CONTENT:
${inputText}
`.trim();
}

export async function POST(req: Request) {
    try {
        if (!process.env.OPENAI_API_KEY) {
            return NextResponse.json(
                { error: "OPENAI_API_KEY is missing." },
                { status: 500 }
            );
        }

        const formData = await req.formData();

        const file = formData.get("file") as File | null;
        const url = formData.get("url") as string | null;
        const transcript = formData.get("transcript") as string | null;

        const extracted = await extractInputText(url, transcript, file);

        if (extracted.error || !extracted.inputText) {
            return NextResponse.json(
                { error: extracted.error ?? "Unable to process input." },
                { status: extracted.status ?? 400 }
            );
        }

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            temperature: 0.3,
            messages: [
                {
                    role: "system",
                    content:
                        "You are an expert study assistant who writes clear, accurate, student-friendly summaries.",
                },
                {
                    role: "user",
                    content: buildSummaryPrompt(extracted.inputText),
                },
            ],
        });

        const summary =
            completion.choices[0]?.message?.content?.trim() ||
            "No summary was generated.";

        return NextResponse.json({ summary });
    } catch (error) {
        console.error("video-summarize route error:", error);

        return NextResponse.json(
            { error: "Something went wrong while generating the summary." },
            { status: 500 }
        );
    }
}