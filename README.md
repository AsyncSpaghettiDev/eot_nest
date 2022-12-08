# EatOnTime backend API
This is the backend API for the EatOnTime app. It is written in Node.js and uses NestJS / Express.js as the web framework. It uses PostgreSQL as the database, and TypeORM as the ORM.
Currently, the API is hosted on Fly.io at 

## Getting Started
### Prerequisites
- Node.js
- PostgreSQL


### Installing
1. Clone the repository
2. Install dependencies
3. Create a .env file in the root directory and add the following environment variables:
```
DATABASE_URL=
DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=
DB_DATABASE=
# PORT for the API
PORT=
# for session management
SESSION_SECRET=
# adminjs credentials
ADMIN_EMAIL=
ADMIN_PASSWORD=
```
4. Run `npm run start:dev` to start the server in development mode

## Deployment
The API is currently deployed on Fly.io. To deploy, run `npm run build` and then `npm run start:prod`.

## Built With
- [NestJS](https://nestjs.com/) - The web framework used
- [TypeScript](https://www.typescriptlang.org/) - The language used
- [TypeORM](https://typeorm.io/#/) - The ORM used
- [PostgreSQL](https://www.postgresql.org/) - The database used
- [Fly.io](https://fly.io/) - The hosting service used

## API Documentation
### Admin Panel
The admin panel is accessible at `/admin`. It is used to manage the database. The credentials are set in the .env file.
### Routes
#### Authentication
| Method | Role Required | Route                      | Description           |
| ------ | ------------- | -------------------------- | --------------------- |
| POST   |               | api/auth/login             | Login into the system |
| GET    | Authenticated | api/auth/                  | Get the current user  |
| GET    |               | api/auth/encrypt?password= | Encrypt a password    |
| POST   | Authenticated | api/auth/logout            | Logout of the system  |

#### Users
| Method | Role Required | Route         | Description      |
| ------ | ------------- | ------------- | ---------------- |
| GET    | Admin         | api/users/    | Get all users    |
| GET    | Admin         | api/users/:id | Get a user by id |
| POST   | Admin         | api/users/    | Create a user    |
| PUT    | Admin         | api/users/:id | Update a user    |
| DELETE | Admin         | api/users/:id | Delete a user    |
#### Tables
| Method | Role Required | Route                  | Description                               |
| ------ | ------------- | ---------------------- | ----------------------------------------- |
| GET    | Authenticated | api/tables/            | Get all tables                            |
| GET    | Admin         | api/tables/history     | Get all tables with deleted activities    |
| GET    | Authenticated | api/tables/:id         | Get a table by id                         |
| GET    | Admin         | api/tables/history/:id | Get a table by id with deleted activities |
| POST   | Staff         | api/tables/            | Create a table                            |
| PUT    | Staff         | api/tables/:id         | Update a table                            |
| DELETE | Admin         | api/tables/:id         | Delete a table                            |
#### Categories
| Method | Role Required | Route            | Description          |
| ------ | ------------- | ---------------- | -------------------- |
| GET    |               | api/category/    | Get all categories   |
| GET    |               | api/category/:id | Get a category by id |
| POST   | Admin         | api/category/    | Create a category    |
| PUT    | Admin         | api/category/:id | Update a category    |
| DELETE | Admin         | api/category/:id | Delete a category    |
#### Plates
| Method | Role Required | Route          | Description       |
| ------ | ------------- | -------------- | ----------------- |
| GET    |               | api/plates/    | Get all plates    |
| GET    |               | api/plates/:id | Get a plate by id |
| POST   | Staff         | api/plates/    | Create a plate    |
| PUT    | Staff         | api/plates/:id | Update a plate    |
| DELETE | Admin         | api/plates/:id | Delete a plate    |
#### Orders
| Method | Role Required | Route                         | Description                |
| ------ | ------------- | ----------------------------- | -------------------------- |
| GET    | Staff         | api/orders/                   | Get all orders             |
| GET    | Authenticated | api/orders/:id                | Get an order by id         |
| POST   | Authenticated | api/orders/                   | Create an order            |
| PUT    | Staff         | api/orders/:id                | Update an order            |
| POST   | Authenticated | api/orders/request_cancel/:id | Request to cancel an order |
| DELETE | Admin         | api/orders/cancel/:id         | Cancel an order            |
| DELETE | Staff         | api/orders/:id                | Delete an order            |
#### Activities
| Method | Role Required | Route                    | Description                                        |
| ------ | ------------- | ------------------------ | -------------------------------------------------- |
| GET    | Admin         | api/activity/            | Get all activities including deleted activities    |
| GET    | Staff         | api/activity/current/    | Get all activities                                 |
| GET    | Admin         | api/activity/:id         | Get an activity by id including deleted activities |
| GET    | Authenticated | api/activity/current/:id | Get an activity by id                              |
| POST   | Staff         | api/activity/            | Create an activity                                 |
| PUT    | Staff         | api/activity/:id         | Update an activity                                 |
| DELETE | Admin         | api/activity/:id         | Delete an activity                                 |
## Authors
- **Jonathan Mojica** - *Full work*


