const db = require('./db'); //Importanto o nosso módulo de conexão com o banco.

const Joi = require('joi');
// JOI- valida se esta estrutura de dados atende a uma validação criada no banco, impedindo que o erro passe por aqui e chegue ate o banco.

//Validar os dados
const entregadorSchema = Joi.object({
    id: Joi.string().required(),
    cnh: Joi.string().length(10).required(),
    nome_entregador: Joi.string().required(),
    telefone: Joi.string().required(),
    id_regiao: Joi.string().required(),
}); 

//Listar todos os entregadores
exports.listarEntregadores = (req, res) => {
    db.query('SELECT * FROM entregador', (err, result) => {
        if (err) {
            console.error('Erro ao buscar entregador', err); 
            res.status(500).json({error: 'Erro interno do servidor'}); 
            return; 
        }
        res.json(result);
    });
}

//Buscar um único entregador pelo ID
exports.buscarEntregador = (req, res) => {
    const { id } = req.params; 

    db.query('SELECT * FROM entregador WHERE id = ?', id, (err, result) => {
        if (err) {
            console.error('Erro ao buscar entregador:', err); 
            res.status(500).json({error: 'Erro interno do servidor'}); 
            return; 
        }

        if (result.lenght === 0) {
            res.status(404).json({error: 'entregador não encontrado'}); 
            return; 
        }

        res.json(result[0]); 
    });
}

//Adicionar um novo entregador
exports.adicionarEntregador = (req, res) => {
    const {id,cnh, nome_entregador, telefone, id_regiao } = req.body; 

    const { error } = entregadorSchema.validate({ id,cnh, nome_entregador, telefone, id_regiao }); 

    if (error) {
        res.status(400).json({error: 'Dados do entregador inválidos'}); 
        return; 
    }

    const novoEntregador = {
        id,
        cnh,
        nome_entregador,
        telefone, 
        id_regiao,
       
    }; 

    db.query ('INSERT INTO entregador SET ?', novoEntregador, (err, result) => {

        if (err) {
            console.error('Erro ao adicionar entregador', err); 
            res.status(500).json({error: 'Erro interno do servidor'}); 
            return; 
        }
        res.json({ message: 'entregador adicionado com sucesso'}); 
    });
}

//Atualizar um entregador
exports.atualizarEntregador = (req, res) => {
    const { id } = req.params;
    const { cnh,nome_entregador, telefone, id_regiao } = req.body;

    const { error } = entregadorSchema.validate({ id,cnh, nome_entregador, telefone, id_regiao});

    if (error) {
        res.status(400).json({ error: 'Dados do entregador inválidos' });
        return;
    }

    const produtoAtualizado = {
        cnh,
        nome_entregador,
        telefone,
        id_regiao,
        
    };

    db.query('UPDATE entregador SET ? WHERE id = ?', [entregadorAtualizado, id], (err, result) => {
        if (err) {
            console.error('Erro ao atualizar entregador:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
            return;
        }
        res.json({ message: 'entregador atualizado com sucesso' });
    });
}

//Deletar um cliente 
exports.deletarEntregador = (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM entregador WHERE id = ?', id, (err, result) => {
        if (err) {
            console.error('Erro ao deletar entregador:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
            return;
        }

        res.json({ message: 'entregador deletado com sucesso' });
    });
}

// buscar produtos por nome
exports.buscarentregadorNome = (req,res) => {
    const { nome_entregador} = req.params; //req.params acessa os parametros
    //like com o operador % usado para buscar produtos cujo nome começa com o prefixo especificado na url.

    db.query('SELECT * FOM entregador WHERE nome_entregador LIKE ?', ['${nome_entregador}%'], (err,result) => {
        if (err) {
            console.error('Erro ao buscar entregador:',err);
            res.status(500).json({error:'Erro interno do servidor'});
            return;
        }
        if (result.length ===0) {
            res.status(404).json({error:'entregador não encontrado'});
            return;
        }
        res.json(result);//Retorna o primeiro produto encontrado(deve ser unico)
    });
};
