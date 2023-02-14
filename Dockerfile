FROM node:9
WORKDIR /app
COPY . .
RUN npm install && \
    cd /app/app && \
    npm install && \
    printf "ls\nnpm start\ncd /app/app\nnpm start\n" > entrypoint.sh

EXPOSE 3031

CMD ["/bin/sh", "entrypoint.sh"]