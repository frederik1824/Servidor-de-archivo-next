# Usamos una imagen ligera de Node.js
FROM node:18-slim

# Creamos el directorio de la app
WORKDIR /app

# Copiamos archivos de dependencias
COPY package*.json ./

# Instalamos dependencias
RUN npm install

# Copiamos el resto del código
COPY . .

# Creamos la carpeta de uploads para que exista desde el inicio
RUN mkdir -p uploads

# Exponemos el puerto
EXPOSE 3000

# Comando para iniciar
CMD ["npm", "start"]
