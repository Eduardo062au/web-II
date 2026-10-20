"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateProductsTable1788470014200 = void 0;
const typeorm_1 = require("typeorm");
class CreateProductsTable1788470014200 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: "products",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment"
                }, {
                    name: "name",
                    type: "varchar"
                }, {
                    name: "productSituationId",
                    type: "int"
                }, {
                    name: "productCategoryId",
                    type: "int"
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
        await queryRunner.createForeignKey("products", new typeorm_1.TableForeignKey({
            columnNames: ["productSituationId"],
            referencedColumnNames: ["id"],
            referencedTableName: "product_situations",
            onDelete: "CASCADE"
        }));
        await queryRunner.createForeignKey("products", new typeorm_1.TableForeignKey({
            columnNames: ["productCategoryId"],
            referencedColumnNames: ["id"],
            referencedTableName: "product_categories",
            onDelete: "CASCADE"
        }));
    }
    async down(queryRunner) {
        const table = await queryRunner.getTable("products");
        if (table) {
            for (const foreignKey of table.foreignKeys) {
                await queryRunner.dropForeignKey("products", foreignKey);
            }
        }
        await queryRunner.dropTable("products");
    }
}
exports.CreateProductsTable1788470014200 = CreateProductsTable1788470014200;
//# sourceMappingURL=1789082945050-CreateProductsTable.js.map