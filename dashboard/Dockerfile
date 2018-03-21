FROM node:alpine as builder
WORKDIR /usr/src/app
COPY package.json .
RUN npm i --only=production
COPY . .
RUN npm run build

FROM nginx:alpine
RUN rm -rf /etc/nginx/conf.d
COPY conf /etc/nginx
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
