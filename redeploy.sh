sudo docker-compose down
# sudo docker volume rm bringoria-hunt_caddy_config
# sudo docker volume rm bringoria-hunt_caddy_data
sudo docker volume rm pongo_static-content
sudo docker system prune -af
git pull
sudo docker-compose up --build -d
# sudo docker-compose up