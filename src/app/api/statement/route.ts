import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import * as fs from "fs";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const jobUrl = formData.get("jobUrl")?.toString();
    const cvFile = formData.get("cv") as File;

    if (!jobUrl || !cvFile) {
      return NextResponse.json({ error: "Job URL and CV file are required" }, { status: 400 });
    }

    // Convert uploaded CV to base64
    const cvBuffer = Buffer.from(await cvFile.arrayBuffer());
    const cvBase64 = cvBuffer.toString("base64");

    const youtubeUrls = [
      "https://www.youtube.com/watch?v=Brx7McZdMaQ",
      "https://www.youtube.com/watch?v=niRB1LcCBlk",
    ];

    const contents: any[] = [
      { fileData: { fileUri: jobUrl } },
      { inlineData: { mimeType: "application/pdf", data: cvBase64 } },
      ...youtubeUrls.map((url) => ({ fileData: { fileUri: url } })),
      { text: "Generate a personal statement in HTML format based on the job description, CV, and YouTube guides." }
    ];

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: contents,
      config: {
        responseMimeType: "application/json",
      },
    });

    // Return structured JSON
    return NextResponse.json({ statement: response.text });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
