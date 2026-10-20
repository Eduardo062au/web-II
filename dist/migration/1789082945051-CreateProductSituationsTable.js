"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductSituationsTable1788470014100 = void 0;
const typeorm_1 = require("typeorm");
class CreateProductSituationsTable1788470014100 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: "product_situations",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment"
                },
                {
                    name: "name",
                    type: "varchar"
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
        await queryRunner.dropTable("product_situations");
    }
}
exports.CreateProductSituationsTable1788470014100 = CreateProductSituationsTable1788470014100;
//# sourceMappingURL=1789082945051-CreateProductSituationsTable.js.map