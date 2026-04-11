import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;
        const url = formData.get("url") as string;

        if (!file && !url) {
            return NextResponse.json(
                { error: "No video or URL provided" },
                { status: 400 }
            );
        }

        // For now: just simulate transcript input
        const inputText = url
            ? `Summarize this YouTube video: ${url}`
            : "Summarize this uploaded video.";

        const summary = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "user",
                    content: inputText,
                },
            ],
        });

        return NextResponse.json({
            summary: summary.choices[0].message.content,
        });

    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        );
    }
}