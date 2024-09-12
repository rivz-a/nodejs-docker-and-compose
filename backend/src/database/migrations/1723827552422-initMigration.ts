import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitMigration1723827552422 implements MigrationInterface {
  name = 'InitMigration1723827552422';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "wish_wishlists_wishlist" ("wishId" integer NOT NULL, "wishlistId" integer NOT NULL, CONSTRAINT "PK_12cb1d1b9be4d8bbafd0c381edd" PRIMARY KEY ("wishId", "wishlistId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b62ba7dc16f2cc40e6a03b9bb8" ON "wish_wishlists_wishlist" ("wishId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_60a361ee5c08f3b0b9881a8bad" ON "wish_wishlists_wishlist" ("wishlistId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "wish_wishlists_wishlist" ADD CONSTRAINT "FK_b62ba7dc16f2cc40e6a03b9bb80" FOREIGN KEY ("wishId") REFERENCES "wish"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "wish_wishlists_wishlist" ADD CONSTRAINT "FK_60a361ee5c08f3b0b9881a8bad5" FOREIGN KEY ("wishlistId") REFERENCES "wishlist"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "wish_wishlists_wishlist" DROP CONSTRAINT "FK_60a361ee5c08f3b0b9881a8bad5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "wish_wishlists_wishlist" DROP CONSTRAINT "FK_b62ba7dc16f2cc40e6a03b9bb80"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_60a361ee5c08f3b0b9881a8bad"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_b62ba7dc16f2cc40e6a03b9bb8"`,
    );
    await queryRunner.query(`DROP TABLE "wish_wishlists_wishlist"`);
  }
}
