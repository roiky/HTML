export enum AppTheme {
    Dark = "dark",
    Light = "light"
}


export function getStyleByTheme(t: AppTheme) {
    if (t === AppTheme.Dark) return { background: "black", color: "white" }
    return { background: "white", color: "black" }

}
export function ThemeSettings(props: { theme: AppTheme, setTheme: any }) {
    const theme = props.theme;
    const setTheme = props.setTheme;

    return <div>
        <button onClick={() => {
            if (theme === AppTheme.Light) {
                setTheme(AppTheme.Dark)
            } else {
                setTheme(AppTheme.Light)
            }
        }}>{theme}</button>
    </div>
}