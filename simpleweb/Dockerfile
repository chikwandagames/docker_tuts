# Specify base image, with node preinstalled
# alpine, means a barebones version, with as little as possible
FROM node:alpine

# To prevent copying files into the containers root dir, which could
# accidintally override container default system files or folders
# after WORKDIR /usr/app 
# all files will now be copied to the container /user/app file
# COPY runs
WORKDIR /usr/app

# NOTE, the files eg. index.js, package.json are outside of the container,
# they are not made available to the container by default, its the developer
# job to make this possible, by editting the Dockerfile

# We must make the package.json and index.js available inside the container
# before npm install
# COPY instruction is used to move files and folders from the local file system
# to the file system inside the container 
# i.e. the temporary container created during the the build process

# Copy from current working dir "simpleweb" 
# to the current working dir inside the container
COPY ./ ./

# Install dependencies
RUN npm install

# Default startup command
CMD ["npm", "start"]


# To run 
# docker build .
# better still, with tagging

# docker build -t mubeji/my-simpleweb .
# then
# docker run mubeji/my-simpleweb

# Port mapping
# When we start the node server inside the container on port 8080,
# NOTE that the container has its own set of ports, so accessing the 
# browser on localhost:8080 on local machine is not routed to the 
# container 8080 by default.
# We have to setup a port maping, from the local machine 8080 to 
# the container 8080 to forward the traffic, 
# to do this we need to modify the docker run command
# NOTE, the port numbers dont have to match

# docker run -p 8080:8080 <imag_mame_or_id>
# docker run -p 8080:8080 mubeji/my-simpleweb

# To access the container files via terminal
# docker run -it mubeji/m-simpleweb sh

# or 

# to run an extra command in the already running container
# docker exec -it <sha256_hash> sh
# "remember, docker ps, to retrieve the hash"
# then, ls 