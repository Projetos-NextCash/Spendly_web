const express = require("express");
const router = express.Router();
const {
  cadastrarUsuario,
  loginUsuario,
  atualizarUsuario,
  buscarUsuarioporId,
  deletarUsuario,
} = require("../controllers/usuarioController");

router.post("/", cadastrarUsuario);
router.post("/login", loginUsuario);
router.put("/:id", atualizarUsuario);
router.get("/:id", buscarUsuarioporId);
router.delete("/:id", deletarUsuario);

module.exports = router;
