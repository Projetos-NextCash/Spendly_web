const express = require("express");
const router = express.Router();

const {
    criarTransacao,
    apagarTransacao,
    listarTransacoes,
} = require("../controllers/transacaoControler");

router.post("/", criarTransacao);
router.delete("/:id", apagarTransacao);
router.get("/:id_usuario", listarTransacoes);

module.exports = router;