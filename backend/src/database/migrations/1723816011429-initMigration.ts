import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitMigration1723816011429 implements MigrationInterface {
  name = 'InitMigration1723816011429';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "wishlist" DROP COLUMN "description"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "wishlist" ADD "description" character varying(1500) NOT NULL`,
    );
  }
}
