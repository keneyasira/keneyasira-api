FROM node:16.13.0 AS build
WORKDIR /app
ADD makefile .
ADD package*.json ./
RUN make install
ADD . /app
RUN npm run build

FROM node:16.13.0-alpine
RUN apk upgrade --update  && apk add tzdata make postgresql-client curl && \
    cp /usr/share/zoneinfo/Europe/Paris /etc/localtime && \
    echo "Europe/Paris" > /etc/timezone && \
    apk del tzdata && \
    rm -rf /var/cache/apk/*
ENV NODE_ENV production
WORKDIR /app
COPY --from=build /app/dist/ /app/
COPY --from=build /app/node_modules/ /app/node_modules
COPY --from=build /app/makefile /app/
COPY --from=build /app/package*.json /app/
COPY --from=build /app/database/seeders/*.sql /app/database/seeders/

EXPOSE 3000

CMD ["node", "./src/main.js"]
