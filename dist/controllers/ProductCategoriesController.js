"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const data_source_1 = require("../data-source");
const ProductCategories_1 = require("../enity/ProductCategories");
const PaginationServices_1 = require("../services/PaginationServices");
const router = express_1.default.Router();
// Listar categorias de produtos com paginação
router.get("/product-categories", async (req, res) => {
    try {
        const repo = data_source_1.AppDataSource.getRepository(ProductCategories_1.ProductCategory);
        const page = Number(req.query.page) || 1;
        const limite = Number(req.query.limit) || 10;
        const result = await PaginationServices_1.PaginationServices.paginate(repo, page, limite, { id: "DESC" });
        res.status(200).json(result);
        return;
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao buscar categorias de produtos!" });
        return;
    }
});
// Visualizar categoria por ID
router.get("/product-categories/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        const repo = data_source_1.AppDataSource.getRepository(ProductCategories_1.ProductCategory);
        const category = await repo.findOneBy({ id });
        if (!category) {
            res.status(404).json({ message: "Categoria de produto não encontrada!" });
            return;
        }
        res.status(200).json(category);
        return;
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao buscar categoria de produto!" });
        return;
    }
});
// Cadastrar categoria
router.post("/product-categories", async (req, res) => {
    try {
        const data = req.body;
        const repo = data_source_1.AppDataSource.getRepository(ProductCategories_1.ProductCategory);
        const newCategory = repo.create(data);
        await repo.save(newCategory);
        res.status(201).json({
            message: "Categoria de produto criada com sucesso!",
            category: newCategory,
        });
    }
    catch (error) {
        console.error("Erro no POST /product-categories:", error);
        res.status(500).json({ message: "Erro ao criar categoria de produto!" });
    }
});
// Editar categoria
router.put("/product-categories/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        const data = req.body;
        const repo = data_source_1.AppDataSource.getRepository(ProductCategories_1.ProductCategory);
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
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao atualizar categoria de produto!" });
        return;
    }
});
// Excluir categoria
router.delete("/product-categories/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        const repo = data_source_1.AppDataSource.getRepository(ProductCategories_1.ProductCategory);
        const category = await repo.findOneBy({ id });
        if (!category) {
            res.status(404).json({ message: "Categoria de produto não encontrada!" });
            return;
        }
        await repo.remove(category);
        res.status(200).json({ message: "Categoria de produto excluída com sucesso!" });
        return;
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao excluir categoria de produto!" });
        return;
    }
});
exports.default = router;
//# sourceMappingURL=ProductCategoriesController.js.map