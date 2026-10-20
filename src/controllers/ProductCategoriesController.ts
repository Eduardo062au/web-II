import express, { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { ProductCategory } from "../enity/ProductCategories";
import { PaginationServices } from "../services/PaginationServices";

const router = express.Router();

// Listar categorias de produtos com paginação
router.get("/product-categories", async (req: Request, res: Response) => {
    try {
        const repo = AppDataSource.getRepository(ProductCategory);
        const page = Number(req.query.page) || 1;
        const limite = Number(req.query.limit) || 10;

        const result = await PaginationServices.paginate(repo, page, limite, { id: "DESC" });

        res.status(200).json(result);
        return;
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar categorias de produtos!" });
        return;
    }
});

// Visualizar categoria por ID
router.get("/product-categories/:id", async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const repo = AppDataSource.getRepository(ProductCategory);
        const category = await repo.findOneBy({ id });

        if (!category) {
            res.status(404).json({ message: "Categoria de produto não encontrada!" });
            return;
        }

        res.status(200).json(category);
        return;
    } catch (error) {
        res.status(500).json({ message: "Erro ao buscar categoria de produto!" });
        return;
    }
});

// Cadastrar categoria
router.post("/product-categories", async (req: Request, res: Response) => {
    try {
        const data = req.body;
        const repo = AppDataSource.getRepository(ProductCategory);
        const newCategory = repo.create(data);

        await repo.save(newCategory);
        res.status(201).json({
            message: "Categoria de produto criada com sucesso!",
            category: newCategory,
        });
    } catch (error) {
        console.error("Erro no POST /product-categories:", error);
        res.status(500).json({ message: "Erro ao criar categoria de produto!" });
    }
});

// Editar categoria
router.put("/product-categories/:id", async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const data = req.body;
        const repo = AppDataSource.getRepository(ProductCategory);
        const category = await repo.findOneBy({ id });

        if (!category) {
            res.status(404).json({ message: "Categoria de produto não encontrada!" });
            return;
        }

        repo.merge(category, data);
        const updatedCategory = await repo.save(category);

        res.status(200).json({
            message: "Categoria de produto atualizada com sucesso!",
            category: updatedCategory,
        });
        return;
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar categoria de produto!" });
        return;
    }
});

// Excluir categoria
router.delete("/product-categories/:id", async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const repo = AppDataSource.getRepository(ProductCategory);
        const category = await repo.findOneBy({ id });

        if (!category) {
            res.status(404).json({ message: "Categoria de produto não encontrada!" });
            return;
        }

        await repo.remove(category);
        res.status(200).json({ message: "Categoria de produto excluída com sucesso!" });
        return;
    } catch (error) {
        res.status(500).json({ message: "Erro ao excluir categoria de produto!" });
        return;
    }
});

export default router;
