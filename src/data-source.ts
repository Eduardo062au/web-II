import "reflect-metadata";
import "dotenv/config";
import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { User } from "./enity/Users"; 
import { Situation } from "./enity/Situations";
import { Product } from "./enity/Products";
import { ProductCategory } from "./enity/ProductCategories";
import { ProductSituation } from "./enity/ProductSituations";

dotenv.config()

    const dialect = process.env.DB_DIALECT ?? "mysql"

// Configuração do DataSource do TypeORM
export const AppDataSource = new DataSource({
    type: dialect as "mysql" | "mariadb" | "postgres",
    host: process.env.DB_HOST ?? "localhost",
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
    username: process.env.DB_USERNAME ?? "root",
    password: process.env.DB_PASSWORD ?? "",
    database: process.env.DB_DATABASE ?? "nodeapi",
    synchronize: true,
    logging: true,
    entities: [Situation, User, Product, ProductCategory, ProductSituation],
    subscribers: [],
    migrations: [__dirname + "/migration/*.js"],
});

// Inicialização do DataSource do TypeORM
AppDataSource.initialize().then(()=>{
    console.log("Conexão com banco bem sucedida.")
   }) .catch((error)=>{
    console.log("Conexão com banco não realizada:", error)
})
