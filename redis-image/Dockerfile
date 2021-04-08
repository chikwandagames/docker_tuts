# Use an existing docker image as a base
# FROM specifies the docker image we want use as a base,
# it downlaods the Alpine image to be used as base
# This part is like installing an OS in an empty computer, this
# is a needed step to get things started, it provides an initial
# set of programs to get started
FROM alpine

# Download and install a dependencey
# RUN executes some command while the custom image is being prepared
# "apk add --update redis" is NOT a docker command, "apk" is a package manager
# for Alpine, here we use that package manager to download and install redis
RUN apk add --update redis

# Tell the image what to do when it starts up as a container
# CMD specifies what should be executed when the image is use to start up a new container
# in this case redis-server
CMD ["redis-server"]

# To run
# docker build .
# docker run <sha256_hash>


# docker build .
# docker build . sends the Dockerfile to the docker CLI "docker client"
# The "build" command takes a docker file and generate an image out of it
# The "." specifies the build context
# The build context is a set of files and folders to be encupsulted in the container