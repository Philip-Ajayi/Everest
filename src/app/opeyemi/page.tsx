"use client";

import { useState } from "react";

export default function PersonalStatementPage() {
  const [jobUrl, setJobUrl] = useState("");
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cvFile || !jobUrl) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("jobUrl", jobUrl);
    formData.append("cv", cvFile);

    const res = await fetch("/api/statement", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setResult(data.statement || "No statement generated.");
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Generate Personal Statement</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label>
          Job Description URL:
          <input
            type="url"
            value={jobUrl}
            onChange={(e) => setJobUrl(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </label>

        <label>
          Upload CV (PDF):
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => e.target.files && setCvFile(e.target.files[0])}
            className="border p-2 w-full"
            required
          />
        </label>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Statement"}
        </button>
      </form>

      {result && (
        <div className="mt-6 p-4 border rounded bg-gray-50">
          <h2 className="font-semibold mb-2">Personal Statement:</h2>
          <div dangerouslySetInnerHTML={{ __html: result }} />
        </div>
      )}
    </div>
  );
}
