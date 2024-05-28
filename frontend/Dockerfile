FROM node:alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --verbose
COPY . .
EXPOSE 4173
CMD [ "npm", "run", "dev" ]