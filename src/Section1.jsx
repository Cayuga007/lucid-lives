import React, { useState } from 'react';
import './Section1_shapes.css';

const message_list = [
    "hey",
    "are you still up?",
    ["yeah, what's up?", "no sleeping emoji"],
    [
        ["im nervous", "can you talk to me"],
        ["WAKE UP", "jk"],
    ],
    "dogman",
    "catman",
    "bearman",
    ["option 1?", "option 2"],
    [
        ["HELLO", "BYE"],
        ["ROAR", "WOOF"],
    ],
];

export function Section1() {
    const [position, setPosition] = useState(2);
    const [messagesDisplayed, setMessagesDisplayed] = useState({
        "dog": true,
        "cat": true,
    });

    function addNextMessages(user_choice) {
        const friend_messages = message_list[position + 1][user_choice];

        for (let i = 0; i < friend_messages.length; i++) {
            setMessagesDisplayed((prevState) => ({
                ...prevState,
                [friend_messages[i]]: true,
            }));
        }

        let nextPosition = position + 1;
        while (nextPosition < message_list.length && !Array.isArray(message_list[nextPosition])) {
            nextPosition++;
        }
        setPosition(nextPosition); // Move to the next position
    }

    return (
        <>
            {Object.entries(messagesDisplayed).map(([key, value]) => (
                <div key={key}>
                    {key}: {value.toString()}
                </div>
            ))}
            {Array.isArray(message_list[position]) &&
                message_list[position].map((message, index) => (
                    <button key={index} onClick={() => addNextMessages(index)}>
                        {message}
                    </button>
                ))}
        </>
    );
}
