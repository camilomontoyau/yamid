FROM node:8

# Create app directory
WORKDIR /var/app

COPY . .
RUN npm install

# Bundle app source

# Expose port
EXPOSE 4000

CMD npm start