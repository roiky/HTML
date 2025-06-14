export default function SetHeader(props: { text: string; color: string }) {
    return <h2 style={{ color: props.color }}>{props.text}</h2>;
}
