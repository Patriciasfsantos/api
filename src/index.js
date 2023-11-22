//Criando o index.js
//Criação de uma aplicação Express
const express = require('express'); // Importando Express

const path = require('path'); // Importando Path 
//O Path retorna o caminho de forma dinamica

//*****Configuração do Banco de Dados MySQL********* 
const db = require('./db'); // Importando o nosso módulo de conexão com o banco 

const app = express(); 
//O APP irá receber o express e todas suas dependencias
 
//*****Configuração das rotas *********
const routes = require('./routes'); // Chamando o módulo das rotas

//***** Incluir Novo *********
app.use(express.json()); //Aqui transformamos os dados que chegam como binario em JSON

app.use('/', routes); 
//Após declarar nossas rotas, aqui falamos para nosso app usar elas como referencia

app.listen(3333, () => { 
    console.log('Servidor Rodando');
})
//Aqui definimos quem irá escutar nosso chamado e nos responder


