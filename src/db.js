//******Configuração do Banco de Dados MySQL*********** 

const { Module } = require('module');
const mysql = require('mysql'); //Importando MySQL

//Configurando uma conexão com o banco de dados 
const db = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'pizzaria',
}); //Preencher de acordo com o seu banco de dados

//Testar a conexão com o MySQL 
db.connect((err) => {
    if (err) {
        console.log('Erro ao conectar ao MySQL', err);
    } else {
        console.log('Conectado ao MySQL');
    }
});

module.exports = db;

//Aqui declaramos que esta construção será um módulo e que iremos exportar para ser usado. Sequir Index. 
