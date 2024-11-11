FROM node:20-alpine
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN npx tsc
EXPOSE 3004
CMD node /app/dist/server.js