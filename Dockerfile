FROM node:14.17.0-slim

WORKDIR /usr/src/app

# ARG REACT_APP_VERSION

# ENV GENERATE_SOURCEMAP=false

# ENV NODE_ENV=production

COPY package.json .

COPY yarn.lock .

RUN yarn install

RUN yarn add increase-memory-limit

RUN node --max-old-space-size=1024

COPY . .

RUN yarn build


# - build nginx serve react

FROM nginx:1.16.1-alpine

WORKDIR /usr/share/nginx/html

COPY --from=0 /usr/src/app/build .

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]