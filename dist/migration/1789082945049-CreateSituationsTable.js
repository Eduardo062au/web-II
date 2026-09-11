"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSituationsTable1789082945049 = void 0;
const typeorm_1 = require("typeorm");
class CreateSituationsTable1789082945049 {
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
                    name: "nameSituatuions",
                    type: "varchar"
                },
                {
                    name: "createAt",
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
exports.CreateSituationsTable1789082945049 = CreateSituationsTable1789082945049;
//# sourceMappingURL=1789082945049-CreateSituationsTable.js.map