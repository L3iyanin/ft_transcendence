FROM node:16

COPY ./deployement/frontend/srcs/run.sh /
COPY ./frontend /ft_transcendence_frontend

WORKDIR /ft_transcendence_frontend

EXPOSE 3000

ENTRYPOINT ["bash", "/run.sh"]