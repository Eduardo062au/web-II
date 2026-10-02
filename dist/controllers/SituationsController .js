"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Importar a biblioteca Express
const express_1 = __importDefault(require("express"));
const data_source_1 = require("../data-source");
const Situations_1 = require("../enity/Situations");
console.log("🔍 login.ts foi carregado!");
// Criar a Aplicação Express
const router = express_1.default.Router();
//Criar LISTA
router.get("/situations", async (req, res) => {
    try {
        const situationRepositoty = data_source_1.AppDataSource.getRepository(Situations_1.Situation);
        const situations = await situationRepositoty.find();
        res.status(200).json(situations);
        return;
    }
    catch (error) {
        res.status(200).json({
            messagem: "Erro ao cadastrar situação!",
        });
        return;
    }
});
//Criar VIEW
router.get("/situations/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        const situationRepositoty = data_source_1.AppDataSource.getRepository(Situations_1.Situation);
        const situation = await situationRepositoty.findOneBy({ id });
        if (!situation) {
            res.status(404).json({
                messagem: "Situação não encontrada!",
            });
            return;
        }
        res.status(200).json(situation);
        return;
    }
    catch (error) {
        res.status(200).json({
            messagem: "Erro ao cadastrar situação!",
        });
        return;
    }
});
//Criar EDIT
router.put("/situations/:id", async (req, res) => {
    try {
        const id = Number(req.params.id);
        var data = req.body;
        const situationRepositoty = data_source_1.AppDataSource.getRepository(Situations_1.Situation);
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
        const updateSituation = await situationRepositoty.save(situation);
        res.status(200).json({
            message: "Situação atualizada com sucesso",
            situation: updateSituation,
        });
        return;
    }
    catch (error) {
        res.status(200).json({
            messagem: "Erro ao cadastrar situação!",
        });
        return;
    }
});
//Criar a rota Post principal
router.post("/situations", async (req, res) => {
    try {
        var data = req.body;
        const situationRepositoty = data_source_1.AppDataSource.getRepository(Situations_1.Situation);
        const newSituation = situationRepositoty.create(data);
        await situationRepositoty.save(newSituation);
        res.status(201).json({
            message: "Situação cadastrada com sucesso",
            situation: newSituation,
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Erro",
        });
    }
});
//Exportar a instrução da rota
exports.default = router;
//# sourceMappingURL=SituationsController%20.js.map