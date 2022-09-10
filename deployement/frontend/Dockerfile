FROM node:16

COPY ./frontend/package.json /
RUN npm install
COPY ./deployement/frontend/srcs/run.sh /

WORKDIR /ft_transcendence_frontend

ENTRYPOINT ["bash", "/run.sh"]