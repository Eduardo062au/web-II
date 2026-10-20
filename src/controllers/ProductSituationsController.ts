import express, { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { ProductSituation } from "../enity/ProductSituations";
import { PaginationServices } from "../services/PaginationServices";

const router = express.Router();

// Listar situações de produtos com paginação
router.get("/product-situations", async (req: Request, res: Response) => {
    try {
        const repo = AppDataSource.getRepository(ProductSituation);
        const page = Number(req.query.page) || 1;
        const limite = Number(req.query.limit) || 10;

        const result = await PaginationServices.paginate(repo, page, limite, { id: "DESC" });

        res.status(200).json(result);
        return;
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar situações de produtos!" });
        return;
    }
});

// Visualizar situação de produto por ID
router.get("/product-situations/:id", async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const repo = AppDataSource.getRepository(ProductSituation);
        const situation = await repo.findOneBy({ id });

        if (!situation) {
            res.status(404).json({ message: "Situação de produto não encontrada!" });
            return;
        }

        res.status(200).json(situation);
        return;
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar situação de produto!" });
        return;
    }
});

// Cadastrar situação de produto
router.post("/product-situations", async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const repo = AppDataSource.getRepository(ProductSituation);
        const newSituation = repo.create(data);

        await repo.save(newSituation);
        res.status(201).json({
            message: "Situação de produto criada com sucesso!",
            productSituation: newSituation,
        });
    } catch (error) {
        console.error("Erro no POST /product-situations:", error);
        res.status(500).json({ message: "Erro ao criar situação de produto!" });
    }
});

// Editar situação de produto
router.put("/product-situations/:id", async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const data = req.body;
        const repo = AppDataSource.getRepository(ProductSituation);
        const situation = await repo.findOneBy({ id });

        if (!situation) {
            res.status(404).json({ message: "Situação de produto não encontrada!" });
            return;
        }

        repo.merge(situation, data);
        const updatedSituation = await repo.save(situation);

        res.status(200).json({
            message: "Situação de produto atualizada com sucesso!",
            productSituation: updatedSituation,
        });
        return;
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar situação de produto!" });
        return;
    }
});

// Excluir situação de produto
router.delete("/product-situations/:id", async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const repo = AppDataSource.getRepository(ProductSituation);
        const situation = await repo.findOneBy({ id });

        if (!situation) {
            res.status(404).json({ message: "Situação de produto não encontrada!" });
            return;
        }

        await repo.remove(situation);
        res.status(200).json({ message: "Situação de produto excluída com sucesso!" });
        return;
    } catch (error) {
        res.status(500).json({ message: "Erro ao excluir situação de produto!" });
        return;
    }
});

export default router;
