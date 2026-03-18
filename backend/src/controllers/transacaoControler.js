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

module.exports = { criarTransacao };