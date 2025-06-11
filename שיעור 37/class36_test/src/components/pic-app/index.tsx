export default function ShowMyPic(props: { source: string }) {
    return (
        <div>
            <img src={props.source} alt="" />
        </div>
    );
}
