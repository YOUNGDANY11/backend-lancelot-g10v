import { MigrationInterface, QueryRunner } from "typeorm";

export class ShouldBeEmpty1789510891016 implements MigrationInterface {
    name = 'ShouldBeEmpty1789510891016'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "acwr_thresholds" ALTER COLUMN "low_min" SET DEFAULT '0.8'`);
        await queryRunner.query(`ALTER TABLE "acwr_thresholds" ALTER COLUMN "low_max" SET DEFAULT '1.3'`);
        await queryRunner.query(`ALTER TABLE "acwr_thresholds" ALTER COLUMN "medium_max" SET DEFAULT '1.5'`);
        await queryRunner.query(`ALTER TABLE "injury_risk_rule_configs" ALTER COLUMN "sustained_acwr_threshold" SET DEFAULT '1.5'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "injury_risk_rule_configs" ALTER COLUMN "sustained_acwr_threshold" SET DEFAULT 1.5`);
        await queryRunner.query(`ALTER TABLE "acwr_thresholds" ALTER COLUMN "medium_max" SET DEFAULT 1.5`);
        await queryRunner.query(`ALTER TABLE "acwr_thresholds" ALTER COLUMN "low_max" SET DEFAULT 1.3`);
        await queryRunner.query(`ALTER TABLE "acwr_thresholds" ALTER COLUMN "low_min" SET DEFAULT 0.8`);
    }

}
