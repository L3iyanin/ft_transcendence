FROM node:16

COPY ./backend /ft_transcendence_backend
COPY ./deployement/backend/srcs/run.sh /


WORKDIR /ft_transcendence_backend
RUN npm install

EXPOSE 8080

ENTRYPOINT ["bash", "/run.sh"]