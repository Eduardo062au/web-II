"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const data_source_1 = require("../data-source");
const Products_1 = require("../enity/Products");
const ProductCategories_1 = require("../enity/ProductCategories");
const ProductSituations_1 = require("../enity/ProductSituations");
const PaginationServices_1 = require("../services/PaginationServices");
const router = express_1.default.Router();
// Rota GET para listar todos os produtos com paginação
router.get("/products", async (req, res) => {
    try {
        const productRepository = data_source_1.AppDataSource.getRepository(Products_1.Product);
        const page = Number(req.query.page) || 1;
        const limite = Number(req.query.limit) || 10;
        const result = await PaginationServices_1.PaginationServices.paginate(productRepository, page, limite, { id: "DESC" });
        res.status(200).json(result);
        return;
    }
    catch (error) {
        res.status(500).json({
            message: "Erro ao buscar produtos!",
        });
        return;
    }
});
// Rota GET para visualizar um produto específico
router.get("/products/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        const productRepository = data_source_1.AppDataSource.getRepository(Products_1.Product);
        const product = await productRepository.findOne({
            where: { id },
            relations: {
                productCategory: true,
                productSituation: true,
            },
        });
        if (!product) {
            res.status(404).json({
                message: "Produto não encontrado!",
            });
            return;
        }
        res.status(200).json(product);
        return;
    }
    catch (error) {
        console.error("Erro no GET /products/:id:", error);
        res.status(500).json({
            message: "Erro ao buscar produto!",
        });
        return;
    }
});
// Rota POST para criar um novo produto
router.post("/products", async (req, res) => {
    try {
        var data = req.body;
        const productRepository = data_source_1.AppDataSource.getRepository(Products_1.Product);
        const productCategoryRepo = data_source_1.AppDataSource.getRepository(ProductCategories_1.ProductCategory);
        const productSituationRepo = data_source_1.AppDataSource.getRepository(ProductSituations_1.ProductSituation);
        // Garantir que existe uma categoria
        if (data.productCategoryId) {
            data.productCategory = { id: data.productCategoryId };
        }
        else {
            let category = await productCategoryRepo.findOneBy({ id: 1 });
            if (!category) {
                category = await productCategoryRepo.save(productCategoryRepo.create({ name: "Geral" }));
            }
            data.productCategory = category;
        }
        // Garantir que existe uma situação de produto
        if (data.productSituationId) {
            data.productSituation = { id: data.productSituationId };
        }
        else {
            let situation = await productSituationRepo.findOneBy({ id: 1 });
            if (!situation) {
                situation = await productSituationRepo.save(productSituationRepo.create({ name: "Disponível" }));
            }
            data.productSituation = situation;
        }
        const newProduct = productRepository.create(data);
        await productRepository.save(newProduct);
        res.status(201).json({
            message: "Produto criado com sucesso!",
            Product: newProduct,
        });
    }
    catch (error) {
        console.error("Erro no POST /products:", error);
        res.status(500).json({
            message: "Erro ao criar produto!",
        });
    }
});
// Rota PUT para atualizar um produto existente
router.put("/products/:id", async (req, res) => {
    try {
        const { id } = req.params;
        var data = req.body;
        const productRepository = data_source_1.AppDataSource.getRepository(Products_1.Product);
        const product = await productRepository.findOneBy({ id: parseInt(id) });
        if (!product) {
            res.status(404).json({
                message: "Produto não encontrado!",
            });
            return;
        }
        if (data.productSituationId) {
            data.productSituation = { id: data.productSituationId };
        }
        if (data.productCategoryId) {
            data.productCategory = { id: data.productCategoryId };
        }
        productRepository.merge(product, data);
        const updatedProduct = await productRepository.save(product);
        res.status(200).json({
            message: "Produto atualizado com sucesso!",
            Product: updatedProduct,
        });
        return;
    }
    catch (error) {
        console.error("Erro no PUT /products/:id:", error);
        res.status(500).json({
            message: "Erro ao atualizar produto!",
        });
        return;
    }
});
// Rota DELETE para excluir um produto existente
router.delete("/products/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const productRepository = data_source_1.AppDataSource.getRepository(Products_1.Product);
        const product = await productRepository.findOneBy({ id: parseInt(id) });
        if (!product) {
            res.status(404).json({
                message: "Produto não encontrado!",
            });
            return;
        }
        await productRepository.remove(product);
        res.status(200).json({
            message: "Produto excluído com sucesso!",
        });
        return;
    }
    catch (error) {
        console.error("Erro no DELETE /products/:id:", error);
        res.status(500).json({
            message: "Erro ao excluir produto!",
        });
        return;
    }
});
exports.default = router;
//# sourceMappingURL=ProductsController.js.map