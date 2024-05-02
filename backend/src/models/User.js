//Importação do modulo do banco
const pool = require('../controllers/db');
//Classe dos Usuários
class User {
    //meto construtor novo usuário 
    constructor({nome, email, senha}) {
        this.nome = nome;
        this.email = email;
        this.senha = senha;
    }
    
    async save() {
        const query = 'INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) RETURNING *';
        const values = [this.nome, this.email, this.senha];

        try {
            const { rows } = await pool.query(query, values);
        return rows[0];
        } catch (error) {
        console.error('Erro ao executar a query:', error);
        throw error;
        }
    };

}

module.exports = User;