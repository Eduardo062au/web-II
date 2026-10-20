import { DataSource } from 'typeorm';
import { Product } from '../enity/Products';
import { ProductCategory } from '../enity/ProductCategories';
import { ProductSituation } from '../enity/ProductSituations';

// Classe responsável por criar as seeds de produtos no banco de dados
export default class CreateProductsSeeds {

    // Método responsável por executar a criação das seeds de produtos
    public async run(dataSource: DataSource): Promise<void> {
        console.log('Iniciando a criação das seeds de produtos...');

        // Obter o repositório da entidade Product
        const productRepository = dataSource.getRepository(Product);

        // Verificar se já existem produtos no banco de dados
        const existingProducts = await productRepository.count();

        // Se já existirem produtos, não criar novamente
        if (existingProducts > 0) {
            console.log('As seeds de produtos já foram criadas anteriormente. Nenhuma ação será realizada.');
            return;
        }

        // Obter os repositórios das entidades ProductCategory e ProductSituation
        const productCategoryRepository = dataSource.getRepository(ProductCategory);

        // Obter o repositório da entidade ProductSituation
        const productSituationRepository = dataSource.getRepository(ProductSituation);

        // Verificar se já existem categorias e situações de produtos no banco de dados
        const categories = await productCategoryRepository.find();

        // Obter o repositório da entidade ProductSituation
        const situations = await productSituationRepository.find();

        // Se não existirem categorias ou situações de produtos, exibir uma mensagem e encerrar a execução
        const [categoria1, categoria2, categoria3] = categories;
        const [situacao1, situacao2] = situations;

        if (!categoria1 || !categoria2 || !categoria3 || !situacao1 || !situacao2) {
            console.log('Categorias ou situações de produtos insuficientes. Execute as seeds anteriores primeiro.');
            return;
        }

        // Dados dos produtos a serem criados
        const productsData = [
            {
                name: 'Smartphone',
                productCategory: categoria1,
                productSituation: situacao1,
            },
            {
                name: 'Camiseta',
                productCategory: categoria2,
                productSituation: situacao1,
            },
            {
                name: 'Air Jordan',
                productCategory: categoria3,
                productSituation: situacao2,
            },
        ];

        // Criar os produtos no banco de dados
        await productRepository.save(productsData);
        console.log('Seeds de produtos criadas com sucesso!');
    }
}
