FROM node:16

# COPY ./backend /ft_transcendence_backend
COPY ./deployement/backend/srcs/run.sh /

# COPY ./backend/package.json /
# RUN npm install

WORKDIR /ft_transcendence_backend
# RUN npm install
# RUN cd prisma && npx prisma migrate dev --name "init" && cd ..

EXPOSE 8080

ENTRYPOINT ["bash", "/run.sh"]
# ENTRYPOINT ["npm", "start"]