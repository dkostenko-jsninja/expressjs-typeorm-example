import { MigrationInterface, QueryRunner } from "typeorm";

export class createDeveloperTable1612791011845 implements MigrationInterface {
  name = "createDeveloperTable1612791011845";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "CREATE TABLE `developer` (`id` int NOT NULL AUTO_INCREMENT, `uuid` varchar(36) NOT NULL, `email` varchar(255) NOT NULL, `firstName` varchar(255) NOT NULL, `lastName` varchar(255) NOT NULL, `photo` longtext NULL DEFAULT NULL, `level` enum ('junior', 'senior') NOT NULL DEFAULT 'junior', `employeeStatus` enum ('active', 'inactive') NOT NULL DEFAULT 'active', `created_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_98ca977665e1a50043616f1200` (`uuid`), UNIQUE INDEX `IDX_5ec8458c4013906f024055a3b2` (`email`), PRIMARY KEY (`id`)) ENGINE=InnoDB"
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("DROP INDEX `IDX_5ec8458c4013906f024055a3b2` ON `developer`");
    await queryRunner.query("DROP INDEX `IDX_98ca977665e1a50043616f1200` ON `developer`");
    await queryRunner.query("DROP TABLE `developer`");
  }
}
