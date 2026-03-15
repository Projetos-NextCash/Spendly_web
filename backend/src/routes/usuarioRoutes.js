const express = require("express");
const router = express.Router();
const {
  cadastrarUsuario,
  loginUsuario,
  atualizarUsuario,
  buscarUsuarioporId,
  deletarUsuario,
  recuperarSenha
} = require("../controllers/usuarioController");

router.post("/", cadastrarUsuario);
router.post("/login", loginUsuario);
router.put("/:id", atualizarUsuario);
router.post("/recuperar-senha", recuperarSenha);
router.get("/:id", buscarUsuarioporId);
router.delete("/:id", deletarUsuario);

module.exports = router;
