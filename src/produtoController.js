const db = require('./db'); //Importanto o nosso módulo de conexão com o banco.

const Joi = require('joi');
// JOI- valida se esta estrutura de dados atende a uma validação criada no banco, impedindo que o erro passe por aqui e chegue ate o banco.

//Validar os dados
const produtoSchema = Joi.object({
    id: Joi.string().required(),
    nome_produto: Joi.string().required(),
    descricao: Joi.string().required(),
    valor: Joi.string().required(),
    imagem: Joi.string().required(),
}); 

//Listar todos os produtos
exports.listarProdutos = (req, res) => {
    db.query('SELECT * FROM produto', (err, result) => {
        if (err) {
            console.error('Erro ao buscar produtos', err); 
            res.status(500).json({error: 'Erro interno do servidor'}); 
            return; 
        }
        res.json(result);
    });
}

//Buscar um único produto pelo ID
exports.buscarProduto = (req, res) => {
    const { id } = req.params; 

    db.query('SELECT * FROM produto WHERE id = ?', id, (err, result) => {
        if (err) {
            console.error('Erro ao buscar produto:', err); 
            res.status(500).json({error: 'Erro interno do servidor'}); 
            return; 
        }

        if (result.lenght === 0) {
            res.status(404).json({error: 'Produto não encontrado'}); 
            return; 
        }

        res.json(result[0]); 
    });
}

//Adicionar um novo produto
exports.adicionarProduto = (req, res) => {
    const {id, nome_produto, descricao, valor, imagem } = req.body; 

    const { error } = produtoSchema.validate({ id, nome_produto, descricao, valor, imagem }); 

    if (error) {
        res.status(400).json({error: 'Dados do produto inválidos'}); 
        return; 
    }

    const novoProduto = {
        id,
        nome_produto,
        descricao, 
        valor,
        imagem, 
    }; 

    db.query ('INSERT INTO produto SET ?', novoProduto, (err, result) => {

        if (err) {
            console.error('Erro ao adicionar Produto', err); 
            res.status(500).json({error: 'Erro interno do servidor'}); 
            return; 
        }
        res.json({ message: 'Produto adicionado com sucesso'}); 
    });
}

//Atualizar um Produto
exports.atualizarProduto = (req, res) => {
    const { id } = req.params;
    const { nome_produto, descricao, valor, imagem } = req.body;

    const { error } = produtoSchema.validate({ id, nome_produto, descricao, valor, imagem });

    if (error) {
        res.status(400).json({ error: 'Dados do produto inválidos' });
        return;
    }

    const produtoAtualizado = {
        nome_produto,
        descricao,
        valor,
        imagem,
    };

    db.query('UPDATE produto SET ? WHERE id = ?', [produtoAtualizado, id], (err, result) => {
        if (err) {
            console.error('Erro ao atualizar produto:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
            return;
        }
        res.json({ message: 'Produto atualizado com sucesso' });
    });
}

//Deletar um cliente 
exports.deletarProduto = (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM produto WHERE id = ?', id, (err, result) => {
        if (err) {
            console.error('Erro ao deletar produto:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
            return;
        }

        res.json({ message: 'Produto deletado com sucesso' });
    });
}

// buscar produtos por nome
exports.buscarProdutoNome = (req,res) => {
    const { nome_produto} = req.params; //req.params acessa os parametros
    //like com o operador % usado para buscar produtos cujo nome começa com o prefixo especificado na url.

    db.query('SELECT * FOM produto WHERE nome_produto LIKE ?', ['${nome_produto}%'], (err,result) => {
        if (err) {
            console.error('Erro ao buscar produto:',err);
            res.status(500).json({error:'Erro interno do servidor'});
            return;
        }
        if (result.length ===0) {
            res.status(404).json({error:'produto não encontrado'});
            return;
        }
        res.json(result);//Retorna o primeiro produto encontrado(deve ser unico)
    });
};
