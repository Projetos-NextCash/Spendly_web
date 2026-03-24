import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "/src/components/Navbar";
import Despesa from "/src/components/Credesp";
import EditTransacao from "/src/components/EditTransacao";
import api from "/service/api";
import Transacoes from "./Transacoes";

const Homepag = () => {
  const navigate = useNavigate();

  const [transacoes, setTransacoes] = useState([]);
  const [saldo, setSaldo] = useState(0);
  const [carregando, setCarregando] = useState(true);
  const [despesas, setDespesas] = useState(false);

  const [editarAberto, setEditarAberto] = useState(false);
  const [transacaoSelecionada, setTransacaoSelecionada] = useState(null);

  const usuarioId = localStorage.getItem("usuarioId");

  const [usuario] = useState(() => {
    const usuarioSalvo = localStorage.getItem("usuario");
    return usuarioSalvo ? JSON.parse(usuarioSalvo) : null;
  });

  const apagarTransacao = async (id) => {
    try {
      await api.delete(`/api/transacao/${id}`);
      buscarTransacoes();
    } catch (error) {
      console.error("Erro ao deletar:", error);
    }
  };

  const buscarTransacoes = async () => {
    try {
      const res = await api.get(`/api/transacao/${usuarioId}`);

      setTransacoes(res.data.transacoes || []);
      setSaldo(res.data.saldo || 0);
    } catch (error) {
      console.error("Erro ao buscar transações:", error);
    } finally {
      setCarregando(false);
    }
  };

  const transacoesRecentes = [...transacoes]
  .reverse()
  .slice(0, 5);

  useEffect(() => {
    if (!usuarioId) return;
    buscarTransacoes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usuarioId]);

  const abrirEditar = (transacao) => {
    setTransacaoSelecionada(transacao);
    setEditarAberto(true);
  };

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

      <h2>
        Saldo: R${" "}
        {Number(saldo).toLocaleString("pt-BR", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </h2>

      <button className="desp-btn" onClick={criarDespesa}>
        Criar despesa
      </button>

      <div>
        <h2>Minhas Transações <a href="/transacoes">ver todas</a></h2>

        {transacoesRecentes.length === 0 ? (
          <p>Nenhuma transação encontrada.</p>
        ) : (
          <ul>
            {transacoesRecentes.map((t) => (
              <li key={t.id}>
                <strong>{t.descricao}</strong> R${" "}
                {Number(t.valor).toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
                <p>
                  {t.categoria} | {t.tipo} |{" "}
                  {new Date(t.data_transacao).toLocaleDateString("pt-BR")}
                </p>
                <button onClick={() => abrirEditar(t)}>Editar</button>
                <button onClick={() => apagarTransacao(t.id)}>Excluir</button>
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

      {editarAberto && (
        <EditTransacao
          transacao={transacaoSelecionada}
          onClose={() => setEditarAberto(false)}
          onAtualizado={buscarTransacoes}
        />
      )}
    </div>
  );
};

export default Homepag;
