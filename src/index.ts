
import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();

// Middleware para receber requisições no formato JSON
app.use(express.json());

// Importando os controladores das rotas
import AuthController from "./controllers/AuthController";
import SituationsController from "./controllers/SituationsController";
import ProductsController from "./controllers/ProductsController";
import ProductCategoriesController from "./controllers/ProductCategoriesController";
import ProductSituationsController from "./controllers/ProductSituationsController";
import UsersController from "./controllers/UsersController";

// Rotas da aplicação
app.use("/", AuthController);
app.use("/", SituationsController);
app.use("/", ProductsController);
app.use("/", ProductCategoriesController);
app.use("/", ProductSituationsController);
app.use("/", UsersController);


// Iniciando o servidor na porta definida no arquivo .env
app.listen(process.env.PORT, () => {
    console.log("Servidor Iniciando na porta 8080: http://localhost:8080");
});