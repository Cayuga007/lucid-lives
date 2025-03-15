import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

//dotenv.config();

export function Section2() {
    {  

    }

    const genAI = new GoogleGenerativeAI(process.env.API_KEY);

    const run = async () =>{
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const prompt = "tell me hello";

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        console.log(text);
    }

    run();
    return (
        <>
            <label>Section 3</label>
        </>
    )
}