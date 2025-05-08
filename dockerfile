FROM node:24-alpine

WORKDIR /src

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

# for build
RUN npm r build  

CMD ["npm", "start"]


# for Dev
#CMD ["npm", "run", "dev"]

