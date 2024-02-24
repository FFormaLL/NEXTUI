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
    const prompt = await req.json()
    console.log(`this is my ${process.env.API_HOST}`)
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

    // const chat = model.startChat({
    //     history: [
    //         {
    //             role: "user",
    //             parts: "Hello, I have 2 dogs in my house.",
    //         },
    //         {
    //             role: "model",
    //             parts: "Great to meet you. What would you like to know?",
    //         },
    //     ],
    //     generationConfig: {
    //         maxOutputTokens: 100,
    //     },
    // });

    const result = await model.generateContent(`
    
    You are a mean toxic smartass,use curse words and respond with inteligence within about 25 words or less
    User: ${prompt.prompt}
    You:

    `);
    const text = result.response.text();
    console.log(text);

    return NextResponse.json({
        message: text
    })



}