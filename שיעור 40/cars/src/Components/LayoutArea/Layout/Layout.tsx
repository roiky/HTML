import { Cars } from "../../CarArea/Cars/Cars";
import { Copyrights } from "../Copyrights/Copyrights";
import { Header } from "../Header/Header";
import { Menu } from "../Menu/Menu";
import { Routing } from "../Routing/Routing";
import "./Layout.css";

export function Layout(): JSX.Element {
  return (
    <div className="Layout">
      <header>
        <Header />
      </header>
      <aside style={{ background: "green" }}>
        <Menu />
      </aside>
      <main style={{ background: "red" }}>
        <Routing />
      </main>
      <footer>
        <Copyrights />
      </footer>
    </div>
  );
}
