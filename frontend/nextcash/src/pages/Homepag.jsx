import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "/src/components/Navbar";
import Despesa from "/src/components/Credesp";
import api from "/service/api";

const Homepag = () => {
  const navigate = useNavigate();

  const [transacoes, setTransacoes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [despesas, setDespesas] = useState(false);

  const usuarioId = localStorage.getItem("usuarioId");

  const [usuario] = useState(() => {
    const usuarioSalvo = localStorage.getItem("usuario");
    return usuarioSalvo ? JSON.parse(usuarioSalvo) : null;
  });

  const buscarTransacoes = async () => {
    try {
      const res = await api.get(`/api/transacao/${usuarioId}`);
      setTransacoes(res.data.transacoes);
    } catch (error) {
      console.error("Erro ao buscar transações:", error);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    if (!usuarioId) return;
    buscarTransacoes();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usuarioId]);

  const user = () => {
    if (!usuario) {
      return (
        <p>
          Olá, <a href="/login">gostaria de fazer login</a>
        </p>
      );
    }

    return (
      <p>
        Olá, {usuario.nome} <a href="/perfil">ver perfil</a>
      </p>
    );
  };

  const criarDespesa = () => {
    if (!usuario) {
      navigate("/login");
      return;
    }

    setDespesas(true);
  };

  if (carregando) {
    return <p>Carregando transações...</p>;
  }

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

      <div>
        <h2>Minhas Transações</h2>

        {transacoes.length === 0 ? (
          <p>Nenhuma transação encontrada.</p>
        ) : (
          <ul>
            {transacoes.map((t) => (
              <li key={t.id}>
                <strong>{t.descricao}</strong> R$ {t.valor}
                <p>
                  {t.categoria} | {t.tipo} |{" "}
                  {new Date(t.data_transacao).toLocaleDateString("pt-BR")}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {despesas && (
        <Despesa
          onClose={() => setDespesas(false)}
          atualizarLista={buscarTransacoes}
        />
      )}
    </div>
  );
};

export default Homepag;