import "./Kitten.css";

type KittenProps = {
    name: string;
    age: number;
    imageSource: string;
};

export function Kitten(props: KittenProps): JSX.Element {

    return (
        <div className="Kitten">
            <h3>Cute Kitten 🐱</h3>
            <span>Name: {props.name}, Age: {props.age}</span>
            <br />

            <img src={props.imageSource} />

        </div>
    );
}
