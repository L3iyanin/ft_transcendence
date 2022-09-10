FROM nginx:stable-alpine

RUN rm -rf /usr/share/nginx/html/*
RUN mkdir -p /usr/share/nginx/logs
COPY ./srcs/default.conf /etc/nginx/nginx.conf

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]