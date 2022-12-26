import { MigrationInterface, QueryRunner } from "typeorm"

export class activityStatus1671843784144 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(
            `INSERT INTO 
                activity_status
                (id, name, description, createdAt, updatedAt)
            VALUES 
                (1, 'occupied', 'pending table', '2022-12-24 00:00:00', '2022-12-24 00:00:00'),
                (2, 'pending', 'end of life of the table', '2022-12-24 00:00:00', '2022-12-24 00:00:00')
                (3, 'finished', 'busy table', '2022-12-24 00:00:00', '2022-12-24 00:00:00'),
                ON DUPLICATE KEY UPDATE`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(
            `DELETE FROM 
                activity_status
            WHERE
                id = 1 AND
                id = 2 AND
                id = 3`
        )
    }

}
