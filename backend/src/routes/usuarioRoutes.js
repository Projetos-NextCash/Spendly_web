const express = require("express");
const router = express.Router();
const {
  cadastrarUsuario,
  loginUsuario,
  atualizarUsuario,
  buscarUsuarioporId,
  deletarUsuario,
} = require("../controllers/usuarioController");

router.post("/cadastrar", cadastrarUsuario);
router.post("/login", loginUsuario);
router.put("/atualizar/:id", atualizarUsuario);
router.get("/:id", buscarUsuarioporId);
router.delete("/deletar/:id", deletarUsuario);

module.exports = router;
