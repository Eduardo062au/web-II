"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddFieldsToProducts1793986751793 = void 0;
const typeorm_1 = require("typeorm");
class AddFieldsToProducts1793986751793 {
    async up(queryRunner) {
        await queryRunner.addColumns("products", [
            new typeorm_1.TableColumn({ name: "slug", type: "varchar", length: "255", isNullable: true, isUnique: true }),
            new typeorm_1.TableColumn({ name: "description", type: "longtext", isNullable: true }),
            new typeorm_1.TableColumn({ name: "price", type: "decimal", precision: 10, scale: 2, isNullable: true }),
        ]);
    }
    async down(queryRunner) {
        await queryRunner.dropColumns("products", ["slug", "description", "price"]);
    }
}
exports.AddFieldsToProducts1793986751793 = AddFieldsToProducts1793986751793;
//# sourceMappingURL=1793986751793-AddFieldsToProducts.js.map