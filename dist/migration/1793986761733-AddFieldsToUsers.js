"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddFieldsToUsers1793986761733 = void 0;
const typeorm_1 = require("typeorm");
class AddFieldsToUsers1793986761733 {
    async up(queryRunner) {
        await queryRunner.addColumns("users", [
            new typeorm_1.TableColumn({ name: "phone", type: "varchar", length: "20", isNullable: true }),
        ]);
    }
    async down(queryRunner) {
        await queryRunner.dropColumns("users", ["phone"]);
    }
}
exports.AddFieldsToUsers1793986761733 = AddFieldsToUsers1793986761733;
//# sourceMappingURL=1793986761733-AddFieldsToUsers.js.map