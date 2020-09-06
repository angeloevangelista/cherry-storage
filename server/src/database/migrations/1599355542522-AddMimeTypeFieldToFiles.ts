import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddMimeTypeFieldToFiles1599355542522
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'files',
      new TableColumn({
        name: 'mime_type',
        type: 'varchar',
        isNullable: false,
        default: `'application/octet-stream'`,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('files', 'mime_type');
  }
}
