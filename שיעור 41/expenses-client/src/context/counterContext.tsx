import { createContext, useState } from "react";

// @ts-ignore
export const CounterContext =

    createContext<{ counter: number, increment: Function }>({ counter: 0, increment: () => { } })

export function CounterProvider(props: { children: any }) {
    const [counter, setCounter] = useState(0)

    const increment = () => {
        setCounter(counter + 1)
    }

    return <CounterContext.Provider value={{ counter, increment }}>
        {props.children}
    </CounterContext.Provider>


}

{/* <ThemeProvider/> */ }
{/* <ThemeProvider>{}</ThemeProvider> */ }