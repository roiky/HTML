import SetHeader from "../components/SetHeader";

export default function About() {
    return (
        <>
            <div className="pageWrapper">
                <div className="headersDiv">
                    <SetHeader text="Welcome to ABOUT test page!" color="black" />
                </div>

                <p>
                    Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum
                    tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas
                    semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.
                </p>
            </div>
        </>
    );
}
