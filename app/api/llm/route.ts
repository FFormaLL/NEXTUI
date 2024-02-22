import { HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

type ResponseData = {
    message: string
}

export async function POST(
    req: NextRequest,
) {
    // console.log(await req.json())
    const prompt = await req.json()
    const model = genAI.getGenerativeModel({
        model: "gemini-pro",
        safetySettings: [
            {
                category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
                threshold: HarmBlockThreshold.BLOCK_NONE
            },
            {
                category: HarmCategory.HARM_CATEGORY_HARASSMENT,
                threshold: HarmBlockThreshold.BLOCK_NONE
            },
            {
                category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
                threshold: HarmBlockThreshold.BLOCK_NONE
            },
            {
                category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
                threshold: HarmBlockThreshold.BLOCK_NONE
            }
        ]
    })

    

    const result = await model.generateContent(prompt.prompt);
    const text = result.response.text();
    console.log(text);

    return NextResponse.json({
        message: text
    })



}