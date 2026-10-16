"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Situations_1 = require("../enity/Situations");
// Classe responsável por criar as seeds de situations no banco
class CreateSituationsSeeds {
    // Responsável por executar a criação de seeds de situations
    async run(dataSource) {
        console.log('Iniciando a criação das seeds de situações...');
        // Obtém o repositório da entidade Situation
        const situationRepository = dataSource.getRepository(Situations_1.Situation);
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
        ];
        // Criar as situações no banco de dados
        await situationRepository.save(situations);
        console.log('Seeds de situações criadas com sucesso!');
    }
}
exports.default = CreateSituationsSeeds;
//# sourceMappingURL=CreateSituationsSeeds.js.map