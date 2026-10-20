"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middleware para receber requisições no formato JSON
app.use(express_1.default.json());
// Importando os controladores das rotas
const AuthController_1 = __importDefault(require("./controllers/AuthController"));
const SituationsController_1 = __importDefault(require("./controllers/SituationsController"));
const ProductsController_1 = __importDefault(require("./controllers/ProductsController"));
const ProductCategoriesController_1 = __importDefault(require("./controllers/ProductCategoriesController"));
const ProductSituationsController_1 = __importDefault(require("./controllers/ProductSituationsController"));
const UsersController_1 = __importDefault(require("./controllers/UsersController"));
// Rotas da aplicação
app.use("/", AuthController_1.default);
app.use("/", SituationsController_1.default);
app.use("/", ProductsController_1.default);
app.use("/", ProductCategoriesController_1.default);
app.use("/", ProductSituationsController_1.default);
app.use("/", UsersController_1.default);
// Iniciando o servidor na porta definida no arquivo .env
app.listen(process.env.PORT, () => {
    console.log("Servidor Iniciando na porta 8080: http://localhost:8080");
});
//# sourceMappingURL=index.js.map