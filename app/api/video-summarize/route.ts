import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
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

        let summaryText = "";

        try {
            const summary = await openai.chat.completions.create({
                model: "gpt-4o-mini",
                messages: [
                    {
                        role: "user",
                        content: inputText,
                    },
                ],
            });
            summaryText = summary.choices[0].message.content || "";
        } catch (openaiError) {
            console.error("OpenAI failed, falling back to Anthropic:", openaiError);
            const message = await anthropic.messages.create({
                model: "claude-3-5-sonnet-20240620",
                max_tokens: 4096,
                messages: [{ role: "user", content: inputText }],
            });
            summaryText = message.content[0].type === 'text' ? message.content[0].text : "";
        }

        return NextResponse.json({
            summary: summaryText,
        });

    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        );
    }
}