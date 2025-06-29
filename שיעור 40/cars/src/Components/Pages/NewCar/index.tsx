import axios from "axios";
import { useEffect, useMemo, useState } from "react";
const URL = "http://localhost:2200";

export function AddNewCar(): JSX.Element {
    const [iscarsLoading, setIscarsLoading] = useState<boolean>(false);
    const [inputState, setInputState] = useState<string>("");

    console.log("Do we have rendering?");
    const [name, setname] = useState("");
    const [price, setPrice] = useState("");
    const [type, settype] = useState("");
    const [imageURL, setimageURL] = useState("");

    type UserPayload = {
        name: string | undefined;
        price: string | undefined;
        type: string | undefined;
        image: string | undefined;
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!name || !price || !type || !imageURL) {
            return alert("missing someting!");
        }

        const newCar = {
            name,
            price: `$${price}`,
            type,
            imageURL,
        };

        // Clear form inputs
        setname("");
        setPrice("");
        settype("");
        setimageURL("");

        //axios
        addNewCarToAPI({
            name: newCar.name,
            price: newCar.price,
            type: newCar.type,
            image: newCar.imageURL,
        });
    };

    async function addNewCarToAPI(userPayload: UserPayload) {
        try {
            //setIsLoading(true);
            const response = await axios.post(`${URL}/cars`, userPayload);
            if (response.status === 200) {
                //navigate("/login");
                alert("car added succssesfully");
            }
        } catch (error) {
            alert("Something went wrong!");
        } finally {
            //setIsLoading(false);
        }
    }

    return (
        <div>
            <h1> Add New Car</h1>
            <div>
                <div>
                    <h2>Add Sale</h2>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label>Name:</label>
                            <input type="text" value={name} onChange={(e) => setname(e.target.value)} />
                        </div>
                        <div>
                            <label>Price:</label>
                            <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} />
                        </div>
                        <div>
                            <label>Type:</label>
                            <input type="text" value={type} onChange={(e) => settype(e.target.value)} />
                        </div>
                        <div>
                            <label>Image:</label>
                            <input type="text" value={imageURL} onChange={(e) => setimageURL(e.target.value)} />
                        </div>
                        <button type="submit">Add Car</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
