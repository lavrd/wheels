FROM node:alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --silent --only=production
COPY . .
EXPOSE 1102
CMD ["npm", "run", "dev"]
