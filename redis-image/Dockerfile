# Use an existing docker image as a base
# FROM specifies the docker image we want use as a base
FROM alpine

# Download and install a dependencey
# RUN executes some command while the custom image is being prepared
RUN apk add --update redis

# Tell the image what to do when it starts up as a container
# CMD specifies what should be executed when the image is use to start up a new container
CMD ["redis-server"]

# To run
# docker build .
# docker run <sha256_hash>