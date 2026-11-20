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
const Situations_1 = require("../enity/Situations");
const PaginationServices_1 = require("../services/PaginationServices");
const yup = __importStar(require("yup"));
const router = express_1.default.Router();
//Criar Lista
router.get("/situations", async (req, res) => {
    try {
        // Buscar todas as situações no banco de dados
        const situationRepository = data_source_1.AppDataSource.getRepository(Situations_1.Situation);
        //receber o numero da pagina e definir pagina 1 como padrão
        const page = Number(req.query.page) || 1;
        // Definir o limite de registros por página
        const limite = Number(req.query.limit) || 10;
        // Chamar o serviço de paginação para obter os dados paginados
        const result = await PaginationServices_1.PaginationServices.paginate(situationRepository, page, limite, { id: "DESC" });
        //retornar a resposta com os ados e informações de paginação
        res.status(200).json(result);
        return;
    }
    catch (error) {
        res.status(500).json({
            message: "Erro ao buscar situações!",
        });
        return;
    }
});
//Rota GET para visualizar uma situação específica
router.get("/situations/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const situationRepository = data_source_1.AppDataSource.getRepository(Situations_1.Situation);
        const situation = await situationRepository.findOneBy({ id: parseInt(id) });
        if (!situation) {
            res.status(404).json({
                message: "Situação não encontrada!",
            });
            return;
        }
        res.status(200).json(situation);
        return;
    }
    catch (error) {
        res.status(500).json({
            message: "Erro ao buscar situação!",
        });
        return;
    }
});
//Rota POST
router.post("/situations", async (req, res) => {
    try {
        var data = req.body;
        const schema = yup.object().shape({
            nameSituation: yup.string()
                .required("O nome da situação é obrigatório!")
                .min(3, "O nome da situação deve ter no mínimo 3 caracteres!")
        });
        await schema.validate(data, { abortEarly: false });
        const situationRepository = data_source_1.AppDataSource.getRepository(Situations_1.Situation);
        const newSituation = situationRepository.create(data);
        await situationRepository.save(newSituation);
        res.status(201).json({
            message: "Situação criada com sucesso!",
            Situation: newSituation,
        });
    }
    catch (error) {
        if (error instanceof yup.ValidationError) {
            res.status(400).json({
                message: error.errors,
            });
            return;
        }
        res.status(500).json({
            message: "Erro ao criar situação!",
        });
    }
});
//Rota PUT Atualizar uma situação específica
router.put("/situations/:id", async (req, res) => {
    try {
        const { id } = req.params;
        var data = req.body;
        const schema = yup.object().shape({
            nameSituation: yup.string()
                .required("O nome da situação é obrigatório!")
                .min(3, "O nome da situação deve ter no mínimo 3 caracteres!")
        });
        await schema.validate(data, { abortEarly: false });
        const situationRepository = data_source_1.AppDataSource.getRepository(Situations_1.Situation);
        const situation = await situationRepository.findOneBy({ id: parseInt(id) });
        if (!situation) {
            res.status(404).json({
                message: "Situação não encontrada!",
            });
            return;
        }
        //Atualizar os dados da situação com os novos valores
        situationRepository.merge(situation, data);
        // Salvar as alterações no banco de dados
        const updatedSituation = await situationRepository.save(situation);
        res.status(200).json({
            message: "Situação atualizada com sucesso!",
            Situation: updatedSituation,
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
        res.status(500).json({
            message: "Erro ao atualizar situação!",
        });
    }
});
//Rota DELETE uma situação específica
router.delete("/situations/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const situationRepository = data_source_1.AppDataSource.getRepository(Situations_1.Situation);
        const situation = await situationRepository.findOneBy({ id: parseInt(id) });
        if (!situation) {
            res.status(404).json({
                message: "Situação não encontrada!",
            });
            return;
        }
        // Excluir a situação
        await situationRepository.remove(situation);
        res.status(200).json({
            message: "Situação excluída com sucesso!",
        });
        return;
    }
    catch (error) {
        res.status(500).json({
            message: "Erro ao excluir situação!",
        });
        return;
    }
});
exports.default = router;
//# sourceMappingURL=SituationsController.js.map