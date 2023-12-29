 #Base image
FROM node:21-alpine3.18

#working directory
WORKDIR /app

#copy package.json to /app
COPY package.json .

#npm install
RUN npm install

#npm react-icons
RUN npm install react-icons

#copy all files
COPY . .

#port expose
EXPOSE 3000

#run the code
CMD ["npm","start"]