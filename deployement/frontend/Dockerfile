# FROM node:16

# COPY ./deployement/frontend/srcs/run.sh /
# COPY ./frontend /ft_transcendence_frontend

# WORKDIR /ft_transcendence_frontend

# EXPOSE 3000

# ENTRYPOINT ["bash", "/run.sh"]

FROM node:16
WORKDIR /var/www/html
COPY ./frontend/package*.json ./
RUN npm i
COPY ./frontend ./
CMD [ "npm", "run", "build" ]