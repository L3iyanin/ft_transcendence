Author = younes

all: build

LOCAL_DATABASE_VLPATH="~/.ft_transcendence/database"

build:
	@docker-compose up --build -d

init: volumes build

up:
	@docker-compose up -d

down:
	@docker-compose down

volumes:
	@mkdir -p $(LOCAL_DATABASE_VLPATH)

clean: down

fclean: clean
	@rm -rf $(LOCAL_DATABASE_VLPATH)/
	@bash dockerCleanup.sh

re: fclean init

.PHONY: all up build down volumes clean fclean re init