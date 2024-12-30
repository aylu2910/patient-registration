FROM node:22

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3000

# npm run start:dev
CMD ["npm", "start", "start:dev"]