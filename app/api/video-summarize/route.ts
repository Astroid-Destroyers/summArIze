import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import OpenAI from "openai";
import { YoutubeTranscript } from "youtube-transcript";

export async function POST(req: Request) {
    try {
        const formData = await req.formData();

        const file = formData.get("file") as File | null;
        const url = formData.get("url") as string | null;
        const transcript = formData.get("transcript") as string | null;

        // ❗ Validate input
        if (!file && !url && !transcript) {
            return NextResponse.json(
                { error: "No input provided" },
                { status: 400 }
            );
        }

        // 🧠 Decide what to summarize
        let inputText = "";

        // ✅ 1. If transcript is provided
        if (transcript) {
            inputText = transcript;
        }

        // ✅ 2. If YouTube URL is provided → fetch REAL transcript
        else if (url) {
            console.log("YouTube URL received:", url);

            try {
                const transcriptArray =
                    await YoutubeTranscript.fetchTranscript(url);

                const fullTranscript = transcriptArray
                    .map((item) => item.text)
                    .join(" ");

                inputText = fullTranscript;
            } catch (err) {
                console.error("Transcript fetch failed:", err);

                return NextResponse.json(
                    { error: "Failed to fetch YouTube transcript" },
                    { status: 500 }
                );
            }
        }

        // ✅ 3. If file is uploaded (placeholder for now)
        else if (file) {
            console.log("File received:", file.name);
            inputText = "Summarize this uploaded video.";
        }

        let summaryText = "";
        const openAiKey = process.env.OPENAI_API_KEY;
        const anthropicKey = process.env.ANTHROPIC_API_KEY;

        if (!openAiKey && !anthropicKey) {
            return NextResponse.json(
                {
                    error:
                        "Missing AI credentials. Set OPENAI_API_KEY or ANTHROPIC_API_KEY.",
                },
                { status: 500 }
            );
        }

        // 🔥 Try OpenAI first
        try {
            if (!openAiKey) {
                throw new Error("OPENAI_API_KEY is not configured");
            }

            const openai = new OpenAI({ apiKey: openAiKey });

            const summary = await openai.chat.completions.create({
                model: "gpt-4o-mini",
                messages: [
                    {
                        role: "user",
                        content: `Summarize this:\n\n${inputText}`,
                    },
                ],
            });

            summaryText = summary.choices[0].message.content || "";
        }

        // 🔁 Fallback to Anthropic
        catch (openaiError) {
            console.error(
                "OpenAI failed, falling back to Anthropic:",
                openaiError
            );

            if (!anthropicKey) {
                return NextResponse.json(
                    {
                        error:
                            "OpenAI failed and ANTHROPIC_API_KEY is missing.",
                    },
                    { status: 500 }
                );
            }

            const anthropic = new Anthropic({ apiKey: anthropicKey });

            const message = await anthropic.messages.create({
                model: "claude-3-5-sonnet-20240620",
                max_tokens: 4096,
                messages: [{ role: "user", content: inputText }],
            });

            summaryText =
                message.content[0].type === "text"
                    ? message.content[0].text
                    : "";
        }

        return NextResponse.json({
            summary: summaryText,
        });
    } catch (error) {
        console.error("ERROR:", error);

        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        );
    }
}