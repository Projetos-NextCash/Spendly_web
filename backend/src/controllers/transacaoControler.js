const supabase = require("../config/supabase");

const criarTransacao = async (req, res) => {
  try {
    const {
      descricao,
      valor,
      categoria,
      tipo,
      data_transacao,
      id_usuario
    } = req.body;

    if (
      !descricao ||
      valor === undefined ||
      !categoria ||
      !tipo ||
      !data_transacao ||
      !id_usuario
    ) {
      return res.status(400).json({
        error: "Por favor preencha todos os campos",
      });
    }

    // normalizar valor
    let valorNormalizado = valor.toString().trim();

    if (valorNormalizado.includes(",") && valorNormalizado.includes(".")) {
      valorNormalizado = valorNormalizado
        .replace(/\./g, "")
        .replace(",", ".");
    } else if (valorNormalizado.includes(",")) {
      valorNormalizado = valorNormalizado.replace(",", ".");
    }

    const valorNumerico = parseFloat(valorNormalizado);

    if (isNaN(valorNumerico)) {
      return res.status(400).json({
        error: "Valor inválido"
      });
    }

    const valorcerto =
      tipo === "Despesa"
        ? -Math.abs(valorNumerico)
        : Math.abs(valorNumerico);

    // verificar duplicidade
    const { data: transacaoExistente, error: erroBusca } = await supabase
      .from("transacao")
      .select("*")
      .eq("descricao", descricao)
      .eq("valor", valorcerto)
      .eq("categoria", categoria)
      .eq("tipo", tipo)
      .eq("data_transacao", data_transacao)
      .eq("id_usuario", id_usuario);

    if (erroBusca) {
      console.error("Erro ao buscar transação:", erroBusca);
      return res.status(500).json({
        error: "Erro ao verificar transação"
      });
    }

    if (transacaoExistente.length > 0) {
      return res.status(400).json({
        error: "Transação já cadastrada"
      });
    }

    const { data, error } = await supabase
      .from("transacao")
      .insert([{
        descricao,
        valor: valorcerto,
        categoria,
        tipo,
        data_transacao,
        id_usuario
      }])
      .select();

    if (error) {
      console.error("Erro Supabase:", error);
      return res.status(500).json({
        error: error.message
      });
    }

    return res.status(201).json({
      message: "Transação criada com sucesso",
      transacao: data[0],
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Erro interno no servidor"
    });
  }
};

const listarTransacoes = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("transacao")
      .select("*")
      .eq("id_usuario", req.params.id_usuario);

    if (error) {
      console.error("Erro ao listar transações:", error);
      return res.status(500).json({ error: "Erro ao listar transações" });
    }

    // Calculo do saldo
     const saldo = data.reduce((acc, t) => {
      return acc + Number(t.valor);
    }, 0);

    return res.status(200).json({
      message: "Transações listadas com sucesso",
      transacoes: data,
      saldo: saldo
    });
  } catch (error) {
    console.error("Erro inesperado:", error);
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
};

const apagarTransacao = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("transacao")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Erro ao apagar transação:", error);
      return res.status(500).json({ error: "Erro ao apagar transação" });
    }

    return res.status(200).json({
      message: "Transação apagada com sucesso",
      transacao: data,
    });
  } catch (error) {
    console.error("Erro inesperado:", error);
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
};

const atualizarTransacao = async (req, res) => {
  try {
    const { id } = req.params;
    let { descricao, valor, categoria, tipo, data_transacao } = req.body;

    const updateData = {};

    if (descricao !== undefined) updateData.descricao = descricao;

    if (categoria !== undefined) updateData.categoria = categoria;

    if (tipo !== undefined) updateData.tipo = tipo;

    if (data_transacao !== undefined)
      updateData.data_transacao = data_transacao;

    // trata valor com tipo
    if (valor !== undefined) {
      const valorFinal =
        tipo === "despesa"
          ? -Math.abs(valor)
          : Math.abs(valor);

      updateData.valor = valorFinal;
    }

    const { data, error } = await supabase
      .from("transacao")
      .update(updateData)
      .eq("id", id)
      .select();

    if (error) throw error;

    res.json({
      mensagem: "Transação atualizada",
      transacao: data[0],
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ erro: error.message });
  }
};

module.exports = { criarTransacao, apagarTransacao, listarTransacoes, atualizarTransacao };