import "./App.css";
import { Articulos } from "./components/pages/Articulos";
import { Crear } from "./components/pages/Crear";
import { Inicio } from "./components/pages/Inicio";

function App() {
  return (
    <>
      <h1>Blog</h1>
      <Inicio />
      <Articulos />
      <Crear />
    </>
  );
}

export default App;
