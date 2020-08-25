docker run -d -it --link redis1:redis --name client1 redis
docker exec client1 redis-cli -h redis set DOCKER OK
docker exec client1 redis-cli -h redis set "Agustin Luques" "Thakurova 1, 160 00"
docker exec client1 redis-cli -h redis set "John Snow" "The wall"