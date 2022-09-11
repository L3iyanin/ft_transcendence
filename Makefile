#!make
include .env

Author = younes

all: build

build:
	@docker-compose up --build

init: volumes build

up:
	@docker-compose up

down:
	@docker-compose down

volumes:
	@mkdir -p $(LOCAL_DATABASE_VLPATH)

clean: down

fclean: clean
	@rm -rf $(LOCAL_DATABASE_VLPATH)
	
	@docker-compose down
	@docker rm -f $(docker ps -a -q)
	@# docker rmi -f $$(sudo docker images -q)
	@docker volume rm $(docker volume ls -q)
	@docker system prune -af

re: fclean init

.PHONY: all up build down volumes clean fclean re init