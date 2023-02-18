FROM node:10.19.0
WORKDIR /app
COPY . .
RUN npm install && \
    cd /app/app && \
    npm install

EXPOSE 3031

CMD ["npm", "start", "cd", "/app/app", "npm start"]