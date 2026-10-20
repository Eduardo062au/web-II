"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const data_source_1 = require("../data-source");
const ProductSituations_1 = require("../enity/ProductSituations");
const PaginationServices_1 = require("../services/PaginationServices");
const router = express_1.default.Router();
// Listar situações de produtos com paginação
router.get("/product-situations", async (req, res) => {
    try {
        const repo = data_source_1.AppDataSource.getRepository(ProductSituations_1.ProductSituation);
        const page = Number(req.query.page) || 1;
        const limite = Number(req.query.limit) || 10;
        const result = await PaginationServices_1.PaginationServices.paginate(repo, page, limite, { id: "DESC" });
        res.status(200).json(result);
        return;
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao buscar situações de produtos!" });
        return;
    }
});
// Visualizar situação de produto por ID
router.get("/product-situations/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        const repo = data_source_1.AppDataSource.getRepository(ProductSituations_1.ProductSituation);
        const situation = await repo.findOneBy({ id });
        if (!situation) {
            res.status(404).json({ message: "Situação de produto não encontrada!" });
            return;
        }
        res.status(200).json(situation);
        return;
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao buscar situação de produto!" });
        return;
    }
});
// Cadastrar situação de produto
router.post("/product-situations", async (req, res) => {
    try {
        const data = req.body;
        const repo = data_source_1.AppDataSource.getRepository(ProductSituations_1.ProductSituation);
        const newSituation = repo.create(data);
        await repo.save(newSituation);
        res.status(201).json({
            message: "Situação de produto criada com sucesso!",
            productSituation: newSituation,
        });
    }
    catch (error) {
        console.error("Erro no POST /product-situations:", error);
        res.status(500).json({ message: "Erro ao criar situação de produto!" });
    }
});
// Editar situação de produto
router.put("/product-situations/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        const data = req.body;
        const repo = data_source_1.AppDataSource.getRepository(ProductSituations_1.ProductSituation);
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
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao atualizar situação de produto!" });
        return;
    }
});
// Excluir situação de produto
router.delete("/product-situations/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        const repo = data_source_1.AppDataSource.getRepository(ProductSituations_1.ProductSituation);
        const situation = await repo.findOneBy({ id });
        if (!situation) {
            res.status(404).json({ message: "Situação de produto não encontrada!" });
            return;
        }
        await repo.remove(situation);
        res.status(200).json({ message: "Situação de produto excluída com sucesso!" });
        return;
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao excluir situação de produto!" });
        return;
    }
});
exports.default = router;
//# sourceMappingURL=ProductSituationsController.js.map