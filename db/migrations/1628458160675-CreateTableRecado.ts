import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableRecado1628458160675 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "recado",
                columns: [
                    {
                        name: "uid",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "recado",
                        type: "varchar",
                        length: "500",
                        isUnique: false,
                        isNullable: false,
                    },
                    {
                        name: "detalhes",
                        type: "varchar",
                        length: "500",
                        isUnique: false,
                        isNullable: false,
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        isNullable: false,
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        isNullable: false,
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("recado");
    }
}
