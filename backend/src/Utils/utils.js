const jwt = require("jsonwebtoken");

const secretENV = process.env.SECRET;

const pool = require('../controllers/db');
  //Checagem de email no usuário e verificação do banco
  async function checkEmailExist(email) {
      const query = 'SELECT * FROM usuarios WHERE email = $1';
      const values = [email];
      const client = await pool.connect();
      try {
          const { rows } = await client.query(query, values);
          return rows;
      } catch (error) {
          throw error;
      }
  }
  
  //Checagem de token para acesso as rotas privadas
  function checkToken(req, res, next){
      const aHeader = req.headers['authorization']
      if(!aHeader){
          return res.status(401).json({msg: 'Acesso negado!'})
      }
      const token = aHeader.split(' ')[1]
      if(!token){
          return res.status(401).json({msg: 'Acesso negado!'})
      } else{
          try {
              //const secret = "ABhsdjhsdhjjhkpaf[z54543f689665rgC"
              const secret = secretENV;
              jwt.verify(token,secret)
              next()
          } catch (error) {
              res.status(404).json({ msg: "Não Autorizado" });
          }
      }
  }
  
  //Seleção dos usuários
  async function getIdUser(id) {
      const query = 'SELECT * FROM usuarios WHERE id = $1';
      const values = [id];
      try {
          const { rows } = await pool.query(query, values);
          return rows[0].nome;
      } catch (error) {
          console.error('Erro', error);
          res.status(404).json({msg: "Não Encontrado"})
      }
  }
  
module.exports = { checkEmailExist, checkToken, getIdUser };