import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1778702319689 implements MigrationInterface {
    name = 'InitSchema1778702319689'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "procurement_tasks" ("taskId" varchar PRIMARY KEY NOT NULL, "quote1" varchar, "quote2" varchar, "receipt" varchar)`);
        await queryRunner.query(`CREATE TABLE "tasks" ("id" varchar PRIMARY KEY NOT NULL, "type" varchar NOT NULL, "status" integer NOT NULL DEFAULT (1), "isClosed" boolean NOT NULL DEFAULT (0), "assignedUserId" integer NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE TABLE "development_tasks" ("taskId" varchar PRIMARY KEY NOT NULL, "specification" varchar, "branchName" varchar, "version" varchar)`);
        await queryRunner.query(`CREATE TABLE "temporary_procurement_tasks" ("taskId" varchar PRIMARY KEY NOT NULL, "quote1" varchar, "quote2" varchar, "receipt" varchar, CONSTRAINT "FK_7e9d6ab6080cc28752e0516dd11" FOREIGN KEY ("taskId") REFERENCES "tasks" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_procurement_tasks"("taskId", "quote1", "quote2", "receipt") SELECT "taskId", "quote1", "quote2", "receipt" FROM "procurement_tasks"`);
        await queryRunner.query(`DROP TABLE "procurement_tasks"`);
        await queryRunner.query(`ALTER TABLE "temporary_procurement_tasks" RENAME TO "procurement_tasks"`);
        await queryRunner.query(`CREATE TABLE "temporary_tasks" ("id" varchar PRIMARY KEY NOT NULL, "type" varchar NOT NULL, "status" integer NOT NULL DEFAULT (1), "isClosed" boolean NOT NULL DEFAULT (0), "assignedUserId" integer NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), CONSTRAINT "FK_cf34ff7f1de7b973b7ad5f536de" FOREIGN KEY ("assignedUserId") REFERENCES "users" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_tasks"("id", "type", "status", "isClosed", "assignedUserId", "createdAt") SELECT "id", "type", "status", "isClosed", "assignedUserId", "createdAt" FROM "tasks"`);
        await queryRunner.query(`DROP TABLE "tasks"`);
        await queryRunner.query(`ALTER TABLE "temporary_tasks" RENAME TO "tasks"`);
        await queryRunner.query(`CREATE TABLE "temporary_development_tasks" ("taskId" varchar PRIMARY KEY NOT NULL, "specification" varchar, "branchName" varchar, "version" varchar, CONSTRAINT "FK_7d7d0aa416da4b11359ef8808e6" FOREIGN KEY ("taskId") REFERENCES "tasks" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_development_tasks"("taskId", "specification", "branchName", "version") SELECT "taskId", "specification", "branchName", "version" FROM "development_tasks"`);
        await queryRunner.query(`DROP TABLE "development_tasks"`);
        await queryRunner.query(`ALTER TABLE "temporary_development_tasks" RENAME TO "development_tasks"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "development_tasks" RENAME TO "temporary_development_tasks"`);
        await queryRunner.query(`CREATE TABLE "development_tasks" ("taskId" varchar PRIMARY KEY NOT NULL, "specification" varchar, "branchName" varchar, "version" varchar)`);
        await queryRunner.query(`INSERT INTO "development_tasks"("taskId", "specification", "branchName", "version") SELECT "taskId", "specification", "branchName", "version" FROM "temporary_development_tasks"`);
        await queryRunner.query(`DROP TABLE "temporary_development_tasks"`);
        await queryRunner.query(`ALTER TABLE "tasks" RENAME TO "temporary_tasks"`);
        await queryRunner.query(`CREATE TABLE "tasks" ("id" varchar PRIMARY KEY NOT NULL, "type" varchar NOT NULL, "status" integer NOT NULL DEFAULT (1), "isClosed" boolean NOT NULL DEFAULT (0), "assignedUserId" integer NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`INSERT INTO "tasks"("id", "type", "status", "isClosed", "assignedUserId", "createdAt") SELECT "id", "type", "status", "isClosed", "assignedUserId", "createdAt" FROM "temporary_tasks"`);
        await queryRunner.query(`DROP TABLE "temporary_tasks"`);
        await queryRunner.query(`ALTER TABLE "procurement_tasks" RENAME TO "temporary_procurement_tasks"`);
        await queryRunner.query(`CREATE TABLE "procurement_tasks" ("taskId" varchar PRIMARY KEY NOT NULL, "quote1" varchar, "quote2" varchar, "receipt" varchar)`);
        await queryRunner.query(`INSERT INTO "procurement_tasks"("taskId", "quote1", "quote2", "receipt") SELECT "taskId", "quote1", "quote2", "receipt" FROM "temporary_procurement_tasks"`);
        await queryRunner.query(`DROP TABLE "temporary_procurement_tasks"`);
        await queryRunner.query(`DROP TABLE "development_tasks"`);
        await queryRunner.query(`DROP TABLE "tasks"`);
        await queryRunner.query(`DROP TABLE "procurement_tasks"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
