import './App.css';
import { Kitten } from './Kitten/Kitten';
import kitten1Source from "./Assets/Images/kitten1.jpg";
import kitten2Source from "./Assets/Images/kitten2.jpg";
import kitten3Source from "./Assets/Images/kitten3.jpg";
import { Copyrights } from './Copyrights/Copyrights';

function App() {

    function isWeekend(): boolean {
        const now = new Date();
        const day = now.getDay() + 1;
        return day >= 6;
    }

    return (
        <div className="App">

            <h1>Welcome to Kittens Shelter</h1>

            { isWeekend() ? <p>Only now - on weekend - 20% discount on all kittens!</p> : null }

            { isWeekend() && <p>Only now - on weekend - children fun with animals!</p> }

            <hr />

            <Kitten name="Cyber" age={2} imageSource={kitten1Source} />
            <Kitten name="Oscar" age={3} imageSource={kitten2Source} />
            <Kitten name="Hertzel" age={5} imageSource={kitten3Source} />

            <Copyrights />
            
        </div>
    );
}

export default App; // Semicolon Injection
