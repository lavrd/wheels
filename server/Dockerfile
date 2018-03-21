FROM node:alpine
WORKDIR /usr/src/app
COPY package.json .
RUN npm i --only=production
COPY . .
EXPOSE 1102
CMD ["npm", "run", "pro"]
