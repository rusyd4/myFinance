FROM node:alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --verbose
COPY . .
EXPOSE 5000
CMD [ "npm", "start" ]