FROM node:22-alpine

WORKDIR /mock-api

COPY ./package*.json ./
RUN npm install

COPY . .

EXPOSE 3100

CMD ["npm", "start"]