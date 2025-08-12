import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1754665693631 implements MigrationInterface {
    name = 'InitSchema1754665693631'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "phone" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phone"`);
    }

}
