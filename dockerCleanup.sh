docker-compose down
docker rm -f $(docker ps -a -q)
# docker rmi -f $$(sudo docker images -q)
docker volume rm $(docker volume ls -q)
docker system prune -af