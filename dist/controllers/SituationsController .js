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
//Criar a rota GET principal
router.get("/situations", (req, res) => {
    res.send("Bem-Vindo Pessoal, tela situations!");
});
//Criar a rota Post principal
router.post("/situations", (req, res) => {
    try {
        var data = req.body;
        const newSituationRepositoty = data_source_1.AppDataSource.getRepository(Situations_1.Situation);
    }
    catch (error) {
    }
});
//Exportar a instrução da rota
exports.default = router;
//# sourceMappingURL=SituationsController%20.js.map