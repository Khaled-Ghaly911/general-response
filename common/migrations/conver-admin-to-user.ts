// src/migrations/1670000000001-ConvertAdminToUser.ts
import { MigrationInterface, QueryRunner } from 'typeorm';

export class ConvertAdminToUser1670000000001 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      UPDATE "user"
      SET role = 'user'
      WHERE role = 'admin';
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // If you ever need to roll back, this would turn users back into admins.
    await queryRunner.query(`
      UPDATE "user"
      SET role = 'admin'
      WHERE id IN (
        -- choose which ones should revert; here, we’ll do none
        SELECT id FROM "user" WHERE role = 'user' AND created_at < now() - interval '1 minute'
      );
    `);
  }
}
