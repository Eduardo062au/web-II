//Importar a biblioteca Express
import express, {Request, Response} from "express";


console.log("🔍 login.ts foi carregado!");
// Criar a Aplicação Express
const router = express.Router();


//Criar a rota GET principal
router.get("/a",(req:Request, res:Response)=>{
    res.send("Bem-Vindo Pessoal!")
})

//Exportar a instrução da rota

export default router