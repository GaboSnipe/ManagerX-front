FROM node:20-alpine3.19 AS builder

ENV VITE_GOOGLE_CLIENT_ID 171035734754-vq56jhru1ua2etb52sn87b6ajnuna9ul.apps.googleusercontent.com
ENV VITE_BASE_URL https://tbilisiexpertisemanagerx.ge/
ENV VITE_BACKEND_API_URL https://tbilisiexpertisemanagerx.ge:8000
ENV VITE_NOTIFICATION_API_URL wss://tbilisiexpertisemanagerx.ge:8000

WORKDIR /app

COPY package*.json .

RUN npm install

COPY ../.. .

RUN npm run build

FROM nginx:latest

RUN rm /etc/nginx/conf.d/*

COPY docker/prod/nginx.conf /etc/nginx/conf.d/

#COPY ./docker/prod/nginx.conf /etc/nginx/nginx.conf

## Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*

# Copy from the stahg 1
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 3000 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]
