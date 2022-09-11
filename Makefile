#!make
include .env

Author = younes

all: init

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
	
	@rm -rf ./backend/node_modules
	@rm -rf ./frontend/node_modules
	
	@bash dockerCleanup.sh

re: fclean init

.PHONY: all up build down volumes clean fclean re init