import React from "react";

const CardObjetivo = ({ objetivo, onEditar, onDeletar }) => {
  const percentualAtingido = (objetivo.valor_atual / objetivo.valor_meta) * 100;
  const faltaAtingir = objetivo.valor_meta - objetivo.valor_atual;

  const formatarData = (data) => {
    if (!data) return "Sem limite";
    return new Date(data).toLocaleDateString("pt-BR");
  };

  return (
    <div className="card-objetivo">
      <div className="card-header">
        <h3>{objetivo.descricao}</h3>
      </div>

      <div className="progresso-container">
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${Math.min(percentualAtingido, 100)}%` }}
          ></div>
        </div>
        <p className="percentual">{Math.round(percentualAtingido)}% concluído</p>
      </div>

      <div className="card-valores">
        <div className="valor-item">
          <span className="label">Alcançado</span>
          <span className="valor">
            R$ {Number(objetivo.valor_atual).toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </div>
        <div className="valor-item">
          <span className="label">Meta</span>
          <span className="valor">
            R$ {Number(objetivo.valor_meta).toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </div>
        <div className="valor-item">
          <span className="label">Falta</span>
          <span className="valor-falta">
            R$ {Number(faltaAtingir).toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </div>
      </div>

      <div className="card-info">
        <span className="data-info">
          Início: {formatarData(objetivo.data_inicio)}
        </span>
        <span className="data-limite">
          Limite: {formatarData(objetivo.data_limite)}
        </span>
      </div>

      <div className="card-actions">
        <button onClick={() => onEditar(objetivo)} className="btn-editar">
          Editar
        </button>
        <button onClick={() => onDeletar(objetivo.id)} className="btn-deletar">
          Deletar
        </button>
      </div>
    </div>
  );
};

export default CardObjetivo;
