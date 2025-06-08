import { useState } from "react"

type CardAppType = {
    title: string,
    image: string,
    action?: any
}
//  Hook useState


export function CardApp(props: CardAppType) {
    const [counter, setCounter] = useState<number>(0)
    return <div style={{ display: "flex", justifyContent: "center", alignContent: "center", alignItems: "center", flexDirection: "column", border: "1px solid black" }}>
        <h2> {props.title}</h2>
        <img height={300} width={300} src={props.image} />
        {counter !== 0 ? counter : null}
        <button onClick={() => {
            setCounter(counter + 1)
        }}> Click me!</button>
    </div>
}

