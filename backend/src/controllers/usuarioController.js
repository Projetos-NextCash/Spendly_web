const supabase = require("../config/supabase");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const cadastrarUsuario = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    if (!email || !senha || !nome) {
      return res.status(400).json({
        error:
          "Por favor preencha o que esta sendo solicitado nos respectivos campos",
      });
    }

    const usuarioExistente = await supabase
      .from("usuarios")
      .select("*")
      .eq("email", email)
      .single();

    if (usuarioExistente) {
      return res.status(400).json({ error: "Usuário já cadastrado" });
    }

    const senhacriptografada = await bcrypt.hash(senha, 10);

    const { data, error } = await supabase
      .from("usuarios")
      .insert([{ nome, email, senha: senhacriptografada }]);

    if (error) {
      return res.status(500).json({ error: "Erro ao cadastrar usuário" });
    }

    return res
      .status(201)
      .json({ message: "Usuário cadastrado com sucesso", usuario: data });
  } catch (error) {
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
};

const loginUsuario = async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({
        error: "Por favor informe seu e-mail e senha para realizar o login",
      });
    }

    const usuario = await supabase
      .from("usuarios")
      .select("*")
      .eq("email", email)
      .single();

    if (!usuario) {
      return res.status(400).json({ error: "Usuário não encontrado" });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      return res.status(400).json({ error: "Senha incorreta" });
    }

    const token = jwt.sign(
      { id: usuario.id, email: usuario.email },
      process.env.JWT_SECRET,
      { expiresIn: "2h" },
    );

    return res.json({ token });
  } catch (error) {
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
};

const atualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, email, senha } = req.body;

    const { data: usuarioExistente, error } = await supabase
      .from("usuarios")
      .select("*")
      .eq("id", id)
      .single();

    if (!usuarioExistente) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    const dadosAtualizados = {};

    if (nome) dadosAtualizados.nome = nome;
    if (email) dadosAtualizados.email = email;
    if (senha) dadosAtualizados.senha = await bcrypt.hash(senha, 10);

    const { data, error: updateError } = await supabase
      .from("usuarios")
      .update(dadosAtualizados)
      .eq("id", id);

    if (Object.keys(dadosAtualizados).length === 0) {
      return res.status(400).json({ error: "Nenhum dado para atualizar" });
    }

    if (updateError) {
      return res.status(500).json({ error: "Erro ao atualizar usuário" });
    }

    return res.json({
      message: "Usuário atualizado com sucesso",
      usuario: data,
    });
  } catch (error) {
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
};

const buscarUsuarioporId = async (req, res) => {
  try {
    const { id } = req.params;

    const { data: usuario, error } = await supabase
      .from("usuarios")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !usuario) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }
    return res.json({ usuario });
  } catch (error) {
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
};

const deletarUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    const { data: usuarioExistente, error } = await supabase
      .from("usuarios")
      .select("*")
      .eq("id", id)
      .single();

    if (!usuarioExistente) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    const { data, error: deleteError } = await supabase
      .from("usuarios")
      .delete()
      .eq("id", id);

    if (deleteError) {
      return res.status(500).json({ error: "Erro ao deletar usuário" });
    }

    return res.json({ message: "Usuário deletado com sucesso" });
  } catch (error) {
    return res.status(500).json({ error: "Erro interno no servidor" });
  }
};

module.exports = { cadastrarUsuario, loginUsuario, atualizarUsuario, buscarUsuarioporId, deletarUsuario };
