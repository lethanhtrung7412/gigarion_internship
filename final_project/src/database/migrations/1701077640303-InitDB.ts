import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDB1701077640303 implements MigrationInterface {
    name = 'InitDB1701077640303'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE \`permissions\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`name\` varchar(255) NOT NULL,
                \`code\` varchar(255) NOT NULL,
                \`roleId\` int NULL,
                UNIQUE INDEX \`IDX_48ce552495d14eae9b187bb671\` (\`name\`),
                UNIQUE INDEX \`IDX_8dad765629e83229da6feda1c1\` (\`code\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`roles\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`name\` varchar(255) NOT NULL,
                \`code\` varchar(255) NOT NULL,
                UNIQUE INDEX \`IDX_648e3f5447f725579d7d4ffdfb\` (\`name\`),
                UNIQUE INDEX \`IDX_f6d54f95c31b73fb1bdd8e91d0\` (\`code\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            CREATE TABLE \`users\` (
                \`id\` varchar(36) NOT NULL,
                \`username\` varchar(255) NOT NULL,
                \`password\` varchar(255) NOT NULL,
                \`firstName\` varchar(255) NOT NULL,
                \`lastName\` varchar(255) NOT NULL,
                \`role_code\` int NULL,
                UNIQUE INDEX \`IDX_fe0bb3f6520ee0469504521e71\` (\`username\`),
                UNIQUE INDEX \`REL_4c9cc87b3af04f8eed8bc046bc\` (\`role_code\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
        await queryRunner.query(`
            ALTER TABLE \`permissions\`
            ADD CONSTRAINT \`FK_36d7b8e1a331102ec9161e879ce\` FOREIGN KEY (\`roleId\`) REFERENCES \`roles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE \`users\`
            ADD CONSTRAINT \`FK_4c9cc87b3af04f8eed8bc046bc9\` FOREIGN KEY (\`role_code\`) REFERENCES \`roles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_4c9cc87b3af04f8eed8bc046bc9\`
        `);
        await queryRunner.query(`
            ALTER TABLE \`permissions\` DROP FOREIGN KEY \`FK_36d7b8e1a331102ec9161e879ce\`
        `);
        await queryRunner.query(`
            DROP INDEX \`REL_4c9cc87b3af04f8eed8bc046bc\` ON \`users\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_fe0bb3f6520ee0469504521e71\` ON \`users\`
        `);
        await queryRunner.query(`
            DROP TABLE \`users\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_f6d54f95c31b73fb1bdd8e91d0\` ON \`roles\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_648e3f5447f725579d7d4ffdfb\` ON \`roles\`
        `);
        await queryRunner.query(`
            DROP TABLE \`roles\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_8dad765629e83229da6feda1c1\` ON \`permissions\`
        `);
        await queryRunner.query(`
            DROP INDEX \`IDX_48ce552495d14eae9b187bb671\` ON \`permissions\`
        `);
        await queryRunner.query(`
            DROP TABLE \`permissions\`
        `);
    }

}
