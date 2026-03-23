const express = require("express");
const router = express.Router();

const {
    criarTransacao,
    apagarTransacao,
    listarTransacoes,
    atualizarTransacao,
} = require("../controllers/transacaoControler");

router.post("/", criarTransacao);
router.delete("/:id", apagarTransacao);
router.get("/:id_usuario", listarTransacoes);
router.put("/:id", atualizarTransacao);

module.exports = router;