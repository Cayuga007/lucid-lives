import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState } from "react";
import React, { useRef } from 'react';

export function Section2() {

    const inputRef = useRef();
    const [Airesponse, setAiResponse] = useState("");
    const genAI = new GoogleGenerativeAI("AIzaSyCQ8QHQzPIZfn9IXZX_ePJoZzdrHiCpNH4");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const run = async (e) => {
        e.preventDefault()
        const prompt = inputRef.current.value;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        setAiResponse(text);
    }

    return (
        <>
            <label>Section 3</label>
            <br></br>
            <form onSubmit={run}>
                <label htmlFor="inputbox">Write to the bot
                    <input type="text" ref={inputRef}></input>
                </label>
                <button type="submit">Get response</button>
            </form>
            <br></br>

            <label>{Airesponse}</label>
            <output name="out" htmlFor="response"></output>
        </>
    )
}