import "./App.css";
import ShowMyName from "./components/name-app";
import ShowMyPic from "./components/pic-app";
import UsersPage from "./components/users-app/UsersPage";

function App() {
    return (
        <>
            {/* <ShowMyName name="Roei Kalimi" />
            <ShowMyPic source="https://media.istockphoto.com/id/1372997793/vector/cute-pembroke-welsh-corgi-dog-waving-paw-vector-illustration.jpg?s=612x612&w=0&k=20&c=T_GXRG6RG5Oy07rHGrR6XvKDQGY9mjeCmxjJ_oIVTGM=" /> */}

            <UsersPage />
        </>
    );
}

export default App;
