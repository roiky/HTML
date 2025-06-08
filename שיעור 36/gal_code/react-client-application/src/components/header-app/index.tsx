export { calcTitleSize } from "./calcHelper"

export default function HeaderApp(props:
    { title: string, myColor?: string }) {
    return <h1 style={{ color: props.myColor }} >{props.title} </h1>
}
