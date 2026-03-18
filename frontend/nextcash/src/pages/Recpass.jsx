import React, { useState } from "react";
import api from "/service/api"; 
import Voltar from "/src/components/Btnvoltar";

const Recpass = () => {

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem");
      return;
    }

    try {
      await api.post(`/api/usuarios/recuperar-senha`, {
        email,
        senha
      });

      alert("Senha atualizada com sucesso!");
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      alert("Email não encontrado");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Recuperar senha</h2>

        <label htmlFor="email">Email</label>
        <input
          type="email"
          placeholder="Informe-nos seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="novaSenha">Nova Senha</label>
        <input
          type={mostrarSenha ? "text" : "password"}
          placeholder="Informe sua nova senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />

        <label htmlFor="confirmarSenha">Repita Senha</label>
        <input
          type={mostrarSenha ? "text" : "password"}
          placeholder="Repita sua senha"
          value={confirmarSenha}
          onChange={(e) => setConfirmarSenha(e.target.value)}
          required
        />

        <button
          type="button"
          onClick={() => setMostrarSenha(!mostrarSenha)}
        >
          {mostrarSenha ? "Ocultar Senha" : "Mostrar Senha"}
        </button>

        <button type="submit">Recuperar Senha</button>

      </form>
      <Voltar />
    </div>
  );
};

export default Recpass;