"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const login_1 = __importDefault(require("./controllers/login"));
app.use(login_1.default);
app.get("/", (req, res) => {
    res.send("Hello World");
});
app.listen(8080, () => {
    console.log("Servidor Iniciando na porta 8080: http://localhost:8080");
});
//# sourceMappingURL=index.js.map