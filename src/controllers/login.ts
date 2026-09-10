//Importar a biblioteca Express
import express, {Request, Response} from "express";

import { AppDataSource } from "../data-source";

console.log("🔍 login.ts foi carregado!");
// Criar a Aplicação Express
const router = express.Router();

AppDataSource.initialize().then(()=>{
    console.log("Conexão com banco bem sucedida.")
   }) .catch((error)=>{
    console.log("Conexão com banco não realizada:", error)
})

//Criar a rota GET principal
router.get("/",(req:Request, res:Response)=>{
    res.send("Bem-Vindo Pessoal!")
})

//Exportar a instrução da rota

export default router