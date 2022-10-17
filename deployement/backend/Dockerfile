# FROM node:16

# COPY ./backend /ft_transcendence_backend
# COPY ./deployement/backend/srcs/run.sh /


# WORKDIR /ft_transcendence_backend
# RUN npm install

# EXPOSE 8080

# ENTRYPOINT ["bash", "/run.sh"]

FROM node:16

COPY ./deployement/backend/srcs/run.sh /

WORKDIR /var/www/html
RUN npm install pm2@latest -g
COPY ./backend ./
RUN npm i
EXPOSE 8080

ENTRYPOINT ["bash", "/run.sh"]