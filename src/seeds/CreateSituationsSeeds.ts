import { DataSource } from "typeorm";
import { Situation } from "../enity/Situations";

// Classe responsável por criar as seeds de situations no banco
export default class CreateSituationsSeeds {

     // Responsável por executar a criação de seeds de situations
    public async run (dataSource: DataSource): Promise<void>{
        console.log('Iniciando a criação das seeds de situações...');

        // Obtém o repositório da entidade Situation
        const situationRepository = dataSource.getRepository(Situation);

        // Verifica se já existem situations no banco
        const existingSituations = await situationRepository.count();

        // Se já existirem situações não irá criar novamente
        if (existingSituations > 0) {
            console.log('As seeds de situações já foram criadas anteriormente. Nenhuma ação será realizada.');
            return;
        }

        // Dados das situações a serem criadas
        const situations = [
            { nameSituatuions: 'Ativo' },
            { nameSituatuions: 'Inativo' },
            { nameSituatuions: 'Pendente' },
        ]

        // Criar as situações no banco de dados
        await situationRepository.save(situations);
        console.log('Seeds de situações criadas com sucesso!');
    }

}