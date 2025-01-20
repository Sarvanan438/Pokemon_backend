import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUser1737296310719 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    `CREATE TABLE "user" (
      "id" char(35) NOT NULL DEFAULT(UUID()),
      "username" character varying NOT NULL, 
      "password" character varying NOT NULL, 
      "email" character varying NOT NULL, 
      CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`;
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    `DROP TABLE "user"`;
  }
}
