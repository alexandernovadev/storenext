# Utiliza la versión de Node.js adecuada como imagen base
FROM node:lts-alpine3.16

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de tu aplicación al contenedor
COPY . /app

# Instala las dependencias
RUN yarn install

# Expone el puerto en el que corre tu aplicación
EXPOSE 3000

# Comando para iniciar tu aplicación
CMD ["yarn", "dev"]
