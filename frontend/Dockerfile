# Usamos Node.js para el entorno
FROM node:18-alpine
# Nos ubicamos en una carpeta interna
WORKDIR /app
# Copiamos los archivos de configuración
COPY package*.json ./
# Instalamos dependencias
RUN npm install
# Copiamos el resto del diseño
COPY . .
# Exponemos el puerto de React
EXPOSE 3000
# Comando para encenderlo
CMD ["npm", "start"] 