import { createContext, useState } from "react";

// @ts-ignore
export const ThemeContext =

    createContext<{ theme: string | null, toggleTheme: Function }>({ theme: null, toggleTheme: () => { } })

export function ThemeProvider(props: { children: any }) {
    const [theme, setTheme] = useState("white")

    const toggleTheme = () => {
        setTheme(theme === "black" ? "white" : "black")
    }

    return <ThemeContext.Provider value={{ theme, toggleTheme }}>
        {props.children}
    </ThemeContext.Provider>


}

{/* <ThemeProvider/> */ }
{/* <ThemeProvider>{}</ThemeProvider> */ }