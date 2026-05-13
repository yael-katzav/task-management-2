import { MigrationInterface, QueryRunner } from "typeorm"

export class SeedUsers1778702400000 implements MigrationInterface {
  name = "SeedUsers1778702400000"

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO users (name) VALUES
      ('Yael'),
      ('Eyal'),
      ('Nadav'),
      ('Shelly'),
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM users
      WHERE name IN ('Yael', 'Eyal', 'Nadav', 'Shelly')
    `)
  }
}
