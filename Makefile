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
	@bash dockerCleanup.sh

re: fclean init

.PHONY: all up build down volumes clean fclean re init