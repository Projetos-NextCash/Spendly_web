import React, { useState } from "react";

const Pesquisa = ({ onFiltrar }) => {
  const [categoria, setCategoria] = useState("");
  const [outraCategoria, setOutraCategoria] = useState("");
  const [tipo, setTipo] = useState("");

  const handleFiltrar = () => {
    const filtros = {
      categoria: categoria === "outra" ? outraCategoria : categoria,
      tipo: tipo
    };

    onFiltrar(filtros);
  };

  const limparFiltros = () => {
    setCategoria("");
    setOutraCategoria("");
    setTipo("");

    onFiltrar({});
  };

  return (
    <div className="filtro-box">
      <select
        value={categoria}
        onChange={(e) => setCategoria(e.target.value)}
      >
        <option value="">Todas categorias</option>
        <option value="alimentacao">Alimentação</option>
        <option value="transporte">Transporte</option>
        <option value="lazer">Lazer</option>
        <option value="salario">Salário</option>
        <option value="outra">Outra</option>
      </select>

      {categoria === "outra" && (
        <input
          type="text"
          placeholder="Digite a categoria"
          value={outraCategoria}
          onChange={(e) => setOutraCategoria(e.target.value)}
        />
      )}

      <select
        value={tipo}
        onChange={(e) => setTipo(e.target.value)}
      >
        <option value="">Todos</option>
        <option value="receita">Receita</option>
        <option value="despesa">Despesa</option>
      </select>

      <button onClick={handleFiltrar}>
        Filtrar
      </button>

      <button onClick={limparFiltros}>
        Limpar
      </button>
    </div>
  );
};

export default Pesquisa;