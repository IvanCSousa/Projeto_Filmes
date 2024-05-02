
//Importação do modulo do banco
const pool = require('../controllers/db');
//Classe dos filmes
class Filme {
    //meto construtor novo filme
    constructor({movieid, idU}) {
        this.movieid = movieid;
        this.idU = idU;
    }
    
    async saveFavoritos() {
        
        const query = 'INSERT INTO favoritos (filme, usuario_id) VALUES ($1, $2) RETURNING *';
        const values = [this.movieid,this.idU];
        try {
            const { rows } = await pool.query(query, values);
        return rows[0];
        } catch (error) {
            console.error('Erro o executar a query:', error);
        throw error;
        }
    };

    async saveAssistidos() {
        
        const query = 'INSERT INTO assistidos (filme, usuario_id) VALUES ($1, $2) RETURNING *';
        const values = [this.movieid,this.idU];
        try {
            const { rows } = await pool.query(query, values);
        return rows[0];
        } catch {
            res.status(500).json({ msg: "Erro ao registrar filme" });
        throw error;
        }
    };

    async saveAssistirDepois() {
        const query = 'INSERT INTO assistir_depois (filme, usuario_id) VALUES ($1, $2) RETURNING *';
        const values = [this.movieid,this.idU];
        try {
            const { rows } = await pool.query(query, values);
        return rows[0];
        } catch (error) {
            console.error('Erro o executar a query:', error);
        throw error;
        }
    };

    
    async getFavoritos() {
        const query = 'SELECT * FROM favoritos WHERE usuario_id = $1';
        const values = [this.idU];
        try {
            const { rows } = await pool.query(query, values);
        return rows;
        } catch (error) {
            console.error('Erro ao executar a query:', error);
        throw error;
        }
    };
    
    async getAssistidos() {
        const query = 'SELECT * FROM assistidos WHERE usuario_id = $1';
        const values = [this.idU];
        
        try {
            const { rows } = await pool.query(query, values);
            return rows;
        } catch (error) {
            console.error('Erro ao executar a query:', error);
        throw error;
        }
    };
    
    async getAssistirDepois() {
        const query = 'SELECT * FROM assistir_depois WHERE usuario_id = $1';
        const values = [this.idU];
        try {
            const { rows } = await pool.query(query, values);
        return rows;
        } catch (error) {
            console.error('Erro ao executar a query:', error);
        throw error;
        }
    };
}

module.exports = Filme;