import "./App.css";
import NewCountryForm from "./components/newCountry-app";
import CountriesPage from "./components/pages/countries";
import { WhatsYourName } from "./components/whats-your-name";
import { HowYouLook } from "./components/whats-your-name/how-you-look";

function App() {
    return (
        <>
            <NewCountryForm />
            <CountriesPage />
            <WhatsYourName />
            <HowYouLook />
        </>
    );
}
export default App;
