import React, { useState, useEffect } from "react";
import api from "/service/api";

const EditTransacao = ({ transacao, onClose, onAtualizado }) => {
  const [mostrarNovaCategoria, setMostrarNovaCategoria] = useState(false);

  const [form, setForm] = useState({
    descricao: "",
    valor: "",
    data_transacao: "",
    categoria: "",
    tipo: "despesa",
  });

  useEffect(() => {
    if (!transacao) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setForm({
      descricao: transacao.descricao || "",
      valor: Math.abs(transacao.valor) || "",
      data_transacao: transacao.data_transacao
        ? transacao.data_transacao.split("T")[0]
        : "",
      categoria: transacao.categoria || "",
      tipo: transacao.tipo?.toLowerCase() || "despesa",
    });
  }, [transacao]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "categoria" && value === "outra") {
      setMostrarNovaCategoria(true);
      setForm({ ...form, categoria: "" });
      return;
    }

    if (name === "categoria") {
      setMostrarNovaCategoria(false);
    }

    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const atual = {};

  if (form.descricao !== transacao.descricao)
    atual.descricao = form.descricao;

  const valorNumerico = Number(form.valor);

  const valorFinal =
    form.tipo === "despesa"
      ? -Math.abs(valorNumerico)
      : Math.abs(valorNumerico);

  // sempre envia valor se tipo OU valor mudar
  if (
    valorFinal !== Number(transacao.valor) ||
    form.tipo !== transacao.tipo
  ) {
    atual.valor = valorFinal;
  }

  if (
    form.data_transacao !==
    transacao.data_transacao?.split("T")[0]
  )
    atual.data_transacao = form.data_transacao;

  if (form.categoria !== transacao.categoria)
    atual.categoria = form.categoria;

  if (form.tipo !== transacao.tipo)
    atual.tipo = form.tipo;

  if (Object.keys(atual).length === 0) {
    alert("Nenhuma alteração foi realizada.");
    return;
  }

  try {
    await api.put(`/api/transacao/${transacao.id}`, atual);

    onAtualizado?.();
    onClose();

  } catch (err) {
    alert("Erro ao atualizar.");
    console.error(err);
  }
};

  return (
    <div className="modal-alt">
      <div className="dados-box">
        <h2>Editar Transação</h2>

        <form onSubmit={handleSubmit} className="popup-form">

          <label>Descrição</label>
          <input
            type="text"
            name="descricao"
            value={form.descricao}
            onChange={handleChange}
          />

          <label>Valor</label>
          <input
            type="number"
            name="valor"
            value={form.valor}
            onChange={handleChange}
          />

          <label>Data</label>
          <input
            type="date"
            name="data_transacao"
            value={form.data_transacao}
            onChange={handleChange}
          />

          <label>Categoria</label>
          <select
            name="categoria"
            value={mostrarNovaCategoria ? "outra" : form.categoria}
            onChange={handleChange}
          >
            <option value="">Selecione</option>
            <option value="alimentacao">Alimentação</option>
            <option value="transporte">Transporte</option>
            <option value="lazer">Lazer</option>
            <option value="saude">Saúde</option>
            <option value="outra">Outra</option>
          </select>

          {mostrarNovaCategoria && (
            <>
              <label>Nova Categoria</label>
              <input
                type="text"
                name="categoria"
                value={form.categoria}
                onChange={handleChange}
              />
            </>
          )}

          <label>Tipo</label>

          <label>
            <input
              type="radio"
              name="tipo"
              value="receita"
              checked={form.tipo === "receita"}
              onChange={handleChange}
            />
            Receita
          </label>

          <label>
            <input
              type="radio"
              name="tipo"
              value="despesa"
              checked={form.tipo === "despesa"}
              onChange={handleChange}
            />
            Despesa
          </label>

          <button type="submit">Salvar</button>
          <button type="button" onClick={onClose}>
            Fechar
          </button>

        </form>
      </div>
    </div>
  );
};

export default EditTransacao;