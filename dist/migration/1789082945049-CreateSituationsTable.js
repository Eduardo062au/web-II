"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSituationsTable1788469990157 = void 0;
const typeorm_1 = require("typeorm");
class CreateSituationsTable1788469990157 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: "situations",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment"
                },
                {
                    name: "nameSituation",
                    type: "varchar",
                    isUnique: true,
                }, {
                    name: "createdAt",
                    type: "timestamp",
                    default: "CURRENT_TIMESTAMP"
                }, {
                    name: "updatedAt",
                    type: "timestamp",
                    default: "CURRENT_TIMESTAMP",
                    onUpdate: "CURRENT_TIMESTAMP"
                }
            ]
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable("situations");
    }
}
exports.CreateSituationsTable1788469990157 = CreateSituationsTable1788469990157;
//# sourceMappingURL=1789082945049-CreateSituationsTable.js.map