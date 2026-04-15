"use client";

import { useState } from "react";

export default function VideoPage() {
    const [transcript, setTranscript] = useState("");
    const [summary, setSummary] = useState("");
    const [url, setUrl] = useState("");
    const [file, setFile] = useState<File | null>(null);

    const handleSummarize = async () => {
        // validation
        if (!transcript && !url && !file) {
            alert("Please upload a file, paste a link, or enter transcript");
            return;
        }

        const formData = new FormData();

        if (file) {
            formData.append("file", file);
        }

        if (url) {
            formData.append("url", url);
        }

        if (transcript) {
            formData.append("transcript", transcript);
        }

        const res = await fetch("/api/video-summarize", {
            method: "POST",
            body: formData,
        });

        const data = await res.json();
        setSummary(data.summary || data.message);
    };

    return (
        <div className="p-6 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold mb-4 text-center">
                Video Summarizer
            </h1>

            {/* FILE UPLOAD */}
            <input
                type="file"
                accept="video/mp4"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="mb-4 w-full"
            />

            {/* OR */}
            <p className="text-center text-gray-400 mb-2">OR</p>

            {/* YOUTUBE LINK */}
            <input
                type="text"
                placeholder="Paste YouTube link..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full p-2 border rounded mb-4"
            />

            {/* OR */}
            <p className="text-center text-gray-400 mb-2">OR</p>

            {/* TRANSCRIPT */}
            <textarea
                className="w-full p-2 border rounded mb-4"
                placeholder="Paste video transcript here..."
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
            />

            {/* BUTTON */}
            <button
                onClick={handleSummarize}
                className="bg-purple-500 text-white px-4 py-2 rounded w-full"
            >
                Generate Summary
            </button>

            {/* OUTPUT */}
            {summary && (
                <div className="mt-4 p-4 border rounded">
                    <h2 className="font-bold">Summary:</h2>
                    <p>{summary}</p>
                </div>
            )}
        </div>
    );
}