import React, {useState} from "react";
import Navbar from "/src/components/Navbar";
import Voltar from "/src/components/Btnvoltar.jsx";


const Homepag = () => {
  const [usuario] = useState(() => {
    const usuarioSalvo = localStorage.getItem("usuario");
    return usuarioSalvo ? JSON.parse(usuarioSalvo) : null;
  });

  return (
    <div>
      <Navbar />
      <h1>Bem vindo</h1>

      <p>
              <strong>Olá,</strong> {usuario?.nome} <strong> !</strong>
            </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis, non
        nulla molestiae animi dignissimos ullam magnam in nesciunt
        exercitationem quaerat sit suscipit saepe tenetur voluptatibus! Alias
        eligendi distinctio tempore nulla.
      </p>
    </div>
  );
};

export default Homepag;
