const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const supabase = require('./src/config/supabase');

dotenv.config();

const app = express();

const corsOptions = {
    origin: 'http://localhost:5173',
    methods: ["GET","HEAD","PUT","PATCH","POST","DELETE"],
    credentials: true, 
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/usuarios', require('./src/routes/usuarioRoutes'));
app.use('/api/transacao', require('./src/routes/transacaoRoutes'));
//app.use('/api/categoria', require('./src/routes/categoriaRoutes'));
app.use('/api/objFinan', require('./src/routes/objFinanRoutes'));
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'API Spendly está funcionando!',
    timestamp: new Date().toISOString()
  });
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Ambiente: ${process.env.NODE_ENV || 'development'}`);
});