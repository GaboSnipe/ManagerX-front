FROM node:20-alpine3.19 AS builder

ENV VITE_GOOGLE_CLIENT_ID ${VITE_GOOGLE_CLIENT_ID}
ENV VITE_BASE_URL ${VITE_GOOGLE_CLIENT_ID}
ENV VITE_BACKEND_API_URL ${VITE_BACKEND_API_URL}
ENV VITE_NOTIFICATION_API_URL ${VITE_NOTIFICATION_API_URL}

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
