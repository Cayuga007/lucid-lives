import React, { useState, useRef, useEffect } from 'react';
import './Section1_shapes.css'

const message_list = [
    "hey",
    "are you still up?",
    ["yeah, what's up?",
        "that's good to hear",
        "im doing good too"
    ],
    ["no... sleeping emoji",
        "WELL THEN WAKE UP!!",
        "jk haha"
    ],
    "i've just been overthinking everything...",
    "grad is coming up and i'm really scared",
    ["yeah, me too",
        ["i don't know if i picked the right major to study",
            "yeah me too..."
        ],
        ["i don’t know what i’m gonna do afterwards",
            "yeah me too..."
        ],
        ["i’m scared of losing you",
            "aww, thanks :)",
            "i don't want to lose you either"
        ],
        ["i'm gonna miss all my friends",
            "me too!",
            "i'm also not that good at keeping in touch..."
        ]
    ],
    ["i'm not too worried",
        "Really? Wow, you must have things sorted out huh",
    ],
    "ah, it’s getting late. I should probably try to sleep now",
    "thanks for chatting with me, i really needed this"
]

export function Section1_() {
    const [position, setPosition] = useState(0)
    const [messagesDisplayed, setMessagesDisplayed] = useState({
        "dog": true,
        "cat": false
    })

    useEffect(() => {
        
    }, [])

    return (
        <>
            {messagesDisplayed.map((message, index) => {
                <label>{message}</label>
            })}
        </>
    )
}