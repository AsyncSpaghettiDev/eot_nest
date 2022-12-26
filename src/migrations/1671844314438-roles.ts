import { MigrationInterface, QueryRunner } from "typeorm"

export class roles1671844314438 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(
            `INSERT INTO
                roles
                (id, name, description, isStaff, createdAt, updatedAt)
            VALUES
                (1, 'admin', 'admin role', true, '2022-12-24 00:00:00', '2022-12-24 00:00:00'),
                (2, 'chef', 'Culinary expertise to create appetizing dishes for diners to enjoy.', true, '2022-12-24 00:00:00', '2022-12-24 00:00:00'),
                (3, 'waiter', 'Assist restaurant patrons by noting their order, serving tables their requested meals, and preparing bills at the end of the table's meal.', true, '2022-12-24 00:00:00', '2022-12-24 00:00:00'),
                (4, 'table', 'Place from where customer place orders', false, '2022-12-24 00:00:00', '2022-12-24 00:00:00'),
                ON DUPLICATE KEY UPDATE`
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(
            `DELETE FROM
                roles
            WHERE
                id = 1 AND
                id = 2 AND
                id = 3 AND
                id = 4`
        )
    }

}
