import React, { useState, useEffect } from "react";
import api from "/service/api";
import "../styles/components.css";

const CriarObjetivo = ({ onClose, atualizarLista, objetivo = null }) => {
  const [descricao, setDescricao] = useState("");
  const [valorMeta, setValorMeta] = useState("");
  const [valorAtual, setValorAtual] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [dataLimite, setDataLimite] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  const usuarioId = localStorage.getItem("usuarioId");

  useEffect(() => {
    if (objetivo) {
      setDescricao(objetivo.descricao || "");
      setValorMeta(objetivo.valor_meta || "");
      setValorAtual(objetivo.valor_atual || "");
      setDataInicio(objetivo.data_inicio ? objetivo.data_inicio.split("T")[0] : "");
      setDataLimite(objetivo.data_limite ? objetivo.data_limite.split("T")[0] : "");
    }
  }, [objetivo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCarregando(true);
    setErro("");

    try {
      if (!descricao || !valorMeta) {
        setErro("Descrição e valor meta são obrigatórios");
        return;
      }

      if (objetivo) {
        // Atualizar
        await api.put(`/api/objFinan/${objetivo.id}`, {
          descricao,
          valor_meta: parseFloat(valorMeta),
          valor_atual: parseFloat(valorAtual),
          data_inicio: dataInicio || null,
          data_limite: dataLimite || null,
        });
      } else {
        // Criar
        await api.post("/api/objFinan", {
          id_usuario: usuarioId,
          descricao,
          valor_meta: parseFloat(valorMeta),
          valor_atual: parseFloat(valorAtual),
          data_inicio: dataInicio || null,
          data_limite: dataLimite || null,
        });
      }

      atualizarLista();
      onClose();
    } catch (error) {
      console.error("Erro:", error);
      setErro(error.response?.data?.error || "Erro ao salvar objetivo");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{objetivo ? "Editar Objetivo" : "Criar Novo Objetivo"}</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="form">
          {erro && <p className="error-message">{erro}</p>}

          <div className="form-group">
            <label htmlFor="descricao">Descrição do Objetivo *</label>
            <textarea
              id="descricao"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Ex: Viagem para Europa, Comprar um carro..."
              rows="3"
              required
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="valorMeta">Valor Meta (R$) *</label>
            <input
              type="number"
              id="valorMeta"
              value={valorMeta}
              onChange={(e) => setValorMeta(e.target.value)}
              placeholder="0.00"
              step="0.01"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="valorAtual">Valor Atual (R$)</label>
            <input
              type="number"
              id="valorAtual"
              value={valorAtual}
              onChange={(e) => setValorAtual(e.target.value)}
              placeholder="0.00"
              step="0.01"
            />
          </div>

          <div className="form-group">
            <label htmlFor="dataInicio">Data Início</label>
            <input
              type="date"
              id="dataInicio"
              value={dataInicio}
              onChange={(e) => setDataInicio(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="dataLimite">Data Limite</label>
            <input
              type="date"
              id="dataLimite"
              value={dataLimite}
              onChange={(e) => setDataLimite(e.target.value)}
            />
          </div>

          <div className="form-buttons">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancelar
            </button>
            <button type="submit" disabled={carregando} className="btn-primary">
              {carregando ? "Salvando..." : "Salvar Objetivo"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CriarObjetivo;
