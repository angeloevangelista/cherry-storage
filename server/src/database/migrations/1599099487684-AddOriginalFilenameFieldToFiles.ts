import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddOriginalFilenameFieldToFiles1599099487684
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'files',
      new TableColumn({
        name: 'original_filename',
        type: 'varchar',
        isNullable: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('files', 'original_filename');
  }
}
