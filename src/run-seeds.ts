import { AppDataSource } from "./data-source";
import CreateProductCategoriesSeeds from "./seeds/CreateProductCategoriesSeeds";
import CreateProductSituationsSeeds from "./seeds/CreateProductSituationsSeeds";
import CreateProductsSeeds from "./seeds/CreateProductsSeeds";
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

        const productCategoriesSeeds = new CreateProductCategoriesSeeds();
        await productCategoriesSeeds.run(AppDataSource);

        const productSituationsSeeds = new CreateProductSituationsSeeds();
        await productSituationsSeeds.run(AppDataSource);

        const productsSeeds = new CreateProductsSeeds();
        await productsSeeds.run(AppDataSource);        

    } catch (error) {

        console.log('Erro ao executar as seeds:', error);

    } finally {

        await AppDataSource.destroy();
        console.log('Conexão com o banco de dados encerrada.');
    }        
};

runSeeds();