FROM node:16

# COPY ./frontend /ft_transcendence_frontend
COPY ./deployement/frontend/srcs/run.sh /

#dev only
# COPY ./frontend/package.json /
# RUN npm install

WORKDIR /ft_transcendence_frontend
# RUN npm install

EXPOSE 3000

ENTRYPOINT ["bash", "/run.sh"]
# ENTRYPOINT ["npm", "start"]