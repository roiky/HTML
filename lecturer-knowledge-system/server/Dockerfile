FROM node:20-alpine

WORKDIR /app
COPY package.json package-lock.json* .npmrc* ./ 2>/dev/null || true
RUN npm i --silent

COPY tsconfig.json ./
COPY src ./src

RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "start"]
