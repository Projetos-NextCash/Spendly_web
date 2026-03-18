const express = require("express");
const router = express.Router();

const {
    criarTransacao
} = require("../controllers/transacaoControler");

router.post("/", criarTransacao);
module.exports = router;