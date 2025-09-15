FROM node:20-alpine

WORKDIR /app
COPY package.json package-lock.json* .npmrc* ./ 2>/dev/null || true
RUN npm i --silent

COPY index.html ./
COPY vite.config.ts ./
COPY src ./src

EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]
