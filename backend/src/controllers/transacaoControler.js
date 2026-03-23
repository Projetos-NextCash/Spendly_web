const supabase = require("../config/supabase");

const criarTransacao = async (req, res) => {
  try {
    const { descricao, valor, categoria, tipo, data_transacao, id_usuario } = req.body;

    if (!descricao || !valor || !categoria || !tipo || !data_transacao || !id_usuario) {
      return res.status(400).json({
        error: "Por favor preencha todos os campos",
      }); 
    }

    const { data: transacaoExistente, erro} = await supabase
  .from("transacao")
  .select("*")
  .eq("descricao", descricao)
  .eq("valor", valor)
  .eq("categoria", categoria)
  .eq("tipo", tipo)
  .eq("data_transacao", data_transacao)
  .eq("id_usuario", id_usuario);

if (erro) {
  console.error("Erro ao buscar transação:", erro);
  return res.status(500).json({ error: "Erro ao verificar transação" });
}

if (transacaoExistente && transacaoExistente.length > 0) {
  return res.status(400).json({ error: "Transação já cadastrada" });
}

    const valorcerto = tipo === "Despesa" ? -Math.abs(valor) : Math.abs(valor);
       
    const { data, error } = await supabase
      .from("transacao")
      .insert([{ descricao, valor: valorcerto, categoria, tipo, data_transacao, id_usuario: req.body.id_usuario }]);

    if (error) {
      console.error("Erro SUpabase:",error);
      return res.status(500).json({ error: error.message });
    }

    return res.status(201).json({
      message: "Transação criada com sucesso",
      transacao: data,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro interno no servidor" });
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

    return res.status(200).json({
      message: "Transações listadas com sucesso",
      transacoes: data,
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
    const { descricao, valor, categoria, tipo, data_transacao } = req.body;

    const valorcerto = tipo === "Despesa" ? -Math.abs(valor) : Math.abs(valor);
    const { data, error } = await supabase
      .from("transacao")
      .update({ descricao, valor: valorcerto, categoria, tipo, data_transacao })
      .eq("id", id);

    if (error) {
      console.error("Erro ao atualizar transação:", error);
      return res.status(500).json({ error: "Erro ao atualizar transação" });
    }

    return res.status(200).json({
      message: "Transação atualizada com sucesso",
      transacao: data,
    });
  } catch (error) {
    console.error("Erro inesperado:", error);
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
};

module.exports = { criarTransacao, apagarTransacao, listarTransacoes, atualizarTransacao };