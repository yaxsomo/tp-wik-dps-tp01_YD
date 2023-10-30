# Depuis Node
FROM node:18

# Set la workdir
WORKDIR /app

# Copie du package.json et package-lock.json dans le container
COPY package*.json ./

# Installation des dependances
RUN npm install --production

#Installation de typescript et node
RUN npm install typescript --save-dev
RUN npm install @types/node --save-dev 
RUN npx tsc --init --rootDir src --outDir build --esModuleInterop --resolveJsonModule --lib es6 --module commonjs --allowJs true --noImplicitAny true

# Copie du code typescript dans le container
COPY src ./src

# Build du code typescript
RUN npx tsc

# Define the command to run your application
CMD node build/index.js
