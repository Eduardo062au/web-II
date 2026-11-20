import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddFieldsToUsers1793986761733 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns("users", [
            new TableColumn({ name: "phone", type: "varchar", length: "20", isNullable: true }),
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumns("users", ["phone"]);
    }
}
