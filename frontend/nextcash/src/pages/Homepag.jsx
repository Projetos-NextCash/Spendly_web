import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "/src/components/Navbar";
import Despesa from "/src/components/Credesp";

const Homepag = () => {

  const navigate = useNavigate();

  const [usuario] = useState(() => {
    const usuarioSalvo = localStorage.getItem("usuario");
    return usuarioSalvo ? JSON.parse(usuarioSalvo) : null;
  });

  const user = () => {
    if (!usuario)
      return (
        <p>
          Olá, <a href="/login">gostaria de fazer login</a>
        </p>
      );

    return (
      <p>
        Olá, {usuario.nome} <a href="/perfil">ver perfil</a>
      </p>
    );
  };

  const [despesas, setDespesas] = useState(false);

  // NOVA CONST
  const criarDespesa = () => {
    if (!usuario) {
      navigate("/login");
      return;
    }

    setDespesas(true);
  };

  return (
    <div>
      <Navbar />

      <h1>Bem vindo</h1>

      <div>{user()}</div>

      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis, non
        nulla molestiae animi dignissimos ullam magnam in nesciunt
        exercitationem quaerat sit suscipit saepe tenetur voluptatibus! Alias
        eligendi distinctio tempore nulla.
      </p>

      <button className="desp-btn" onClick={criarDespesa}>
        Criar despesa
      </button>

      {despesas && <Despesa onClose={() => setDespesas(false)} />}
    </div>
  );
};

export default Homepag;