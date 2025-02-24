FROM node:22-alpine3.19 AS builder

WORKDIR /app

COPY package*.json .

RUN npm install

COPY ../.. .

RUN npm run build

FROM nginx:latest

RUN rm /etc/nginx/conf.d/*

COPY ./docker/prod/nginx.conf /etc/nginx/conf.d/

#COPY ./docker/prod/nginx.conf /etc/nginx/nginx.conf

## Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*

# Copy from the stahg 1
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 3000 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]
