"use client";

import { useState } from "react";

export default function PersonalStatementPage() {
  const [jobUrl, setJobUrl] = useState("");
  const [youtubeUrl, setYoutubeUrl] = useState("https://www.youtube.com/watch?v=Brx7McZdMaQ");
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [statement, setStatement] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!jobUrl || !cvFile) {
      setError("Job URL and CV are required.");
      return;
    }

    setLoading(true);
    setError(null);
    setStatement(null);

    try {
      const formData = new FormData();
      formData.append("jobDescriptionUrl", jobUrl);
      formData.append("youtubeUrl", youtubeUrl);
      formData.append("cv", cvFile);

      const res = await fetch("/api/statement", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const err = await res.json();
        setError(err.error || "Something went wrong");
        setLoading(false);
        return;
      }

      const data = await res.json();
      setStatement(data.statement);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
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
            className="w-full border p-2 rounded mt-1"
            required
          />
        </label>

        <label>
          YouTube URL (optional):
          <input
            type="url"
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
            className="w-full border p-2 rounded mt-1"
          />
        </label>

        <label>
          Upload CV (PDF):
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setCvFile(e.target.files?.[0] || null)}
            className="w-full mt-1"
            required
          />
        </label>

        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Statement"}
        </button>
      </form>

      {error && <p className="mt-4 text-red-600">{error}</p>}

      {statement && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Generated Personal Statement</h2>
          <div
            className="border p-4 rounded bg-gray-50"
            dangerouslySetInnerHTML={{ __html: statement }}
          />
        </div>
      )}
    </div>
  );
}
