//Importar a biblioteca Express
import express, {Request, Response} from "express";
import { AppDataSource } from "../data-source";
import { Situation } from "../enity/Situations";


console.log("🔍 login.ts foi carregado!");
// Criar a Aplicação Express
const router = express.Router();


//Criar LISTA
router.get("/situations",async(req:Request, res:Response)=>{
    try{
      const situationRepositoty = AppDataSource.getRepository(Situation);  
      const situations = await situationRepositoty.find();
        res.status(200).json(situations);
        return

    }catch(error){
        res.status(200).json({
            messagem : "Erro ao cadastrar situação!",
        });
        return
    }
});
//Criar VIEW
router.get("/situations/:id",async(req:Request, res:Response)=>{
    try{
        const { id } = req.params;
      const situationRepositoty = AppDataSource.getRepository(Situation);  
      const situations = await situationRepositoty.findOneBy({id : parseInt(id)})
        res.status(200).json(situations);
        return

    }catch(error){
        res.status(200).json({
            messagem : "Erro ao cadastrar situação!",
        });
        return
    }
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