"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
require("dotenv/config");
const typeorm_1 = require("typeorm");
const dotenv_1 = __importDefault(require("dotenv"));
const Users_1 = require("./enity/Users");
const Situations_1 = require("./enity/Situations");
dotenv_1.default.config();
const dialect = process.env.DB_DIALECT ?? "mysql";
exports.AppDataSource = new typeorm_1.DataSource({
    type: dialect,
    host: process.env.DB_HOST ?? "localhost",
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
    username: process.env.DB_USERNAME ?? "root",
    password: process.env.DB_PASSWORD ?? "",
    database: process.env.DB_DATABASE ?? "nodeapi",
    synchronize: false,
    logging: true,
    entities: [Situations_1.Situation, Users_1.User],
    subscribers: [],
    migrations: [__dirname + "/migration/*.js"],
});
exports.AppDataSource.initialize().then(() => {
    console.log("Conexão com banco bem sucedida.");
}).catch((error) => {
    console.log("Conexão com banco não realizada:", error);
});
//# sourceMappingURL=data-source.js.map