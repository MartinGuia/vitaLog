# Usar una imagen base de Node.js
FROM node:20

#Establecer el directoria de trabajo
WORKDIR /usr/src/app

# Copiar el package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias
RUN npm install

#Copiar el resto de los archivos del proyecto
COPY . .

#EXPONER EL PUERTO 4000
EXPOSE 4000

#Comando para iniciar la aplicación
CMD ["npm", "start"]