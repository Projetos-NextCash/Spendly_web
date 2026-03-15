import React, { useState } from "react";
import Navbar from "/src/components/Navbar";
import Voltar from "/src/components/Btnvoltar.jsx";
import Logout from "/src/components/Btnlogout.jsx";
import api from "/service/api";
import DadosPerfil from "/src/components/Attuser";
import Apagar from "/src/components/Deluser";

const Paguser = () => {
  const [mostrarDados, setMostrarDados] = useState(false);
  
  const [usuario, setUsuario] = useState(() => {
    const usuarioSalvo = localStorage.getItem("usuario");
    return usuarioSalvo ? JSON.parse(usuarioSalvo) : null;
  });

  if (!usuario) {
    return (
      <div> 
        <Navbar />
        <p>Usuário não encontrado.</p>
      </div>
    );
  }

  const getAvatar = () => {
    if (!usuario || !usuario.nome) return "";
    const partes = usuario.nome.trim().split(" ");
    if (partes.length === 1) {
      return partes[0][0].toUpperCase();
    }

    return (partes[0][0] + partes[1][0]).toUpperCase();
  };

  const recarregarDados = () => {
  const id = localStorage.getItem("usuarioId");
  
  api.get(`/api/usuarios/${id}`)
    .then((res) => {
      // 2. Tenta encontrar o usuário dentro da resposta (ajusta conforme sua API)
      const dadosNovos = res.data.usuario || res.data.data || res.data;

      // 3. Validação: Só atualiza se os dados forem válidos
      if (dadosNovos && typeof dadosNovos === 'object') {
        // Mantemos o ID antigo caso a API esqueça de mandar, para não quebrar futuros PUTs
        const usuarioCompleto = { ...dadosNovos, id: id };

        setUsuario(usuarioCompleto);
        localStorage.setItem("usuario", JSON.stringify(usuarioCompleto));
      } else {
        console.error("A API respondeu, mas os dados não parecem um usuário.");
      }
    })
    .catch((err) => {
      console.error("Erro ao buscar dados atualizados:", err);
      alert("Houve um erro ao sincronizar os dados, mas você ainda está logado.");
    });
};
  return (
    <div>
      <Navbar />
      <div>
        <h2>Meu Perfil</h2>

        {usuario && <div className="avatar-perfil">{getAvatar()}</div>}

        {usuario ? (
          <div className="perfil-info">
            <p>
              <strong>Nome:</strong> {usuario.nome}
            </p>
            <p>
              <strong>E-mail:</strong> {usuario.email}
            </p>
            <br />

            <button
              className="editar-btn"
              onClick={() => setMostrarDados(true)}
            >
              Editar Perfil
            </button>

            <Logout className="logout-btn" />
            <Apagar />
          </div>
        ) : (
          <p>Carregando informações...</p>
        )}
      </div>
      {mostrarDados && (
        <DadosPerfil
          usuario={usuario}
          onClose={() => setMostrarDados(false)}
          onAtualizado={recarregarDados}
        />
      )}
    </div>
  );
};

export default Paguser;
