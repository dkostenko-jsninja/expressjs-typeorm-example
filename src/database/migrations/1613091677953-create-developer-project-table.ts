import { MigrationInterface, QueryRunner } from "typeorm";

export class createDeveloperProjectTable1613091677953 implements MigrationInterface {
  name = "createDeveloperProjectTable1613091677953";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "CREATE TABLE `developerProject` (`id` int NOT NULL AUTO_INCREMENT, `developerId` int NULL, `projectId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB"
    );
    await queryRunner.query(
      "ALTER TABLE `developerProject` ADD CONSTRAINT `FK_deebd35a9db257d05846d3bb881` FOREIGN KEY (`developerId`) REFERENCES `developer`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION"
    );
    await queryRunner.query(
      "ALTER TABLE `developerProject` ADD CONSTRAINT `FK_ce7e6bcce08ade33549f4d38e4e` FOREIGN KEY (`projectId`) REFERENCES `project`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION"
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "ALTER TABLE `developerProject` DROP FOREIGN KEY `FK_ce7e6bcce08ade33549f4d38e4e`"
    );
    await queryRunner.query(
      "ALTER TABLE `developerProject` DROP FOREIGN KEY `FK_deebd35a9db257d05846d3bb881`"
    );
    await queryRunner.query("DROP TABLE `developerProject`");
  }
}
