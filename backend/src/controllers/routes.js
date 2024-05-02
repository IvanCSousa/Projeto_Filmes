const express = require("express");
require('dotenv').config();
// O servidor Express é criado e configurado, incluindo o uso de middleware para análise de JSON 
// e para habilitar o CORS.
const router = express.Router();
const cors = require('cors');
const bcrypt = require('bcrypt');
const { Pool } = require('pg');
const jwt = require("jsonwebtoken");

const app = express()
const User = require("../models/User");
const Filme = require("../models/Filme");

app.use(express.json())
app.use(cors());

const { checkEmailExist, checkToken, getIdUser } = require('../Utils/utils');

//Arquivo gerado com números aleatorios para criptografia, configurado no .env
//SECRET = ABhsdjhsdhjjhkpaf[z54543f689665rgC
const secretENV = process.env.SECRET;

//Importação do modulo do banco
const pool = require('./db');

//Rota para teste de conexão
router.get('/connect', (req, res) => {
    try {
        const client = pool.connect();
        res.status(200).json({ msg: "Efetuado a conexão"})    
    } catch (error){
        res.status(404).json({ msg: "Não Autorizado" },error);
    }
});

//Rota de obtençao de usuário no banco 
router.get("/user/:id", checkToken, async(req, res) => {
    const id = req.params.id
    const user = await getIdUser(id)
    if(!user){
        res.status(404).json({ msg: "Usuário não encontrado"})
    }
    res.status(200).json({ msg: "Usuário encontrado"})
} )

//Rota de Login inicial
router.post('/auth/login', async (req, res) => {
    const {email, senha } = req.body;
    //verifica campos vazios
    if (!email || !senha) {
        return res.status(422).json({ msg: "Campos incompletos" });
    }
    //verifica se o usuário existe
    const usuario = await checkEmailExist(email);
    if(usuario.length==0){
        return res.status(404).json({ msg: "Usuário Não Encontrado!" });
    }
    else {
        //gera comparação utilizando acriptografia
        const senhaA = await bcrypt.compare(senha, usuario[0].senha)
        //verifica o id do usuário
        const usuarioid = usuario[0].id
        if(!senhaA){
             return res.status(422).json({ msg: "Erro na senha!" });
         }
         else{
            try {
                //const secret = "ABhsdjhsdhjjhkpaf[z54543f689665rgC"
                const secret = secretENV 
                //utiliza o token para as rotas privadas
                const token =jwt.sign({id: usuario.id}, secret)
                res.status(200).json({msg: 'autenticação realizada com sucesso', token, usuarioid})
            } catch (error) {
                res.status(500).json({ msg: "Erro ao Entrar" });
            }
         }
    }
    
})

// Rota para registrar um novo usuário
router.post('/auth/reg', async (req, res) => {
    // Verifica se os campos necessários estão presentes
    const { nome, email, senha } = req.body; 
    if (!nome || !email || !senha) {
        return res.status(422).json({ msg: "Campos incompletos" });
    }
    //criptografia
    const salt = await bcrypt.genSalt(12)
    const senhaHash = await bcrypt.hash(senha,salt)
    //cria o usuário novo
    try {
        const user = new User({
            nome, 
            email,
            senha : senhaHash,
        });
        //verifica se existe
        const verificaEmail = await checkEmailExist(email);
        if(verificaEmail.length>0){
            return res.status(422).json({ msg: "Email ja existe" });  
        }
        //Salva o usuário
        const savedUser = await user.save();
        res.status(201).json({msg: "Usuário Cadastrado!"});
    } catch (error) {
        res.status(500).json({ msg: "Erro ao registrar usuário" });
    }
});

//Essas rotas são relacionadas a add dos filmes ao usuário
//add aos favoritos
router.post('/add/filmefavorito', checkToken, async (req, res) => {
    const {idU,movieid} = req.body;
    
    if (!idU || !movieid) {
        return res.status(422).json({ msg: "Campos incompletos" });
    }
    else{
        try {
            const filme = new Filme({
                movieid,    
                idU,
            });
            const savedFilme = await filme.saveFavoritos();
            res.status(201).json({msg: "Filme registrado"});
        } catch (error) {
            res.status(500).json({ msg: "Erro ao registrar filme" });
        }
       
    }
});
//add aos Assistir depois
router.post('/add/filmesassistirdepois', checkToken, async (req, res) => {
    const {idU,movieid} = req.body;
    
    if (!idU || !movieid) {
        return res.status(422).json({ msg: "Campos incompletos" });
    }
    else{
        try {
            const filme = new Filme({
                movieid,    
                idU,
            });
            const savedFilme = await filme.saveAssistirDepois();
            res.status(201).json({msg: "Filme registrado"});
        } catch (error) {
            res.status(500).json({ msg: "Erro ao registrar filme" });
        }
       
    }
});

//add aos assistidos
router.post('/add/filmeassistido', checkToken, async (req, res) => {
    const {idU,movieid} = req.body;
    
    if (!idU || !movieid) {
        return res.status(422).json({ msg: "Campos incompletos" });
    }
    else{
        try {
            const filme = new Filme({
                movieid,    
                idU,
            });
            const savedFilme = await filme.saveAssistidos();
            res.status(201).json({msg: "Filme registrado"});
        } catch (error) {
            res.status(500).json({ msg: "Erro ao registrar filme" });
        }
       
    }
});

//As rotas a Seguir são para carregar os cards dos filme na home do usuário
//facoritos
router.post('/filmefavoritos', checkToken, async (req, res) => {
    const {idU} = req.body;
    if (!idU) {
        return res.status(422).json({ msg: "Campo incompleto" });
    }
    else{
        try {
            const filme = new Filme({
                movieid: 0,    
                idU,
            });
            const getFilme = await filme.getFavoritos();
            res.status(200).json(getFilme);
        } catch (error) {
            res.status(500).json({ msg: "Erro ao obter filme" });
        }
       
    }
});

//As rotas a Seguir são para carregar os cards dos filme na home do usuário
//Assistidos
router.post('/filmeassistido', checkToken, async (req, res) => {
    const {idU} = req.body;
    
    if (!idU) {
        return res.status(422).json({ msg: "Campo incompleto" });
    }
    else{
        try {
            const filme = new Filme({
                movieid: 0,    
                idU,
            });
            const getFilme = await filme.getAssistidos();
            res.status(200).json(getFilme);
        } catch (error) {
            res.status(500).json({ msg: "Erro ao obter filme" });
        }
       
    }
});

//As rotas a Seguir são para carregar os cards dos filme na home do usuário
//Assistir depois
router.post('/filmesassistirdepois', checkToken,async (req, res) => {
    const {idU} = req.body;
    
    if (!idU) {
        return res.status(422).json({ msg: "Campo incompleto" });
    }
    else{
        try {
            const filme = new Filme({
                movieid: 0,    
                idU,
            });
            const getFilme = await filme.getAssistirDepois();
            res.status(200).json(getFilme);
        } catch (error) {
            res.status(500).json({ msg: "Erro ao obter filme" });
        }
       
    }
});


module.exports = router;