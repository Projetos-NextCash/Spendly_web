import { Routes, Route } from "react-router-dom"
import './styles/App.css'
import Homepag from "./pages/Homepag"
import Login from "./pages/Login"
import Cadastro from "./pages/Cadastro"
import Perfil from "/src/pages/Paguser";
import Recuperar from "/src/pages/Recpass";

function App() {
  return (
    <> 
      <Routes>
        <Route path="/" element={<Homepag/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/cadastro" element={<Cadastro/>} />
        <Route path="/perfil" element={<Perfil/>} />
        <Route path="/recuperar" element={<Recuperar/>} />
      </Routes>
    </>
  )
}

export default App
