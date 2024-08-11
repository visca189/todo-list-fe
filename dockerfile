FROM node as vite-app

WORKDIR /app
COPY . .

RUN ["yarn"]
RUN ["yarn", "build"]

FROM nginx:alpine

WORKDIR /usr/share/nginx/

RUN rm -rf html
RUN mkdir html

WORKDIR /

COPY ./nginx.conf /etc/nginx
COPY --from=vite-app ./app/dist /usr/share/nginx/html

ENTRYPOINT ["nginx", "-g", "daemon off;"]