import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState } from "react";
import React, { useRef } from 'react';

export function Section2({ route }) {
    

    /*const careerQuestions = [
        "Can you describe your passion for your career?",
        "What did you want to be as a child?",
        "Where do you see yourself in five years?",
        "What gives you the most stress?",
        "What are some risks you’ve taken that have impacted your life?"
    ];

    const relationQuestions = [
        "How does love make you feel?",
        "What do you feel when the time comes to say goodbye to someone?",
        "What is a day that you wish you could go back to, if there is one?",
        "What is your biggest fear?",
        "How often do you form meaningful connections?",
        "Describe a time when you felt truly understood by someone?",
        "How has a past connection shaped who you are today?"
    ];*/

    const emotions = {
        diffCareer: 0,
        currCareer: 0,
        romance: 0,
        friendship: 0,
    }

    const question = "are you happy with your career, or do you think you could've done better";

    const inputRef = useRef();
    const [Airesponse, setAiResponse] = useState(question);
    const genAI = new GoogleGenerativeAI("AIzaSyAMXXAWbcURO3KB58f78hpgOOyg4toXgac");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const run = async (e) => {
        e.preventDefault()
        const prompt = inputRef.current.value;

        const categorize = async (prompt) => {
            const aiPrompt = "The question is: " + question + " And here is the user's response: " + prompt + " Based on their reply, can you respond with either happy, sad, or mad?";

            try {
                // const result = await model.generateContent(aiPrompt);
                // const response = await result.response;
                // const text = response.text();
                setAiResponse("Working");
            } catch (error) {
                if (error.response && error.response.status === 429) {
                    console.error("too many requests, wait or check ur quota");
                } else {
                    console.error("an error occured: ", error);
                }
            }
        }
        categorize(prompt);
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