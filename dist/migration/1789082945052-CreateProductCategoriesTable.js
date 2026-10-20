"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductCategoriesTable1788470014000 = void 0;
const typeorm_1 = require("typeorm");
class CreateProductCategoriesTable1788470014000 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: "product_categories",
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
        await queryRunner.dropTable("product_categories");
    }
}
exports.CreateProductCategoriesTable1788470014000 = CreateProductCategoriesTable1788470014000;
//# sourceMappingURL=1789082945052-CreateProductCategoriesTable.js.map