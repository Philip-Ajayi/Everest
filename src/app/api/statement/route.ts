import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import * as fs from "fs";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    // Get job description URL from the form
    const jobDescriptionUrl = formData.get("jobDescriptionUrl")?.toString();
    if (!jobDescriptionUrl) {
      return NextResponse.json({ error: "Job description URL is required." }, { status: 400 });
    }

    // Get YouTube URL (optional)
    const youtubeUrl = formData.get("youtubeUrl")?.toString() || "https://www.youtube.com/watch?v=Brx7McZdMaQ";

    // Get uploaded CV
    const cvFile = formData.get("cv") as File;
    if (!cvFile) {
      return NextResponse.json({ error: "CV file is required." }, { status: 400 });
    }
    const cvBuffer = Buffer.from(await cvFile.arrayBuffer()).toString("base64");

    // Build Gemini content array
    const contents = [
      {
        text: `Create a personal statement based on:
        1. Job description at ${jobDescriptionUrl}
        2. Video guidance at ${youtubeUrl}
        3. User's CV document`
      },
      {
        inlineData: {
          mimeType: "application/pdf",
          data: cvBuffer
        }
      },
      {
        fileData: {
          fileUri: youtubeUrl
        }
      }
    ];

    // Call Gemini
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: contents,
      config: {
        tools: [{ urlContext: {} }],
        responseMimeType: "text/html" // structured HTML output
      }
    });

    // Return the personal statement HTML
    return NextResponse.json({ statement: response.text });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message || "Internal server error" }, { status: 500 });
  }
}
