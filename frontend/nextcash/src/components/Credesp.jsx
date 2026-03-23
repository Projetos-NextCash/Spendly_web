import React, { useState } from "react";
import api from "/service/api";

const Credesp = ({ atualizarLista, onClose }) => {
  const [mostrarNovaCategoria, setMostrarNovaCategoria] = useState(false);

  const gerardata = () => {
    return new Date().toISOString().split("T")[0];
  };

  const [form, setForm] = useState({
    descricao: "",
    valor: "",
    data_transacao: gerardata(),
    categoria: "",
    novaCategoria: "",
    tipo: "Despesa",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const id_usuario = localStorage.getItem("usuarioId");

    const categoriaFinal =
      form.categoria === "outros" ? form.novaCategoria : form.categoria;

    const valorNumerico = Number(
      form.valor.replace(/\./g, "").replace(",", "."),
    );

    try {
      const res = await api.post("/api/transacao/", {
        descricao: form.descricao,
        valor: valorNumerico,
        data_transacao: form.data_transacao,
        categoria: categoriaFinal,
        tipo: form.tipo,
        id_usuario,
      });

      atualizarLista?.();
      onClose?.();

      alert(res.data.mensagem || "Transação cadastrada com sucesso!");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.erro || "Erro ao adicionar");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "categoria") {
      setMostrarNovaCategoria(value === "outros");
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="modal-alt">
      <div className="dados-box">
        <form onSubmit={handleSubmit}>
          <h2>Criando nova transação</h2>

          <label>Descrição</label>
          <input
            type="text"
            name="descricao"
            value={form.descricao}
            onChange={handleChange}
          />

          <label>Valor</label>
          <input
            type="text"
            name="valor"
            inputMode="decimal"
            placeholder="0,00"
            value={form.valor}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                valor: e.target.value,
              }))
            }
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
            value={form.categoria}
            onChange={handleChange}
          >
            <option value="">Selecione</option>
            <option value="alimentacao">Alimentação</option>
            <option value="transporte">Transporte</option>
            <option value="lazer">Lazer</option>
            <option value="saude">Saúde</option>
            <option value="outros">Outros</option>
          </select>

          {mostrarNovaCategoria && (
            <>
              <label>Nova Categoria</label>
              <input
                type="text"
                name="novaCategoria"
                value={form.novaCategoria}
                onChange={handleChange}
              />
            </>
          )}

          <label>Tipo</label>

          <div>
            <input
              type="radio"
              name="tipo"
              value="Receita"
              checked={form.tipo === "Receita"}
              onChange={handleChange}
            />
            Receita
          </div>

          <div>
            <input
              type="radio"
              name="tipo"
              value="Despesa"
              checked={form.tipo === "Despesa"}
              onChange={handleChange}
            />
            Despesa
          </div>

          <button type="submit">Adicionar {form.tipo}</button>

          <button type="button" onClick={onClose}>
            Fechar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Credesp;
