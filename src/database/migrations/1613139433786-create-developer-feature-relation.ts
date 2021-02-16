import { MigrationInterface, QueryRunner } from "typeorm";

export class createDeveloperFeatureRelation1613139433786 implements MigrationInterface {
  name = "createDeveloperFeatureRelation1613139433786";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("ALTER TABLE `feature` ADD `developerId` int NULL");
    await queryRunner.query(
      "ALTER TABLE `feature` ADD CONSTRAINT `FK_8bd73e855a2c595a7b817dad541` FOREIGN KEY (`developerId`) REFERENCES `developer`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION"
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "ALTER TABLE `feature` DROP FOREIGN KEY `FK_8bd73e855a2c595a7b817dad541`"
    );
    await queryRunner.query("ALTER TABLE `feature` DROP COLUMN `developerId`");
  }
}
