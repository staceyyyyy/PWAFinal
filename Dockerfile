FROM node:14

# Setting working directory. All the path will be relative to WORKDIR
WORKDIR /usr/src/app

# Copying source files
COPY . .

# Build image
RUN yarn install; \
    yarn build; 

EXPOSE 3000
