//Importar a biblioteca Express
import express, { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Situation } from "../enity/Situations";
import { PaginationServices } from "../services/PaginationServices";


console.log("🔍 login.ts foi carregado!");
// Criar a Aplicação Express
const router = express.Router();

//Criar Lista
router.get("/situations", async (req: Request, res: Response) => {
    try {
        // Buscar todas as situações no banco de dados
        const situationRepository = AppDataSource.getRepository(Situation);

        //receber o numero da pagina e definir pagina 1 como padrão
        const page = Number(req.query.page) || 1;

        // Definir o limite de registros por página
        const limite = Number(req.query.limit) || 10;


        // Chamar o serviço de paginação para obter os dados paginados
        const result = await PaginationServices.paginate(situationRepository, page, limite, { id: "DESC" });


        //retornar a resposta com os ados e informações de paginação
        res.status(200).json(result);
        return;

    } catch (error) {
        res.status(500).json({
            message: "Erro ao buscar situações!",
        });
        return;
    }
});

//Criar VIEW
router.get("/situations/:id", async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const situationRepositoty = AppDataSource.getRepository(Situation);
        const situation = await situationRepositoty.findOneBy({ id });

        if (!situation) {
            res.status(404).json({
                messagem: "Situação não encontrada!",
            });
            return;
        }

        res.status(200).json(situation);
        return;
    } catch (error) {
        res.status(200).json({
            messagem: "Erro ao cadastrar situação!",
        });
        return;
    }
});

//Criar EDIT
router.put("/situations/:id", async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        var data = req.body;
        const situationRepositoty = AppDataSource.getRepository(Situation);
        const situation = await situationRepositoty.findOneBy({ id });

        if (!situation) {
            res.status(404).json({
                messagem: "Situação não encontrada!",
            });
            return;
        }

        //Atualiza os dados
        situationRepositoty.merge(situation, data);
        //Salvar as alterações de dados
        const updateSituation =await situationRepositoty.save(situation)

        res.status(200).json({
            message: "Situação atualizada com sucesso",
            situation: updateSituation,
        });


    } catch (error) {
        res.status(200).json({
            messagem: "Erro ao cadastrar situação!",
        });
        return;
    }
});

//Criar a rota Post principal
router.post("/situations", async (req: Request, res: Response) => {
    try {
        var data = req.body;

        const situationRepositoty = AppDataSource.getRepository(Situation);
        const newSituation = situationRepositoty.create(data);

        await situationRepositoty.save(newSituation);

        res.status(201).json({
            message: "Situação cadastrada com sucesso",
            situation: newSituation,
        });
    } catch (error) {
        res.status(500).json({
            message: "Erro ao atualizar situação",
        });
    }
});

// Remove o item cadastrado no banco
router.delete("/situations/:id", async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const situationRepositoty = AppDataSource.getRepository(Situation);
        const situation = await situationRepositoty.findOneBy({ id });

        if (!situation) {
            res.status(404).json({
                messagem: "Situação não encontrada!",
            });
            return;
        }

        //Remover os dados do banco
        await situationRepositoty.remove(situation);


        res.status(200).json({
            message: "Situação atualizada com sucesso",
        });


    } catch (error) {
        res.status(200).json({
            messagem: "Erro ao cadastrar situação!",
        });
        return;
    }
});

//Exportar a instrução da rota
export default router;