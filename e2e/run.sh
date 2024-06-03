#!/bin/bash

run_id=$(date +%Y%m%d%H%M%S)
network_name="testnetwork-$run_id"
db_container_name="test-postgres-$run_id"
api_app_container_name="my-app-instance-$run_id"

echo "Starting test run $run_id"

echo "Creating a network for the test run"
docker network create $network_name

echo "Start the PostgreSQL container"
docker run --network=$network_name --name $db_container_name -e POSTGRES_PASSWORD=testpassword -d postgres

echo "1======================================================================================="

echo "Building the application container"
docker build -t my-app .

echo "Run the application container"
docker run \
    --network=$network_name \
    -e DATABASE_URL=postgresql://postgres:testpassword@$db_container_name:5432/postgres\
    -d --name $api_app_container_name my-app

echo "2======================================================================================="

echo "Building the database setup container"
docker build -t my-app-db-setup -f e2e/Dockerfile.db .

echo "Run the database setup container"
docker run \
    --network=$network_name \
    -e DATABASE_URL=postgresql://postgres:testpassword@$db_container_name:5432/postgres\
    --name my-app-db-setup-instance my-app-db-setup

echo "3======================================================================================="
echo "Building the e2e test container"
docker build -t my-app-e2e -f e2e/Dockerfile .

echo "Waiting for the database setup to complete"
docker stop my-app-db-setup-instance && docker rm my-app-db-setup-instance

echo "4======================================================================================="
echo "Run the e2e test container"
docker run \
    --network=$network_name \
    -e API_HOSTNAME=$api_app_container_name\
    --name my-app-e2e-instance-$run_id \
    my-app-e2e
exit_code=$?

echo "5======================================================================================="
echo "Test run $run_id completed with exit code $exit_code"
if [ $exit_code -eq 0 ]; then
    echo "Cleaning up on e2e tests passed successfully"
    docker stop my-app-instance-$run_id && docker rm my-app-instance-$run_id
    docker stop my-app-e2e-instance-$run_id && docker rm my-app-e2e-instance-$run_id
    docker stop test-postgres-$run_id && docker rm test-postgres-$run_id
    docker network rm $network_name
fi

exit $exit_code