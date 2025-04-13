# Step 1: Build the React app
FROM node:21 AS build


WORKDIR /app

ARG BASEURL
ENV VITE_API_BASEURL=${BASEURL}

COPY ./package.json ./package-lock.json ./
RUN npm install

COPY ./ ./
RUN npm run build


# Step 2: Serve the React app with a web server (like Nginx)
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80:80

CMD ["nginx", "-g", "daemon off;"]
