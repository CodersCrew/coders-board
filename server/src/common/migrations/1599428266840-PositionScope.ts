import { MigrationInterface, QueryRunner } from 'typeorm';

export class PositionScope1599428266840 implements MigrationInterface {
  name = 'PositionScope1599428266840';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "status"`);
    await queryRunner.query(`DROP TYPE "public"."user_status_enum"`);
    await queryRunner.query(`CREATE TYPE "position_scopes_enum" AS ENUM('ORGANIZATION', 'GUILD', 'SQUAD')`);
    await queryRunner.query(`ALTER TABLE "position" ADD "scopes" "position_scopes_enum" array NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "position" DROP COLUMN "scopes"`);
    await queryRunner.query(`DROP TYPE "position_scopes_enum"`);
    await queryRunner.query(`CREATE TYPE "public"."user_status_enum" AS ENUM('PENDING', 'ACTIVE', 'INACTIVE')`);
    await queryRunner.query(`ALTER TABLE "user" ADD "status" "user_status_enum" NOT NULL DEFAULT 'PENDING'`);
  }
}
