import { useEffect, useState } from "react";
import "./Section3.css"; // Import the new CSS file

const route = "different_career"; // This is a placeholder for the actual route
const different_career_questions = [
  "If you could restart life, what kind of career would you follow?",
  "What friends and family would you be surrounded by?",
  "If you found success, what would be next? What happiness would you get from that?",
  "How does that align with your life right now? What can you do right now to make it align?"
];
const current_career_questions = [
  "Is there a moment in your career that you wish had gone differently? What was the moment?",
  "Why does that moment stick out to you?",
  "What would you have done differently?",
  "What can you change now to make sure that never happens again?"
];
const romance_questions = [
  "Is there a person in your life that you are interested in?",
  "Why are you interested in this person?",
  "What is stopping you from taking action?",
  "What can you change to make something happen?"
];
const friendship_questions = [
  "Is there a person in your life that you have disconnected from?",
  "What caused the two of you to disconnect?",
  "If the two of you reconnected, what kind of person would you want them to see you as?",
  "What can you do to become that kind of person?"
];

export function Section3({ route_ }) {
  const [routeQuestions, setRouteQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    switch (route) {
      case "different_career":
        setRouteQuestions(different_career_questions);
        break;
      case "current_career":
        setRouteQuestions(current_career_questions);
        break;
      case "romance":
        setRouteQuestions(romance_questions);
        break;
      case "friendship":
        setRouteQuestions(friendship_questions);
        break;
      default:
        setRouteQuestions([]);
    }
  }, []);

  const submitAnswer = (e) => {
    e.preventDefault();
    setAnswer("");
    setCurrentQuestion(currentQuestion + 1);
  };

  const questionText = routeQuestions[currentQuestion];
  const isComplete = !questionText;

  return (
    <div className="section3-background">
      <div className="section3-box">
        {isComplete ? (
          <p>These are the things that you want to change. So why not change them? Believe in yourself.</p>
        ) : (
          <>
            <p className="section3-question">{questionText}</p>
            <form onSubmit={submitAnswer} className="section3-form">
              <label className="section3-label">
                Your response:
                <input
                  type="text"
                  className="section3-input"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                />
              </label>
              <button type="submit" className="section3-button">
                Submit
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
