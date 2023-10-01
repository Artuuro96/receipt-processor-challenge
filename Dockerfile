FROM node:18-alpine 

WORKDIR /app

COPY tsconfig*.json .
COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

ENV PORT=8080

EXPOSE $PORT

CMD ["node", "dist/app.js"]