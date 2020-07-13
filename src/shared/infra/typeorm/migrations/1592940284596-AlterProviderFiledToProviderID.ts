import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AlterProviderFiledToProviderID1592940284596
  implements MigrationInterface {
  table = 'appointments';

  foreignKey = 'AppointmentProvider';

  providerID = 'provider_id';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn(this.table, 'provider');
    await queryRunner.addColumn(
      this.table,
      new TableColumn({
        name: this.providerID,
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      this.table,
      new TableForeignKey({
        name: this.foreignKey,
        columnNames: [this.providerID],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(this.table, this.foreignKey);

    await queryRunner.dropColumn(this.table, this.providerID);

    await queryRunner.addColumn(
      this.table,
      new TableColumn({
        name: 'provider',
        type: 'varchar',
      }),
    );
  }
}
