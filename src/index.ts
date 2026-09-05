import express, {type Request, type Response } from 'express';

//cria aplicaçao
const app = express();

import login from"./controllers/login";

// criar rota
app.get("/", (req:Request, res:Response)=> {
    res.send("Hello World")
})

app.listen(8080, ()=>{
    console.log("Servidor Iniciando na porta 8080: http://localhost:8080")
});