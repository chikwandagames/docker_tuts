# 1. Run phase
# "as" adds a tag, it gives a name to this stage, in this case "builder"
# Now every bit after FROM... is named the "builder" phase
# All we do in this "builder" phase is install dependances and build the app
FROM node:alpine as builder

WORKDIR '/app'

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

# NOTE, the build folder will be build in './app/build' folder in the container

# 2. Build phase
FROM nginx

# Copy the /app/build folder, which is a result of Run phase "builder" above 
# to /usr/share/nginx/html inside this nginx container we are building
COPY --from=builder /app/build /usr/share/nginx/html


# multistep docker build
# This happens when we need more than one base image in this case
# node:alpine and nginx

# To run
# docker build .
# docker run -p 8080:80 <image_id>
# Map port 8080 on local machine to 80 on the nginx web server inside the container
# in the browser go to localhoast:8080



