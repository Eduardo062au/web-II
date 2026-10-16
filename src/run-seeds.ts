import { AppDataSource } from "./data-source";
import CreateSituationsSeeds from "./seeds/CreateSituationsSeeds";

const runSeeds = async() =>{
    console.log('Conexão com o banco de dados...')

    // Inicializar a conexão com o banco de dados usando o AppDataSource
    await AppDataSource.initialize();

    console.log('Banco de dados conectado com sucesso!');

    try {

        //instancia da classe CreateSituationsSeeds
        const situationSeeds = new CreateSituationsSeeds();

        //run para criar as seeds
        await situationSeeds.run(AppDataSource);


    } catch (error) {

        console.log('Erro ao executar as seeds:', error);

    } finally {

        await AppDataSource.destroy();
        console.log('Conexão com o banco de dados encerrada.');
    }        
};

runSeeds();