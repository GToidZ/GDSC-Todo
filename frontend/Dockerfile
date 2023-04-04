FROM node:18-alpine

WORKDIR /app
COPY . .

RUN sed -i '1s/".*"/"http:\/\/127.0.0.1:8080"/' src/models/todo.ts
RUN yarn \
    && yarn build \
    && cp -R build /

WORKDIR /build
RUN rm -R /app && yarn global add serve
CMD [ "serve", "-s", "." ]