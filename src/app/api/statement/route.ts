import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

// Optional but recommended: force Node runtime (not Edge)
export const runtime = "nodejs";

const ai = new GoogleGenAI({
  // If you use an API key, pass it here or rely on env vars
  // apiKey: process.env.GOOGLE_API_KEY,
});

export async function GET() {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        "Compare the ingredients and cooking times from the recipes at https://www.foodnetwork.com/recipes/ina-garten/perfect-roast-chicken-recipe-1940592 and https://www.allrecipes.com/recipe/21151/simple-whole-roast-chicken/",
      ],
      config: {
        tools: [{ urlContext: {} }],
      },
    });

    return NextResponse.json({
      text: response.text,
      urlContextMetadata: response.candidates?.[0]?.urlContextMetadata,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to generate content" },
      { status: 500 }
    );
  }
}
