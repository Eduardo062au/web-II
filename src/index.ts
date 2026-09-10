import express, {type Request, type Response } from 'express';
import dotenv from "dotenv";
dotenv.config()

const app = express();

import login from "./controllers/login";

app.use(login);

app.get("/", (req:Request, res:Response)=> {
    res.send("Hello World")
})

app.listen(8080, ()=>{
    console.log("Servidor Iniciando na porta 8080: http://localhost:8080")
});