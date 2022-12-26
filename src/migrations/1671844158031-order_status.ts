import { MigrationInterface, QueryRunner } from "typeorm"

export class orderStatus1671844158031 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(
            `INSERT INTO
                order_status
                (id, name, description, createdAt, updatedAt)
            VALUES
                (1, 'ordered', 'order just made from the table', '2022-12-24 00:00:00', '2022-12-24 00:00:00'),
                (2, 'cooking, 'order received and being prepared', '2022-12-24 00:00:00', '2022-12-24 00:00:00'),
                (3, 'ready', 'order ready to be served', '2022-12-24 00:00:00', '2022-12-24 00:00:00'),
                (4, 'served', 'order served to the table', '2022-12-24 00:00:00', '2022-12-24 00:00:00'),
                (5, 'cancel_requested', 'order cancelled by the table', '2022-12-24 00:00:00', '2022-12-24 00:00:00'),
                (6, 'cancelled', 'order cancelled by the kitchen', '2022-12-24 00:00:00', '2022-12-24 00:00:00'),
                ON DUPLICATE KEY UPDATE`
        )

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(
            `DELETE FROM
                order_status
            WHERE
                id = 1 AND
                id = 2 AND
                id = 3 AND
                id = 4 AND
                id = 5 AND
                id = 6`
        )
    }

}
