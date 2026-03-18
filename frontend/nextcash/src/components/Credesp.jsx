import React, { useState } from "react";
import api from "/service/api";


const Credesp = (props) => {
  const [mostrarNovaCategoria, setMostrarNovaCategoria] = useState(false);
  
  const gerardata = () => {
    return new Date().toISOString().split("T")[0];
  };
  
  const [form, setForm] = useState({
    descricao: "",
    valor: "",
    data_transacao: gerardata(),
    categoria: "",
    tipo: "Despesa",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const id_usuario = localStorage.getItem("usuarioId");

    console.log({
      descricao: form.descricao,
      valor: form.valor,
      data_transacao: form.data_transacao,
      categoria: form.categoria,
      tipo: form.tipo,
    });

    try {
      const res = await api.post("/api/transacao/", {
        descricao: form.descricao,
        valor: Number(form.valor),
        data_transacao: form.data_transacao,
        categoria: form.categoria,
        tipo: form.tipo,
        id_usuario,
      });

      props.atualizarLista();
      alert(res.data.mensagem || "Transação cadastrada com sucesso!");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.erro || "Erro ao adicionar");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    if (name === "categoria") {
    if (value === "outros") {
      setMostrarNovaCategoria(true);
      setForm({ ...form, categoria: "" });
    } else {
      setMostrarNovaCategoria(false);
    }
  }
  }; 

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Criando uma nova despesa</h2>

        <label htmlFor="descricao">Descrição</label>
        <input type="text" id="descricao" name="descricao" value={form.descricao} onChange={handleChange} />

        <label htmlFor="valor">Valor</label>
        <input type="number" id="valor" name="valor" value={form.valor} onChange={handleChange} />

        <label htmlFor="data">Data</label>
        <input
          type="date"
          id="data"
          name="data_transacao"
          value={form.data_transacao}
          onChange={ handleChange}
        />

        <label htmlFor="categoria">Categoria</label>
        <select
          id="categoria"
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
            <label htmlFor="novaCategoria">Nova Categoria</label>
            <input type="text" id="novaCategoria" name="categoria" value={form.categoria} onChange={handleChange}/>
          </>
        )}

        <label>Tipo</label>

        <div>
          <input
            type="radio"
            id="tipo"
            name="tipo"
            value="Receita"
            checked={form.tipo === "Receita"}
            onChange={handleChange}
          />
          <label htmlFor="receita">Receita</label>
        </div>

        <div>
          <input
            type="radio"
            id="tipo"
            name="tipo"
            value="Despesa"
            checked={form.tipo === "Despesa"}
            onChange={handleChange}
          />
          <label htmlFor="despesa">Despesa</label>
        </div>

        <button type="submit">Adicionar {form.tipo}</button>
      </form>
    </div>
  );
};

export default Credesp;
