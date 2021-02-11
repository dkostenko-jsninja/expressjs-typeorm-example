import { MigrationInterface, QueryRunner } from "typeorm";

export class createProjectTable1613051821539 implements MigrationInterface {
  name = "createProjectTable1613051821539";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "CREATE TABLE `project` (`id` int NOT NULL AUTO_INCREMENT, `uuid` varchar(36) NOT NULL, `name` varchar(255) NOT NULL, `description` longtext NOT NULL, `expirationDate` varchar(255) NOT NULL, `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_bcbc9244374131f3ccb908aa61` (`uuid`), PRIMARY KEY (`id`)) ENGINE=InnoDB"
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("DROP INDEX `IDX_bcbc9244374131f3ccb908aa61` ON `project`");
    await queryRunner.query("DROP TABLE `project`");
  }
}
