# Leonardo.Ai API Team Technical Challenge V2

## Author
Mehran Farshadmehr, farshadmehr.mehran@gmail.com.

## Unit Tests

To run the unit tests, follow these instructions:

1. Make sure you have the necessary dependencies installed.
2. Open a terminal and navigate to the project directory.
3. Run the following command to execute the tests:

   ```bash
   npm test
   ````

### Local Run

To run the project locally, follow these steps:

1. Make sure you have the necessary dependencies installed.
2. Open a terminal and navigate to the project directory.
3. Run the following command to start the local server:

    ```bash
    npm start
    ```

4. Once the server is running, open your web browser and visit `http://localhost:3000` to access the application.

#### Local Database
To set up a local database for the project, follow these steps:
1. Install Docker if you haven't already.
2. Open a terminal and run the following command to start a PostgreSQL container:

    ```bash
    docker run --name my-postgres -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 -d postgres
    ```

    This command will start a PostgreSQL container with the name "my-postgres" and expose port 5432.

3. Create a new database for the project. You can use a PostgreSQL client like `psql` or a GUI tool like pgAdmin to connect to the container and create the database.

4. Update the database configuration in the project's configuration file to point to the local database. You can find the configuration file in the project's repository.

5. Run the following command in the project's repository to run the migration script using Prisma:

    ```bash
    npx prisma migrate dev
    ```

    This command will apply any pending migrations and update the database schema accordingly.

Once the local database is set up and the migration script is executed, you can use it for storing and retrieving data in the project.