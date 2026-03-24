import React, { useState, useEffect } from "react";
import api from "/service/api";
import Voltar from "/src/components/Btnvoltar";
import Pesquisa from "../components/Pesquisa";
import EditTransacao from "/src/components/EditTransacao";

const Transacoes = () => {
  const [transacoes, setTransacoes] = useState([]);
  const [despesas, setDespesas] = useState(false);
  const [filtros, setFiltros] = useState({});
  const [editarAberto, setEditarAberto] = useState(false);
  const [transacaoSelecionada, setTransacaoSelecionada] = useState(null);

  const usuarioId = localStorage.getItem("usuarioId");

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
    } catch (error) {
      console.error("Erro ao buscar transações:", error);
    } 
  };

  const transacoesFiltradas = [...transacoes]
  .reverse()
  .filter(t => {
    const matchCategoria =
      !filtros.categoria ||
      t.categoria?.toLowerCase().includes(filtros.categoria.toLowerCase());

    const matchTipo =
      !filtros.tipo ||
      t.tipo?.toLowerCase() === filtros.tipo.toLowerCase();

    return matchCategoria && matchTipo;
  });

  const aplicarFiltros = (filtrosRecebidos) => {
    setFiltros(filtrosRecebidos);
  };

  useEffect(() => {
    if (!usuarioId) return;
    buscarTransacoes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [usuarioId]);

  const abrirEditar = (transacao) => {
    setTransacaoSelecionada(transacao);
    setEditarAberto(true);
  };

  return (
    <div>
      <div>
        <Voltar />
        <h2>Minhas Transações</h2>
        <Pesquisa onFiltrar={aplicarFiltros} />
        <ul>
          {transacoesFiltradas.map((t) => (
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

export default Transacoes;
