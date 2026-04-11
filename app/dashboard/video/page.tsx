"use client";

import { useState } from "react";

export default function VideoPage() {
    const [transcript, setTranscript] = useState("");
    const [summary, setSummary] = useState("");

    const handleSummarize = async () => {
        const res = await fetch("/api/video-summarize", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ transcript }),
        });

        const data = await res.json();
        setSummary(data.summary);
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Video Summarizer</h1>

            <textarea
                className="w-full p-2 border rounded mb-4"
                placeholder="Paste video transcript here..."
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
            />

            <button
                onClick={handleSummarize}
                className="bg-purple-500 text-white px-4 py-2 rounded"
            >
                Summarize
            </button>

            {summary && (
                <div className="mt-4 p-4 border rounded">
                    <h2 className="font-bold">Summary:</h2>
                    <p>{summary}</p>
                </div>
            )}
        </div>
    );
}