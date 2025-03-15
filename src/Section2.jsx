
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState } from "react";

export function Section2() {

    const [response, setResponse] = useState("")
    const genAI = new GoogleGenerativeAI("AIzaSyCQ8QHQzPIZfn9IXZX_ePJoZzdrHiCpNH4");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro"});

    const run = async () =>{

        const prompt = "how was your day";

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        console.log(text);

        setResponse(response);
    }
    return (
        <>
            <label>Section 3</label>
            <br></br>
            <label htmlFor="inputbox">Write to the bot</label>
            <input type="text" id="inputbox" name="inputbox"></input>
            <form onSubmit ={run}>
                <button type="submit">Get response</button>
            </form>
            <br></br>

            <output name="out" htmlFor="response">{response}</output>
        </>
    )
}