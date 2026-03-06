const supabase = require('../config/supabase');

const usuarioController = {
    
    async cadastrar(req, res) {
        const { email, senha } = req.body;
    
        if(!email || !senha){
            return res.status(400).json({error: 'Por favor preencha seu e-mail e senha'})
        }

        const {data, error} = await supabase
        .from('usuarios')
        .insert ([{ email, senha}]);
    }
    }
