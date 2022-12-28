import { MigrationInterface, QueryRunner } from 'typeorm'

export class notes1671844549649 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(
            `INSERT INTO
                notes
                (id, name, description, createdAt, updatedAt)
            VALUES
                (1, 'No salt', 'Don't aggregate salt', '2022-12-24 00:00:00', '2022-12-24 00:00:00'),
                (2, 'No pepper', 'Don't aggregate pepper', '2022-12-24 00:00:00', '2022-12-24 00:00:00'),
                (3, 'No sugar', 'Don't aggregate sugar', '2022-12-24 00:00:00', '2022-12-24 00:00:00'),
                (4, 'No ketchup', 'Don't aggregate ketchup', '2022-12-24 00:00:00', '2022-12-24 00:00:00'),
                (5, 'No mustard', 'Don't aggregate mustard', '2022-12-24 00:00:00', '2022-12-24 00:00:00'),
                (6, 'No mayo', 'Don't aggregate mayo', '2022-12-24 00:00:00', '2022-12-24 00:00:00'),
                (7, 'No cheese', 'Don't aggregate cheese', '2022-12-24 00:00:00', '2022-12-24 00:00:00'),
                (8, 'No bacon', 'Don't aggregate bacon', '2022-12-24 00:00:00', '2022-12-24 00:00:00'),
                (9, 'No lettuce', 'Don't aggregate lettuce', '2022-12-24 00:00:00', '2022-12-24 00:00:00'),
                (10, 'No tomato', 'Don't aggregate tomato', '2022-12-24 00:00:00', '2022-12-24 00:00:00'),
                (11, 'No onion', 'Don't aggregate onion', '2022-12-24 00:00:00', '2022-12-24 00:00:00'),
                (12, 'No pickle', 'Don't aggregate pickle', '2022-12-24 00:00:00', '2022-12-24 00:00:00'),
                (13, 'No jalapeno', 'Don't aggregate jalapeno', '2022-12-24 00:00:00', '2022-12-24 00:00:00'),
                (14, 'No extra condiments', 'Don't aggregate extra condiments', '2022-12-24 00:00:00', '2022-12-24 00:00:00'),
                ON DUPLICATE KEY UPDATE`
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(
            `DELETE FROM
                notes
            WHERE
                id = 1 AND
                id = 2 AND
                id = 3 AND
                id = 4 AND
                id = 5 AND
                id = 6 AND
                id = 7 AND
                id = 8 AND
                id = 9 AND
                id = 10 AND
                id = 11 AND
                id = 12 AND
                id = 13 AND
                id = 14`
    )
  }
}
