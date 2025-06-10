FROM node:22-alpine

RUN apk add --no-cache curl

WORKDIR /var/app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000
CMD ["./entrypoint.sh"]

