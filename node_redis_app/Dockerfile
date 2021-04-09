FROM node:alpine

WORKDIR '/app'

# "." == "./"
COPY package.json .

RUN npm install

# Copy the rest of the code
COPY . .

CMD [ "npm", "start" ]