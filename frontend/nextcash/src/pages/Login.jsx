import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
//import "/styles/login.css";
//import "/styles/components.css";
import Btnvoltar from "/src/Components/Btnvoltar";
import api from "/service/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !senha) {
      alert("Preencha todos os campos!");
      return;
    }

    try {
      const res = await api.post("/api/usuarios/login", { email, senha });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("usuario", JSON.stringify(res.data.usuario));
      localStorage.setItem("usuarioId", res.data.usuario.id);

      alert("Login realizado com sucesso!");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.erro || "E-mail ou senha incorretos.");
    }
  };

  return (
    <div className="tela-login">
      <form onSubmit={handleSubmit} className="login-box">
        <h3>Faça seu login</h3>

        <label>E-mail</label>
        <input
          type="email"
          placeholder="Digite seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="login-input"
        />

        <label>Senha</label>
        <div className="senha-wrapper">
          <input
            type={mostrarSenha ? "text" : "password"}
            placeholder="Digite sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="login-input"
          />
          <button
            type="button"
            className="btn-mostrar"
            onClick={() => setMostrarSenha(!mostrarSenha)}
          >
            {mostrarSenha ? "Ocultar" : "Mostrar"}
          </button>
        </div>

        <button type="submit" className="btn-entrar">Entrar</button>
      </form>
      <div className="btns">
        <p>Não tem conta?</p>
      <button className="btn-secundario" onClick={() => navigate("/cadastro")}>
        Cadastrar-se
      </button>
      <Btnvoltar estilo= "voltar-btn" />
      </div>
    </div>
  );
};

export default Login;