const express = require('express'); // Importando Express

const path = require('path'); // Importando Path 
//O Path retorna o caminho de forma dinamica

const router = express.Router()
//Isso permite que a gente crie diferentes urls e ENDPOINTs(tudo que vem depois da url principal) para que o frontend possa fazer chamadas

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/pages/home.html'));
})
//Aqui definimos a nossa rota para o arquivo html usando o Path para sempre retornar dinamicamente o vem antes da "/pages/home.html"
// Tudo que se encontra depois da barra "/" serão nossas rotas.

const clienteController = require('./clienteController');
//Chamando o arquivo que controla o clienre

//Rotas para clientes
router.get('/clientes', clienteController.listarClientes); 

router.get('/clientes/:cpf', clienteController.buscarClientes); 

//POST: Aceita criar algum objeto do servidor
router.post('/clientes',clienteController.adicionarCliente); 

//PUT: Aceita susbtituir algum objeto do servidor 
//PATH: Aceita alterar algum objeto do servidor
router.patch('/clientes/:cpf', clienteController.atualizarCliente); 

//DELETE: Informa por meio do URL o objeto a ser deletado 
router.delete('/clientes/:cpf', clienteController.deletarCliente); 

const produtoController = require('./produtoController'); 
//Rotas para produtos 



router.get('/produtos/nome/:nome_produto', produtoController.buscarProdutoNome);
router.get('/produtos',produtoController.listarProdutos); 

router.get('/produtos/:id', produtoController.buscarProduto); 
router.post('/produtos', produtoController.adicionarProduto);
router.patch('/produtos/atualizar',produtoController.deletarProduto);

router.delete('/produtos/:id', produtoController.deletarProduto);



const entregadorController = require('./entregadorController'); 

router.get('/entregador/nome/:nome_entregador', entregadorController.buscarEntregadorNome);
router.get('/entregador',entregadorController.listarEntregador); 

router.get('/entregador/:id', entregadorController.buscarEntregador); 
router.post('/entregador', entregadorController.adicionarEntregador);
router.patch('/entregador/atualizar',entregadorController.deletarEntregador);

router.delete('/entregador/:id', entregadorController.deletarEntregador);



const loginController=require('./loginController.js')

router.post('/login',loginController.loginCliente);
router.use('/clientes',loginController.autenticarToken)

module.exports = router;