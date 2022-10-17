FROM caddy

# RUN rm -rf /usr/share/nginx/html/*
# RUN mkdir -p /usr/share/nginx/logs
# COPY ./deployement/nginx/default.config /etc/nginx/nginx.conf

COPY ./deployement/webserver/srcs/Caddyfile /etc/caddy/Caddyfile

EXPOSE 80 443

CMD ["caddy", "run"]