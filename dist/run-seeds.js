"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("./data-source");
const CreateProductCategoriesSeeds_1 = __importDefault(require("./seeds/CreateProductCategoriesSeeds"));
const CreateProductSituationsSeeds_1 = __importDefault(require("./seeds/CreateProductSituationsSeeds"));
const CreateProductsSeeds_1 = __importDefault(require("./seeds/CreateProductsSeeds"));
const CreateSituationsSeeds_1 = __importDefault(require("./seeds/CreateSituationsSeeds"));
const runSeeds = async () => {
    console.log('Conexão com o banco de dados...');
    // Inicializar a conexão com o banco de dados usando o AppDataSource
    await data_source_1.AppDataSource.initialize();
    console.log('Banco de dados conectado com sucesso!');
    try {
        //instancia da classe CreateSituationsSeeds
        const situationSeeds = new CreateSituationsSeeds_1.default();
        //run para criar as seeds
        await situationSeeds.run(data_source_1.AppDataSource);
        const productCategoriesSeeds = new CreateProductCategoriesSeeds_1.default();
        await productCategoriesSeeds.run(data_source_1.AppDataSource);
        const productSituationsSeeds = new CreateProductSituationsSeeds_1.default();
        await productSituationsSeeds.run(data_source_1.AppDataSource);
        const productsSeeds = new CreateProductsSeeds_1.default();
        await productsSeeds.run(data_source_1.AppDataSource);
    }
    catch (error) {
        console.log('Erro ao executar as seeds:', error);
    }
    finally {
        await data_source_1.AppDataSource.destroy();
        console.log('Conexão com o banco de dados encerrada.');
    }
};
runSeeds();
//# sourceMappingURL=run-seeds.js.map