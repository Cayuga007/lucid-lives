import { GoogleGenerativeAI } from "@google/generative-ai";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";

const route = "career";
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

  const navigate = useNavigate();

  const genAI = new GoogleGenerativeAI("AIzaSyAMXXAWbcURO3KB58f78hpgOOyg4toXgac");
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

  useEffect(() => {
    switch (route) {
      case "career":
        setRouteQuestions(careerQuestions);
        setOptions(["diff", "curr"]);
        break;
      case "relation":
        setRouteQuestions(relationQuestions);
        setOptions(["romance", "friendship"]);
        break;
      default:
        setRouteQuestions([]);
    }
  }, []);

  const submitAnswer = async (e) => {
    e.preventDefault();

    const categorize = async () => {
      // Using the current question text for clarity in the prompt.
      const aiPrompt =
        "The question is: " +
        routeQuestions[currentQuestion] +
        " And here is the user's response: " +
        answer +
        " Based on their reply, can you respond with either " +
        options[0] +
        " or " +
        options[1] +
        "?";
      try {
        const result = await model.generateContent(aiPrompt);
        const response = await result.response;
        const text = (await response.text()).trim();
        if (route === "career") {
          if (text === "diff") {
            setDiffCareer((prev) => prev + 1);
          } else if (text === "curr") {
            setCurrCareer((prev) => prev + 1);
          }
        } else {
          if (text === "romance") {
            setRomance((prev) => prev + 1);
          } else if (text === "friendship") {
            setFriendship((prev) => prev + 1);
          }
        }
      } catch (error) {
        if (error.response && error.response.status === 429) {
          console.error("Too many requests, wait or check your quota");
        } else {
          console.error("An error occurred: ", error);
        }
      }
    };

    await categorize();

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < routeQuestions.length) {
      setCurrentQuestion(nextQuestion);
      setAnswer("");
    } else {
      // All questions answered, determine which category wins and redirect to Section3.
      if (route === "career") {
        if (diffCareer > currCareer) {
          navigate("/Section3", { state: { route: "different_career" } });
        } else {
          navigate("/Section3", { state: { route: "current_career" } });
        }
      } else {
        if (romance > friendship) {
          navigate("/Section3", { state: { route: "romance" } });
        } else {
          navigate("/Section3", { state: { route: "friendship" } });
        }
      }
    }
  };

  return (
    <>
      <label>{routeQuestions[currentQuestion]}</label>
      <form onSubmit={submitAnswer}>
        <label>
          Your response:
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
        </label>
      </form>
    </>
  );
}
