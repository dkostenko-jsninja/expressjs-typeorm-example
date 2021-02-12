import { MigrationInterface, QueryRunner } from "typeorm";

export class createFeatureTable1613080150700 implements MigrationInterface {
  name = "createFeatureTable1613080150700";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "CREATE TABLE `feature` (`id` int NOT NULL AUTO_INCREMENT, `uuid` varchar(36) NOT NULL, `name` varchar(255) NOT NULL, `description` longtext NOT NULL, `expirationDate` varchar(255) NULL DEFAULT NULL, `developerUuid` varchar(36) NULL DEFAULT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `projectId` int NULL, UNIQUE INDEX `IDX_60e29ee71d49303aec703fdb9e` (`uuid`), PRIMARY KEY (`id`)) ENGINE=InnoDB"
    );
    await queryRunner.query(
      "ALTER TABLE `feature` ADD CONSTRAINT `FK_f91cf97e77a2abd7df67ca1748f` FOREIGN KEY (`projectId`) REFERENCES `project`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION"
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "ALTER TABLE `feature` DROP FOREIGN KEY `FK_f91cf97e77a2abd7df67ca1748f`"
    );
    await queryRunner.query("DROP INDEX `IDX_60e29ee71d49303aec703fdb9e` ON `feature`");
    await queryRunner.query("DROP TABLE `feature`");
  }
}
