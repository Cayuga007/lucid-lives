import { GoogleGenerativeAI } from "@google/generative-ai";
import { useEffect, useState } from "react";
import React, { useRef } from 'react';

const route = "career"
const careerQuestions = [
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
];

export function Section2({ route_ }) {
    const [routeQuestions, setRouteQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answer, setAnswer] = useState("");
    const [options, setOptions] = useState([]);

    const [diffCareer, setDiffCareer] = useState(0);
    const [currCareer, setCurrCareer] = useState(0);
    const [romance, setRomance] = useState(0);
    const [friendship, setFriendship] = useState(0);

    const genAI = new GoogleGenerativeAI("AIzaSyAMXXAWbcURO3KB58f78hpgOOyg4toXgac");
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    useEffect(() => {
        switch(route) {
            case "career":
                setRouteQuestions(careerQuestions);
                setOptions(["diff", "curr"]);
                break;
            case "relation":
                setRouteQuestions(relationQuestions);
                setOptions(["romance", "friendship"]);
                break;
        }
     }, [])

    const submitAnswer = async (e) => {
        e.preventDefault()

        const categorize = async (prompt) => {

            const aiPrompt = "The question is: " + currentQuestion + " And here is the user's response: " + answer + " Based on their reply, can you respond with either " + options[0] + " or " + options[1] + "?";

            try {
                const result = await model.generateContent(aiPrompt);
                const response = await result.response;
                const text = response.text();
                if (route === "career") {
                    if (text === "diff") {
                        setDiffCareer(diffCareer + 1);
                    } else if (text === "curr") {
                        setCurrCareer(currCareer + 1);
                    }
                } else {
                    if (text === "romance") {
                        setRomance(romance + 1);
                    } else if (text === "friendship") {
                        setFriendship(friendship + 1);
                    }
                }
            } catch (error) {
                if (error.response && error.response.status === 429) {
                    console.error("too many requests, wait or check ur quota");
                } else {
                    console.error("an error occured: ", error);
                }
            }
        }

        categorize(prompt);

        setCurrentQuestion(currentQuestion + 1);
        setAnswer("");
        if (currentQuestion === routeQuestions.length) {
            if (route == "career") {
                if (diffCareer > currCareer) {
                    // go to section 4 and pass diff
                } else {
                    // go to section 4 and pass curr
                }
            } else {
                if (romance > friendship) {
                    // go to section 4 and pass romance
                } else {
                    // go to section 4 and pass friendship
                }
            }
        }
    }


    return (
        <>
            <label>{routeQuestions[currentQuestion]}</label>
            <form onSubmit={submitAnswer}>
                <label>Your response:
                    <input
                        type="text"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                    />
                </label>
            </form>
        </>
    )
}