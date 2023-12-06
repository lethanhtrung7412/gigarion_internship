import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateRelationRoleAndUsers1701748469934 implements MigrationInterface {
    name = 'UpdateRelationRoleAndUsers1701748469934'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_4c9cc87b3af04f8eed8bc046bc9\`
        `);
        await queryRunner.query(`
            DROP INDEX \`REL_4c9cc87b3af04f8eed8bc046bc\` ON \`users\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\` CHANGE \`role_code\` \`role_id\` int NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`roles\`
            ADD \`userId\` varchar(36) NULL
        `);
        await queryRunner.query(`
            ALTER TABLE \`roles\`
            ADD CONSTRAINT \`FK_c8db5603420d119933bbc5c398c\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\`
            ADD CONSTRAINT \`FK_a2cecd1a3531c0b041e29ba46e1\` FOREIGN KEY (\`role_id\`) REFERENCES \`roles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_a2cecd1a3531c0b041e29ba46e1\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`roles\` DROP FOREIGN KEY \`FK_c8db5603420d119933bbc5c398c\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`roles\` DROP COLUMN \`userId\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\` CHANGE \`role_id\` \`role_code\` int NULL
        `);
        await queryRunner.query(`
            CREATE UNIQUE INDEX \`REL_4c9cc87b3af04f8eed8bc046bc\` ON \`users\` (\`role_code\`)
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\`
            ADD CONSTRAINT \`FK_4c9cc87b3af04f8eed8bc046bc9\` FOREIGN KEY (\`role_code\`) REFERENCES \`roles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

}
