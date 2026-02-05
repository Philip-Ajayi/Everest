"use client";

import React, { useState, useRef } from 'react';
import { Upload, Link as LinkIcon, FileText, Loader2, Sparkles, Youtube } from 'lucide-react';

/**
 * DEVELOPER CONFIGURATION
 * These YouTube URLs provide the structural framework (B-STAR method) 
 * for the personal statement generation.
 */
const REFERENCE_VIDEOS = [
  "https://www.youtube.com/watch?v=Brx7McZdMaQ",
  "https://www.youtube.com/watch?v=niRB1LcCBlk"
];

const API_KEY = process.env.NEXT_PUBLIC_API_KEY; // Execution environment provides the key

export default function App() {
  const [jobUrl, setJobUrl] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const readFileAsText = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsText(file);
    });
  };

  const generateStatement = async () => {
    if (!jobUrl || !file) {
      setError("Please provide both a Job URL and your CV.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const cvText = await readFileAsText(file);

      // ENGINEERED PROMPT
      // This prompt forces the AI to use the B-STAR method mentioned in the reference videos
      const systemPrompt = `
        You are an expert Career Coach and Professional Writer. 
        Your task is to generate a highly tailored personal statement based on a User's CV and a Job Description URL.
        
        REFERENCE FRAMEWORK:
        You must follow the "B-STAR" method identified in the training videos (${REFERENCE_VIDEOS.join(', ')}):
        1. BELIEF: Start with a personal connection or philosophy regarding the role.
        2. SITUATION: Concise context (Who, What, Where, When, Why).
        3. TASK: Specific responsibilities and expectations.
        4. ACTION: Detailed steps taken and rationale (The most important part).
        5. RESULT: Quantifiable outcomes and lessons learned.

        OUTPUT REQUIREMENTS:
        - Use clean HTML tags for formatting (e.g., <h3> for headers, <p> for paragraphs, <strong> for emphasis).
        - Maintain a professional yet authentic tone.
        - Target approximately 250-500 words unless the CV suggests otherwise.
        - Ensure every claim in the statement is grounded in the provided CV but mapped to the Job Description requirements.
      `;

      const userQuery = `
        JOB DESCRIPTION CONTEXT: ${jobUrl}
        USER CV DATA: ${cvText}
        
        Please generate the personal statement now.
      `;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: userQuery }] }],
          systemInstruction: { parts: [{ text: systemPrompt }] }
        })
      });

      if (!response.ok) throw new Error("Failed to communicate with AI");

      const data = await response.json();
      const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (generatedText) {
        setResult(generatedText);
      } else {
        throw new Error("AI returned an empty response.");
      }

    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-12 text-center">
          <div className="inline-flex items-center justify-center p-3 bg-blue-600 rounded-2xl mb-4 shadow-lg shadow-blue-200">
            <Sparkles className="text-white w-8 h-8" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-2">
            AI Personal Statement Pro
          </h1>
          <p className="text-slate-500 text-lg">
            Engineering your career story using the B-STAR framework.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Input Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
                <LinkIcon size={16} /> Job Information
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Job Description URL</label>
                  <input 
                    type="text"
                    placeholder="https://company.com/jobs/designer..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                    value={jobUrl}
                    onChange={(e) => setJobUrl(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Upload CV (Text/PDF/Doc)</label>
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
                      file ? 'border-blue-400 bg-blue-50' : 'border-slate-200 hover:border-blue-400 hover:bg-slate-50'
                    }`}
                  >
                    <input 
                      type="file" 
                      className="hidden" 
                      ref={fileInputRef} 
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx,.txt"
                    />
                    <Upload className={`mx-auto mb-2 ${file ? 'text-blue-500' : 'text-slate-400'}`} />
                    <span className="text-sm text-slate-600 block truncate">
                      {file ? file.name : "Click to upload CV"}
                    </span>
                  </div>
                </div>

                <button
                  onClick={generateStatement}
                  disabled={isLoading}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-semibold py-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 group"
                >
                  {isLoading ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <>
                      Generate Statement
                      <Sparkles size={18} className="group-hover:rotate-12 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Reference Context */}
            <div className="bg-slate-800 p-6 rounded-2xl text-white shadow-xl">
              <h3 className="flex items-center gap-2 text-sm font-bold mb-4 text-blue-400 uppercase tracking-widest">
                <Youtube size={18} /> Training Context
              </h3>
              <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                The AI is currently trained using principles from the following career strategy videos:
              </p>
              <ul className="space-y-2">
                {REFERENCE_VIDEOS.map((url, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-[10px] bg-slate-700 p-2 rounded-lg truncate">
                    <span className="text-blue-400 font-mono">#{idx+1}</span>
                    <span className="opacity-70">{url}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Output Section */}
          <div className="lg:col-span-3">
            <div className="bg-white min-h-[500px] rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
              <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <FileText className="text-blue-600" size={20} />
                  <span className="font-semibold text-slate-700">Generated Statement</span>
                </div>
                {result && (
                  <button 
                    onClick={() => {
                      const el = document.getElementById('result-area');
                      if (el) {
                        const blob = new Blob([el.innerText], {type: 'text/plain'});
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = "Personal_Statement.txt";
                        a.click();
                      }
                    }}
                    className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors uppercase tracking-tighter"
                  >
                    Download .txt
                  </button>
                )}
              </div>
              
              <div className="flex-1 p-8 relative">
                {error && (
                  <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-xl mb-4 text-sm">
                    {error}
                  </div>
                )}

                {!result && !isLoading && !error && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-300">
                    <FileText size={64} className="mb-4 opacity-20" />
                    <p className="font-medium">No statement generated yet</p>
                  </div>
                )}

                {isLoading && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 z-10">
                    <div className="flex flex-col items-center gap-4">
                      <div className="relative">
                        <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
                        <Sparkles className="absolute -top-1 -right-1 text-blue-400 w-5 h-5 animate-pulse" />
                      </div>
                      <p className="text-slate-500 font-medium animate-pulse">Analyzing CV & Job Details...</p>
                    </div>
                  </div>
                )}

                {result && (
                  <div 
                    id="result-area"
                    className="prose prose-slate max-w-none animate-in fade-in duration-700"
                    dangerouslySetInnerHTML={{ __html: result }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="mt-12 text-center text-slate-400 text-xs">
        &copy; {new Date().getFullYear()} AI Personal Statement Engine &bull; Powered by Gemini 2.5
      </footer>
    </div>
  );
}
