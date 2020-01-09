FROM node:10
# Create app directory

# ARG some_variable_name
# or with a hard-coded default:
ARG some_variable_name=valorPorDefecto

RUN echo "Argumento entregado $some_variable_name"

ENV ENV_VAR_TEST=$some_variable_name

WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# Bundle app source
COPY . .

CMD [ "node", "index.js" ]

# docker build --build-arg some_variable_name=argumento_desde_comando_build -t   ignaciods/docker-env-example:20190824-QA .
# docker build -t   ignaciods/docker-env-example:20190824-QA .
# docker run -it ignaciods/docker-env-example:20190824-QA
# docker push ignaciods/docker-env-example:20190824-QA