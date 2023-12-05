# Use the official Node.js image as the base image
FROM uduntu:latest

# Set the working directory in the container
RUN mkdir -p -- /root/app/src
WORKDIR /root/app

# Copy the application files into the working directory
COPY package.json /root/app/package.json
COPY /src/* /root/src/

# Install the application dependencies
RUN npm install

# Define the entry point for the container
RUN ls -R /root/app/

CMD ["npm", "start"]
