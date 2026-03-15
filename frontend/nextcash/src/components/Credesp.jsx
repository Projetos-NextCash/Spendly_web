import React, { useState } from "react";

const Credesp = () => {

  const gerardata = () => {
    return new Date().toISOString().split("T")[0];
  };

  const [data, setData] = useState(gerardata());
  const [tipo, setTipo] = useState("Despesa");
  const [categoria, setCategoria] = useState("");
  const [mostrarNovaCategoria, setMostrarNovaCategoria] = useState(false);

  const handleCategoria = (e) => {
    const valor = e.target.value;
    setCategoria(valor);

    if (valor === "outros") {
      setMostrarNovaCategoria(true);
    } else {
      setMostrarNovaCategoria(false);
    }
  };

  return (
    <div>
      <form>
        <h2>Criando uma nova despesa</h2>

        <label htmlFor="descricao">Descrição</label>
        <input type="text" id="descricao" />

        <label htmlFor="valor">Valor</label>
        <input type="number" id="valor" />

        <label htmlFor="data">Data</label>
        <input
          type="date"
          id="data"
          value={data}
          onChange={(e) => setData(e.target.value)}
        />

        <label htmlFor="categoria">Categoria</label>
        <select id="categoria" value={categoria} onChange={handleCategoria}>
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
            <input type="text" id="novaCategoria" />
          </>
        )}

        <label>Tipo</label>

        <div>
          <input
            type="radio"
            id="receita"
            name="tipo"
            value="Receita"
            checked={tipo === "Receita"}
            onChange={(e) => setTipo(e.target.value)}
          />
          <label htmlFor="receita">Receita</label>
        </div>

        <div>
          <input
            type="radio"
            id="despesa"
            name="tipo"
            value="Despesa"
            checked={tipo === "Despesa"}
            onChange={(e) => setTipo(e.target.value)}
          />
          <label htmlFor="despesa">Despesa</label>
        </div>

        <button type="submit">
          Adicionar {tipo}
        </button>

      </form>
    </div>
  );
};

export default Credesp;