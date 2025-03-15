import { useEffect, useState } from "react"

const route = "different_career" // This is a placeholder for the actual route
const different_career_questions = [
    "Dog",
    "Cat",
]
const current_career_questions = [
    "Bear",
    "Bunny",
]
const romance_questions = [
    "Bear",
    "Bunny",
]
const friendship_questions = [
    "Bear",
    "Bunny",
]

export function Section3({ route_ }) {
    const [routeQuestions, setRouteQuestions] = useState([])
    const [currentQuestion, setCurrentQuestion] = useState(0)

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
    }, [])

    const submitAnswer = (e) => {
        e.preventDefault()
        // Do something with the answer
        setCurrentQuestion(currentQuestion + 1)
    }

    return (
        <>
            <label>{routeQuestions[currentQuestion]}</label>
            <form>
                <label>Enter your name:
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
            </form>
        </>
    )
}