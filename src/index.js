// criando o index.js
//criação de uma aplicação express
const express  = require('express');//importando express

const path = require('path');//importando path 
// o path retorna o caminho de forma dinamica

const app=express();
//o app ira receber o express e todas suas dependencias

const router = express.Router()
//isso permite que a gente cria diferentes URLs e ENDPOINTs para que o frontend possa fazer chamadas

router.get("/", (req,res)=>{
    res.sendFile(path.join(__dirname + '/pages/home.html'))
})

//aqui definimos nossa rota para o arquivo html usando o path para sempre retornar dinamicamente o vem antes da 
//'pages/homedir.html'
//tudo que se encontra depois da barra/ serão nossas rotas.

app.use(router);
//após declarar nossas rotas,aqui falamos para nosso app

app.listen(3333, ()=>{
    console.log('servidor rodando')
})

//aqui definimos quem ira escutar nosso chamado e nos responder

app.get('/hello',(req, res)=>{
    console.log('get funcionando');
    res.send({ message: 'oi'});
})
// dentro do get ja definimos uma função anonia callback,que recebe uma requisição com o REQUEST e que retorna uma resposta com REPLY

app.get('/usuario',(req,res)=>{
    console.log('get funcionando');
    res.send({usuario:'patricia'});
})