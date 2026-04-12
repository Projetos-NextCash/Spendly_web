import React, { useState, useEffect } from "react";
import Navbar from "/src/components/Navbar";
import CriarObjetivo from "/src/components/CriarObjetivo";
import CardObjetivo from "/src/components/CardObjetivo";
import api from "/service/api";
import "../styles/pages.css";

const Objetivos = () => {
  const [objetivos, setObjetivos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [modalAberto, setModalAberto] = useState(false);
  const [objetivoSelecionado, setObjetivoSelecionado] = useState(null);

  const usuarioId = localStorage.getItem("usuarioId");

  const buscarObjetivos = async () => {
    try {
      setCarregando(true);
      const res = await api.get(`/api/objFinan/${usuarioId}`);
      setObjetivos(res.data.objetivos || []);
    } catch (error) {
      console.error("Erro ao buscar objetivos:", error);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    if (usuarioId) {
      buscarObjetivos();
    }
  }, [usuarioId]);

  const deletarObjetivo = async (id) => {
    if (window.confirm("Tem certeza que deseja deletar este objetivo?")) {
      try {
        await api.delete(`/api/objFinan/${id}`);
        buscarObjetivos();
      } catch (error) {
        console.error("Erro ao deletar:", error);
      }
    }
  };

  const abrirModalEdicao = (objetivo) => {
    setObjetivoSelecionado(objetivo);
    setModalAberto(true);
  };

  const abrirModalCriacao = () => {
    setObjetivoSelecionado(null);
    setModalAberto(true);
  };

  const objetivosFiltrados = objetivos; // Sem filtro por status

  const totalAcumulado = objetivosFiltrados.reduce(
    (sum, obj) => sum + obj.valor_atual,
    0
  );
  const totalMeta = objetivosFiltrados.reduce(
    (sum, obj) => sum + obj.valor_meta,
    0
  );
  const percentualGeral =
    totalMeta > 0 ? (totalAcumulado / totalMeta) * 100 : 0;

  if (carregando) {
    return <p>Carregando objetivos...</p>;
  }

  return (
    <div>
      <Navbar />

      <div className="page-container">
        <div className="page-header">
          <h1>Meus Objetivos Financeiros</h1>
          <button onClick={abrirModalCriacao} className="btn-novo-objetivo">
            + Novo Objetivo
          </button>
        </div>

        {objetivosFiltrados.length > 0 && (
          <div className="resumo-geral">
            <div className="resumo-card">
              <h3>Progresso Geral</h3>
              <div className="progress-bar-grande">
                <div
                  className="progress-fill"
                  style={{ width: `${Math.min(percentualGeral, 100)}%` }}
                ></div>
              </div>
              <p className="percentual-grande">{Math.round(percentualGeral)}%</p>
              <div className="resumo-valores">
                <span>
                  R${" "}
                  {Number(totalAcumulado).toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                  /{" "}
                  {Number(totalMeta).toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
            </div>
          </div>
        )}

        {objetivosFiltrados.length === 0 ? (
          <div className="empty-state">
            <p>Nenhum objetivo financeiro encontrado.</p>
            <button onClick={abrirModalCriacao} className="btn-primary">
              Criar seu primeiro objetivo
            </button>
          </div>
        ) : (
          <div className="objetivos-grid">
            {objetivosFiltrados.map((objetivo) => (
              <CardObjetivo
                key={objetivo.id}
                objetivo={objetivo}
                onEditar={abrirModalEdicao}
                onDeletar={deletarObjetivo}
              />
            ))}
          </div>
        )}
      </div>

      {modalAberto && (
        <CriarObjetivo
          onClose={() => setModalAberto(false)}
          atualizarLista={buscarObjetivos}
          objetivo={objetivoSelecionado}
        />
      )}
    </div>
  );
};

export default Objetivos;
