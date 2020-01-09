FROM node:10
# Create app directory
WORKDIR /usr/src/app



ENV AMBIENTE=HOLA
ENV PORT=5201
ENV HOST=0.0.0.0

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 5201
CMD [ "npm", "run", "start" ]

# docker build -t ignaciods/api-example:20190824-QA .
# docker run -it ignaciods/api-example:20190824-QA
# docker push ignaciods/api-example:20190824-QA