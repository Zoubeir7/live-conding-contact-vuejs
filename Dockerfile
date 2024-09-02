# Étape 1: Utiliser une image officielle de Node.js 20 comme image de base
FROM node:20 AS build

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier le fichier package.json et package-lock.json (si présent)
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste du code source de l'application
COPY . .

# Construire l'application pour la production
RUN npm run build

# Étape 2: Utiliser une image Nginx comme image de base pour servir l'application
FROM nginx:stable-alpine

# Copier les fichiers construits à partir de l'étape 1 vers le répertoire par défaut de Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Exposer le port 90
EXPOSE 90

# Configurer Nginx pour écouter sur le port 90
RUN sed -i 's/80/90/g' /etc/nginx/conf.d/default.conf

# Démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]
FROM node:lts-alpine AS build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
