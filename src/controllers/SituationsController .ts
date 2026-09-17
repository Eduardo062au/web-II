//Importar a biblioteca Express
import express, {Request, Response} from "express";
import { AppDataSource } from "../data-source";
import { Situation } from "../enity/Situations";


console.log("🔍 login.ts foi carregado!");
// Criar a Aplicação Express
const router = express.Router();


//Criar a rota GET principal
router.get("/situations",(req:Request, res:Response)=>{
    res.send("Bem-Vindo Pessoal, tela situations!")
});

//Criar a rota Post principal
router.post("/situations",async(req:Request, res:Response)=>{

    try{
        var data = req.body;

        const situationRepositoty = AppDataSource.getRepository(Situation)
        const newSituation = situationRepositoty.create(data);

        await situationRepositoty.save(newSituation);

        res.status(201).json({
            message : "Situação cadastrada com sucesso",
            situation: newSituation,
        });


    }catch(error){

        res.status(500).json({
            message : "Erro"
        });        
    }
});

//Exportar a instrução da rota

export default router