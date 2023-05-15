FROM node:14
# RUN apt-get update && apt-get install -y redis-server

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5001

CMD ["npm", "start"]