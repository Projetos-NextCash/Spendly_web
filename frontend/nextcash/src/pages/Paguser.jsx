import React, { useState } from "react";
import Navbar from "/src/components/Navbar";
import Voltar from "/src/components/Btnvoltar.jsx";
import Logout from "/src/components/Btnlogout.jsx";

const Paguser = () => {
  const [usuario] = useState(() => {
    const usuarioSalvo = localStorage.getItem("usuario");
    return usuarioSalvo ? JSON.parse(usuarioSalvo) : null;
  });

  const getAvatar = () => {
    if (!usuario || !usuario.nome) return "";

    const partes = usuario.nome.trim().split(" ");

    if (partes.length === 1) {
      return partes[0][0].toUpperCase();
    }

    return (partes[0][0] + partes[1][0]).toUpperCase();
  };
  return (
    <div>
      <Navbar />
      <h2>Meu Perfil</h2>

      {usuario && <div className="avatar-perfil">{getAvatar()}</div>}

      {usuario && (
        <>
          <p>
            <strong>Nome:</strong> {usuario.nome}
          </p>
          <p>
            <strong>E-mail:</strong> {usuario.email}
          </p>
        </>
      )}

      <Logout className="btn-logout" />
    </div>
  );
};

export default Paguser;
