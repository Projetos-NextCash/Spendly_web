import React, {useState, useEffect} from 'react'
import api from '/service/api'

const EditTransacao = ({ transacao, onClose, onAtualizado }) => {

const [mostrarNovaCategoria, setMostrarNovaCategoria] = useState(false);

const [form, setForm] = useState({
  descricao: "",
  valor: "",
  data_transacao: "",
  categoria: "",
  tipo: "Despesa",
});

useEffect(() => {
  if (!transacao) return;

  // eslint-disable-next-line react-hooks/set-state-in-effect
  setForm({
    descricao: transacao.descricao || "",
    valor: transacao.valor || "",
    data_transacao: transacao.data_transacao
      ? transacao.data_transacao.split("T")[0]
      : "",
    categoria: transacao.categoria || "",
    tipo: transacao.tipo || "Despesa",
  });
}, [transacao]);

const handleChange = (e) => {
  const { name, value } = e.target;

  if (name === "categoria" && value === "outros") {
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

  if (form.valor !== transacao.valor)
    atual.valor = Number(form.valor);

  if (
    form.data_transacao !==
    transacao.data_transacao.split("T")[0]
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

    alert("Transação atualizada!");

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
value="Receita"
checked={form.tipo === "Receita"}
onChange={handleChange}
/>
Receita
</label>

<label>
<input
type="radio"
name="tipo"
value="Despesa"
checked={form.tipo === "Despesa"}
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