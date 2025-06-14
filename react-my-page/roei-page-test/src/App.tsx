import { useState } from "react";

import "./App.css";
import SetHeader from "./components/SetHeader";
import CreateButton from "./components/Buttons";

function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            <div className="headersDiv">
                <SetHeader text="Welcome to my React test page!" color="orange" />
            </div>
            <div className="buttonsDiv">
                <CreateButton
                    text="React"
                    img="https://cdn.simpleicons.org/react?viewbox=auto"
                    url="https://www.google.com/search?q=react"
                />
                <CreateButton
                    text="JavaScript"
                    img="https://cdn.simpleicons.org/javascript?viewbox=auto"
                    url="https://www.google.com/search?q=javascript"
                />
                <CreateButton
                    text="Python"
                    img="https://cdn.simpleicons.org/python?viewbox=auto"
                    url="https://www.google.com/search?q=python"
                />
            </div>
        </>
    );
}

export default App;
