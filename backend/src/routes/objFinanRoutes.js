const express = require("express");
const router = express.Router();

const {
  criarObjetivo,
  listarObjetivos,
  atualizarObjetivo,
  deletarObjetivo,
  obterObjetivo,
} = require("../controllers/objFinanController");

router.post("/", criarObjetivo);
router.get("/:id_usuario", listarObjetivos);
router.get("/detalhe/:id", obterObjetivo);
router.put("/:id", atualizarObjetivo);
router.delete("/:id", deletarObjetivo);

module.exports = router;
