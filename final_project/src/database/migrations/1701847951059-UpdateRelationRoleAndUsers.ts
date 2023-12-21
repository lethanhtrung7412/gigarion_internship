import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateRelationRoleAndUsers1701847951059 implements MigrationInterface {
    name = 'UpdateRelationRoleAndUsers1701847951059'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_a2cecd1a3531c0b041e29ba46e1\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\` DROP COLUMN \`role_id\`
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`users\`
            ADD \`role_id\` int NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\`
            ADD CONSTRAINT \`FK_a2cecd1a3531c0b041e29ba46e1\` FOREIGN KEY (\`role_id\`) REFERENCES \`roles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

}
