
import { GoogleGenerativeAI } from "@google/generative-ai";


export function Section2() {

    const genAI = new GoogleGenerativeAI("AIzaSyCQ8QHQzPIZfn9IXZX_ePJoZzdrHiCpNH4");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro"});

    const run = async () =>{

        const prompt = "say poop";

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