#!make
include .env

Author = l3iyanin

all: volumes up
	

update_env:
	@ cp ./backend/.env.sample ./backend/.env
	@echo "✅ .env for backend with database url \033[1;32m[Created]\033[0m"

prisma:
	cd backend/prisma && echo $(PWD) && npx  prisma migrate dev --name "init" && cd ../..

up:
	@docker-compose up

build:
	@docker-compose build

down:
	@docker-compose down

volumes:
	@mkdir -p $(LOCAL_DATABASE_VLPATH)
	@mkdir -p $(LOCAL_FRONTEND_VLPATH)

clean: down

fclean: clean
	@rm -rf $(LOCAL_DATABASE_VLPATH)
	@rm -rf $(LOCAL_FRONTEND_VLPATH)
	@bash dockerCleanup.sh

drop:
	@rm -rf $(LOCAL_DATABASE_VLPATH)

re: fclean all

.PHONY: all up build down volumes clean fclean re init
