import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitMigration1723813445918 implements MigrationInterface {
  name = 'InitMigration1723813445918';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "wish" DROP CONSTRAINT "FK_d976be560c304e5396c50bd72c4"`,
    );
    await queryRunner.query(`ALTER TABLE "wish" DROP COLUMN "createdAt"`);
    await queryRunner.query(
      `ALTER TABLE "wish" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(`ALTER TABLE "wish" DROP COLUMN "updatedAt"`);
    await queryRunner.query(
      `ALTER TABLE "wish" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "wish" ALTER COLUMN "ownerId" DROP NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "offer" DROP COLUMN "createdAt"`);
    await queryRunner.query(
      `ALTER TABLE "offer" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(`ALTER TABLE "offer" DROP COLUMN "updatedAt"`);
    await queryRunner.query(
      `ALTER TABLE "offer" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "createdAt"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updatedAt"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(`ALTER TABLE "wishlist" DROP COLUMN "createdAt"`);
    await queryRunner.query(
      `ALTER TABLE "wishlist" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(`ALTER TABLE "wishlist" DROP COLUMN "updatedAt"`);
    await queryRunner.query(
      `ALTER TABLE "wishlist" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "wish" ADD CONSTRAINT "FK_d976be560c304e5396c50bd72c4" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "wish" DROP CONSTRAINT "FK_d976be560c304e5396c50bd72c4"`,
    );
    await queryRunner.query(`ALTER TABLE "wishlist" DROP COLUMN "updatedAt"`);
    await queryRunner.query(
      `ALTER TABLE "wishlist" ADD "updatedAt" date NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(`ALTER TABLE "wishlist" DROP COLUMN "createdAt"`);
    await queryRunner.query(
      `ALTER TABLE "wishlist" ADD "createdAt" date NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updatedAt"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "updatedAt" date NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "createdAt"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "createdAt" date NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(`ALTER TABLE "offer" DROP COLUMN "updatedAt"`);
    await queryRunner.query(
      `ALTER TABLE "offer" ADD "updatedAt" date NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(`ALTER TABLE "offer" DROP COLUMN "createdAt"`);
    await queryRunner.query(
      `ALTER TABLE "offer" ADD "createdAt" date NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "wish" ALTER COLUMN "ownerId" SET NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "wish" DROP COLUMN "updatedAt"`);
    await queryRunner.query(
      `ALTER TABLE "wish" ADD "updatedAt" date NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(`ALTER TABLE "wish" DROP COLUMN "createdAt"`);
    await queryRunner.query(
      `ALTER TABLE "wish" ADD "createdAt" date NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "wish" ADD CONSTRAINT "FK_d976be560c304e5396c50bd72c4" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
