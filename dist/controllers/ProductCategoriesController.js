"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const data_source_1 = require("../data-source");
const Products_1 = require("../enity/Products");
const PaginationServices_1 = require("../services/PaginationServices");
const yup = __importStar(require("yup"));
const router = express_1.default.Router();
// Rota GET para listar todos os produtos com paginação
router.get("/products", async (req, res) => {
    try {
        const productRepository = data_source_1.AppDataSource.getRepository(Products_1.Product);
        // Receber o número da página e definir página 1 como padrão
        const page = Number(req.query.page) || 1;
        // Definir o limite de registros por página
        const limite = Number(req.query.limit) || 10;
        // Chamar o serviço de paginação para obter os dados paginados
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
        const { id } = req.params;
        const productRepository = data_source_1.AppDataSource.getRepository(Products_1.Product);
        // Buscar o produto pelo ID, já carregando situação e categoria
        const product = await productRepository.findOne({
            where: { id: parseInt(id) },
            relations: {
                productSituation: true,
                productCategory: true,
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
        const schema = yup.object().shape({
            name: yup.string()
                .required("O campo name é obrigatório!")
                .min(3, "O campo name deve ter no mínimo 3 caracteres!"),
            description: yup.string()
                .required("O campo description é obrigatório!")
                .min(3, "O campo description deve ter no mínimo 3 caracteres!"),
            price: yup.number()
                .typeError("O campo price deve ser um número!")
                .required("O campo price é obrigatório!")
                .positive("O campo price deve ser maior que zero!"),
        });
        await schema.validate(data, { abortEarly: false });
        // Gerar o slug automaticamente (ex.: "Camiseta Azul" -> "camiseta-azul")
        const toSlug = (str) => str.toLowerCase().trim().replace(/[^a-z0-9 -]/g, "").replace(/\s+/g, "-");
        data.slug = toSlug(data.name);
        const productRepository = data_source_1.AppDataSource.getRepository(Products_1.Product);
        const newProduct = productRepository.create(data);
        await productRepository.save(newProduct);
        res.status(201).json({
            message: "Produto criado com sucesso!",
            Product: newProduct,
        });
        return;
    }
    catch (error) {
        if (error instanceof yup.ValidationError) {
            res.status(400).json({
                message: error.errors,
            });
            return;
        }
        // Slug duplicado (violação da chave unique)
        if (error?.code === "ER_DUP_ENTRY") {
            res.status(409).json({
                message: "Já existe um produto com esse nome (slug duplicado)!",
            });
            return;
        }
        res.status(500).json({
            message: "Erro ao criar produto!",
        });
        return;
    }
});
// Rota PUT para atualizar um produto existente
router.put("/products/:id", async (req, res) => {
    try {
        const { id } = req.params;
        var data = req.body;
        const schema = yup.object().shape({
            name: yup.string()
                .required("O campo name é obrigatório!")
                .min(3, "O campo name deve ter no mínimo 3 caracteres!"),
            description: yup.string()
                .required("O campo description é obrigatório!")
                .min(3, "O campo description deve ter no mínimo 3 caracteres!"),
            price: yup.number()
                .typeError("O campo price deve ser um número!")
                .required("O campo price é obrigatório!")
                .positive("O campo price deve ser maior que zero!"),
        });
        await schema.validate(data, { abortEarly: false });
        const productRepository = data_source_1.AppDataSource.getRepository(Products_1.Product);
        const product = await productRepository.findOneBy({ id: parseInt(id) });
        if (!product) {
            res.status(404).json({
                message: "Produto não encontrado!",
            });
            return;
        }
        // Como o name agora é obrigatório, o slug é sempre regerado
        const toSlug = (str) => str.toLowerCase().trim().replace(/[^a-z0-9 -]/g, "").replace(/\s+/g, "-");
        data.slug = toSlug(data.name);
        productRepository.merge(product, data);
        const updatedProduct = await productRepository.save(product);
        res.status(200).json({
            message: "Produto atualizado com sucesso!",
            Product: updatedProduct,
        });
        return;
    }
    catch (error) {
        if (error instanceof yup.ValidationError) {
            res.status(400).json({
                message: error.errors,
            });
            return;
        }
        if (error?.code === "ER_DUP_ENTRY") {
            res.status(409).json({
                message: "Já existe um produto com esse nome (slug duplicado)!",
            });
            return;
        }
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
        res.status(500).json({
            message: "Erro ao excluir produto!",
        });
        return;
    }
});
exports.default = router;
//# sourceMappingURL=ProductCategoriesController.js.map