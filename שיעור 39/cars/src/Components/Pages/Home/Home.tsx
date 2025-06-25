import axios from "axios";
import "./Home.css";

export function Home(): JSX.Element {
    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/sales`);
            if (response.status === 200) {
                console.log(response.data);
            }
        } catch (error) {
            console.log("Something went wrong");
        } finally {
            //something something
        }
    };
    return (
        <div className="Home">
            <h1> Home</h1>
            <button
                onClick={() => {
                    fetchData();
                }}
            >
                {" "}
                Get data?{" "}
            </button>
            <div>{/* print it to console.log or here */}</div>
        </div>
    );
}
