"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("./data-source");
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