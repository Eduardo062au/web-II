import express, {type Request, type Response } from 'express';
import dotenv from "dotenv";
dotenv.config()

const app = express();

//middleware corpo requisiçao
app.use(express.json());

import AuthController from"./controllers/AuthController";

import login from "./controllers/AuthController";

import  SituationsController  from './controllers/SituationsController ';

app.use('/', AuthController);
app.use('/', SituationsController);


app.get("/", (req:Request, res:Response)=> {
    res.send("Hello World")
})

app.listen(8080, ()=>{
    console.log("Servidor Iniciando na porta 8080: http://localhost:8080")
});