# This script is used to clean up Docker containers related to the application.
# It finds all containers whose names start with:
# - 'my-app-instance'
# - 'my-app-e2e-instance'
# - 'test-postgres'
# Then, it stops and removes these containers.
# Run this script when you're done investigating the containers and want to clean up.

#!/bin/bash
#!/bin/bash
#!/bin/bash
echo "Removing all related containers and networks"

echo "Finding all app containers"
app_containers=$(docker ps -a -q --filter "name=my-app-instance")
if [ -n "$app_containers" ]; then
    echo "Removing app containers"
    docker stop $app_containers && docker rm $app_containers
else
    echo "No app containers found"
fi

echo "Finding all e2e containers"
e2e_containers=$(docker ps -a -q --filter "name=my-app-e2e-instance")
if [ -n "$e2e_containers" ]; then
    echo "Removing e2e containers"
    docker stop $e2e_containers && docker rm $e2e_containers
else
    echo "No e2e containers found"
fi

echo "Finding all PostgreSQL containers"
postgres_containers=$(docker ps -a -q --filter "name=test-postgres")
if [ -n "$postgres_containers" ]; then
    echo "Removing PostgreSQL containers"
    docker stop $postgres_containers && docker rm $postgres_containers
else
    echo "No PostgreSQL containers found"
fi

echo "Finding all networks"
networks=$(docker network ls -q --filter "name=testnetwork")
if [ -n "$networks" ]; then
    echo "Removing networks"
    docker network rm $networks
else
    echo "No networks found"
fi

echo "All related containers and networks have been removed."