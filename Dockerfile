#############
### build ###
#############

# base image
FROM node:12.16.2-alpine as build

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /app/package.json
RUN npm install

# add app
COPY . /app

# generate build
RUN ./node_modules/.bin/ng build --prod --output-path=dist

############
### prod ###
############

# base image
FROM nginx:1.16.0-alpine

# copy artifact build from the 'build environment'
COPY --from=build /app/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/nginx.conf

# expose port 80
EXPOSE 80

# run nginx
CMD ["nginx", "-g", "daemon off;"]
