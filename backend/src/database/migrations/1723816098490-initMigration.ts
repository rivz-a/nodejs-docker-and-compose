import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitMigration1723816098490 implements MigrationInterface {
  name = 'InitMigration1723816098490';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "wishlist" DROP CONSTRAINT "FK_acf92a9b67b36657847695751ba"`,
    );
    await queryRunner.query(
      `ALTER TABLE "wishlist" ALTER COLUMN "ownerId" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "wishlist" ADD CONSTRAINT "FK_acf92a9b67b36657847695751ba" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "wishlist" DROP CONSTRAINT "FK_acf92a9b67b36657847695751ba"`,
    );
    await queryRunner.query(
      `ALTER TABLE "wishlist" ALTER COLUMN "ownerId" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "wishlist" ADD CONSTRAINT "FK_acf92a9b67b36657847695751ba" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
