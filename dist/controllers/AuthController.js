"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Importar a biblioteca Express
const express_1 = __importDefault(require("express"));
console.log("🔍 login.ts foi carregado!");
// Criar a Aplicação Express
const router = express_1.default.Router();
//Criar a rota GET principal
router.get("/a", (req, res) => {
    res.send("Bem-Vindo Pessoal!");
});
//Exportar a instrução da rota
exports.default = router;
//# sourceMappingURL=AuthController.js.map