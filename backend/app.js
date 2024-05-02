const cors = require('cors');
const express = require("express");

const app = express()

const router = require('./src/controllers/routes');

app.use(express.json())
app.use(cors());
app.use(router)

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});