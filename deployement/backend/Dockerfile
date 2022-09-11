FROM node:16

COPY ./backend/package.json /
RUN npm install
COPY ./deployement/backend/srcs/run.sh /
WORKDIR /ft_transcendence_backend

ENTRYPOINT ["bash", "/run.sh"]