"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Importar a biblioteca Express
const express_1 = __importDefault(require("express"));
const data_source_1 = require("../data-source");
console.log("🔍 login.ts foi carregado!");
// Criar a Aplicação Express
const router = express_1.default.Router();
data_source_1.AppDataSource.initialize().then(() => {
    console.log("Conexão com banco bem sucedida.");
}).catch((error) => {
    console.log("Conexão com banco não realizada:", error);
});
//Criar a rota GET principal
router.get("/", (req, res) => {
    res.send("Bem-Vindo Pessoal!");
});
//Exportar a instrução da rota
exports.default = router;
//# sourceMappingURL=login.js.map