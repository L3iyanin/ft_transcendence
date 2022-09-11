#!make
include .env

Author = l3iyanin

all: volumes
	@echo "DATABASE_URL="postgresql://$(DATABASE_USER):$(DATABASE_PASSWORD)@localhost:5432/$(DATABASE_NAME)?schema=public"" > ./backend/.env
	@echo "✅ .env for backend with database url \033[1;32m[Created]\033[0m"
	@docker-compose up

up:
	@docker-compose up

build:
	@docker-compose build

down:
	@docker-compose down

volumes:
	@mkdir -p $(LOCAL_DATABASE_VLPATH)

clean: down

fclean: clean
	@rm -rf $(LOCAL_DATABASE_VLPATH)
	@bash dockerCleanup.sh

re: fclean all

.PHONY: all up build down volumes clean fclean re init
