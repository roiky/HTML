import { useState } from "react";

import "./App.css";
import SetHeader from "./components/SetHeader";
import CreateButton from "./components/Buttons";
import css from "./custom.module.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Navbar/Footer";

function App() {
    const Chocolates = [
        {
            id: 1,
            text: "React",
            img: "https://cdn.simpleicons.org/react?viewbox=auto",
            url: "https://www.google.com/search?q=react",
        },
        {
            id: 2,
            text: "JavaScript",
            img: "https://cdn.simpleicons.org/JavaScript?viewbox=auto",
            url: "https://www.google.com/search?q=JavaScript",
        },
        {
            id: 3,
            text: "Python",
            img: "https://cdn.simpleicons.org/Python?viewbox=auto",
            url: "https://www.google.com/search?q=Python",
        },
        {
            id: 4,
            text: "TypeScript",
            img: "https://cdn.simpleicons.org/TypeScript?viewbox=auto",
            url: "https://www.google.com/search?q=TypeScript",
        },
        {
            id: 5,
            text: "MySQL",
            img: "https://cdn.simpleicons.org/MySQL?viewbox=auto",
            url: "https://www.google.com/search?q=MySQL",
        },
        {
            id: 6,
            text: "Netflix",
            img: "https://cdn.simpleicons.org/Netflix?viewbox=auto",
            url: "https://www.google.com/search?q=Netflix",
        },
        {
            id: 7,
            text: "WhatsApp",
            img: "https://cdn.simpleicons.org/WhatsApp?viewbox=auto",
            url: "https://www.google.com/search?q=WhatsApp",
        },
        {
            id: 8,
            text: "Instagram",
            img: "https://cdn.simpleicons.org/Instagram?viewbox=auto",
            url: "https://www.google.com/search?q=Instagram",
        },
        {
            id: 9,
            text: "Twitter (X)",
            img: "https://cdn.simpleicons.org/x?viewbox=auto",
            url: "https://www.google.com/search?q=Twitter",
        },
        {
            id: 10,
            text: "Facebook",
            img: "https://cdn.simpleicons.org/Facebook?viewbox=auto",
            url: "https://www.google.com/search?q=Facebook",
        },
    ];

    return (
        <>
            <Navbar />
            <div className="headersDiv">
                <SetHeader text="Welcome to Roei's React test page!" color="#819A91" />
            </div>
            <div className={css.buttonGrid}>
                {Chocolates.map((btn) => (
                    <CreateButton key={btn.id} {...btn} />
                ))}
            </div>

            <Footer version="0.1" />
        </>
    );
}

export default App;
