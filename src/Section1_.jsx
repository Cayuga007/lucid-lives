import React, { useState, useRef, useEffect } from 'react';
import './Section1_shapes.css'

const message_list = {
    "intro": {
        "friend_messages": [
            "Hey, how are you?",
            "Did you pass the exam?",
            "I did not",
        ],
        "responses": {
            "I passed": "response to option 1",
            "I failed": "response to option 2"
        }
    },
    "response to option 1": [
        "Wow congrats!",
        "I'm so happy for you",
    ],
}
const message_list2 = [
    "hey",
    "how are you",
    ["im good",
        "that's good to hear",
        "im doing good too"
    ],
    "im worried for the exam",
]

export function Section1_() {
    const [currentMessages_, setCurrentMessages] = useState({})
    const currentMessages = {
        "hello!": true, // True is friend
        "i hate you": false, // False is user
    }

    return (
        <>
            {Object.entries(currentMessages).map(([key, value]) => (
                    <li key={key.id}>
                        {value ? <label>DOG</label> : <label>CAT</label>}
                    </li>
            ))}
        </>
    )
}