docker-compose -f "docker-compose.yml" up -d
sleep 10
docker cp ./db.sql inventory-database:/db.sql
docker exec inventory-database sh -c "psql -U postgres shopify < ./db.sql"