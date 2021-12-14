FROM node:14.17.2

# Setting working directory. All the path will be relative to WORKDIR
WORKDIR /usr/src/app

# Installing dependencies
COPY package*.json ./
RUN npm cache clean --force 
RUN npm install

# Copying source files
COPY . .

# Running the app
CMD [ "npm", "run", "start" ]