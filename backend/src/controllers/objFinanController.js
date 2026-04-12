const supabase = require("../config/supabase");

// Criar novo objetivo
const criarObjetivo = async (req, res) => {
  try {
    const { id_usuario, descricao, valor_meta, valor_atual, data_inicio, data_limite } = req.body;

    if (!id_usuario || !descricao || !valor_meta) {
      return res.status(400).json({ error: "Campos obrigatórios faltando" });
    }

    const { data, error } = await supabase
      .from("objetivo_financeiro")
      .insert({
        id_usuario,
        descricao,
        valor_meta: parseFloat(valor_meta),
        valor_atual: parseFloat(valor_atual) || 0,
        data_inicio: data_inicio || null,
        data_limite: data_limite || null,
      })
      .select();

    if (error) throw error;

    res.status(201).json({
      success: true,
      message: "Objetivo criado com sucesso",
      objetivo: data[0],
    });
  } catch (error) {
    console.error("Erro ao criar objetivo:", error);
    res.status(500).json({ error: error.message });
  }
};

// Listar objetivos de um usuário
const listarObjetivos = async (req, res) => {
  try {
    const { id_usuario } = req.params;

    if (!id_usuario) {
      return res.status(400).json({ error: "id_usuario é obrigatório" });
    }

    const { data, error } = await supabase
      .from("objetivo_financeiro")
      .select()
      .eq("id_usuario", id_usuario)
      .order("data_inicio", { ascending: false });

    if (error) throw error;

    res.json({
      success: true,
      objetivos: data || [],
      total: data?.length || 0,
    });
  } catch (error) {
    console.error("Erro ao listar objetivos:", error);
    res.status(500).json({ error: error.message });
  }
};

// Atualizar objetivo
const atualizarObjetivo = async (req, res) => {
  try {
    const { id } = req.params;
    const { descricao, valor_meta, valor_atual, data_inicio, data_limite } = req.body;

    const updateData = {};
    if (descricao !== undefined) updateData.descricao = descricao;
    if (valor_meta !== undefined) updateData.valor_meta = parseFloat(valor_meta);
    if (valor_atual !== undefined) updateData.valor_atual = parseFloat(valor_atual);
    if (data_inicio !== undefined) updateData.data_inicio = data_inicio;
    if (data_limite !== undefined) updateData.data_limite = data_limite;

    const { data, error } = await supabase
      .from("objetivo_financeiro")
      .update(updateData)
      .eq("id", id)
      .select();

    if (error) throw error;

    if (!data || data.length === 0) {
      return res.status(404).json({ error: "Objetivo não encontrado" });
    }

    res.json({
      success: true,
      message: "Objetivo atualizado com sucesso",
      objetivo: data[0],
    });
  } catch (error) {
    console.error("Erro ao atualizar objetivo:", error);
    res.status(500).json({ error: error.message });
  }
};

// Deletar objetivo
const deletarObjetivo = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from("objetivo_financeiro")
      .delete()
      .eq("id", id);

    if (error) throw error;

    res.json({
      success: true,
      message: "Objetivo deletado com sucesso",
    });
  } catch (error) {
    console.error("Erro ao deletar objetivo:", error);
    res.status(500).json({ error: error.message });
  }
};

// Obter um objetivo específico
const obterObjetivo = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("objetivo_financeiro")
      .select()
      .eq("id", id)
      .single();

    if (error) throw error;

    if (!data) {
      return res.status(404).json({ error: "Objetivo não encontrado" });
    }

    res.json({
      success: true,
      objetivo: data,
    });
  } catch (error) {
    console.error("Erro ao obter objetivo:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  criarObjetivo,
  listarObjetivos,
  atualizarObjetivo,
  deletarObjetivo,
  obterObjetivo,
};
