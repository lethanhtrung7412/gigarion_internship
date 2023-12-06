import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateFieldInUser1701314107772 implements MigrationInterface {
    name = 'UpdateFieldInUser1701314107772'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP INDEX \`IDX_fe0bb3f6520ee0469504521e71\` ON \`users\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\` CHANGE \`username\` \`email\` varchar(255) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\` DROP COLUMN \`email\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\`
            ADD \`email\` varchar(255) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\`
            ADD UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`)
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`users\` DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\` DROP COLUMN \`email\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\`
            ADD \`email\` varchar(255) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\` CHANGE \`email\` \`username\` varchar(255) NOT NULL
        `);
        await queryRunner.query(`
            CREATE UNIQUE INDEX \`IDX_fe0bb3f6520ee0469504521e71\` ON \`users\` (\`username\`)
        `);
    }

}
