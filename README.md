# J'adopte un humain Front

Ce répertoire contient le code source du front-end pour le site web fictif J'adopte un Humain. Cette application a été développée en utilisant React.js, SASS pour les styles, et Axios pour les requêtes HTTP. Elle permet aux utilisateurs de trouver leur animal de compagnie idéal en fonction de leurs préférences et de soutenir le refuge animalier.

## Installation

1. Clonez ce dépôt sur votre machine locale.

   `git clone https://github.com/miazarre/Adopte-un-Humain-Front.git`

2. Accédez au répertoire du projet.

   `cd Adopte-un-Humain-Front`

3. Installez les dépendances.

   `npm install`

## Configuration

Avant de démarrer le serveur, assurez-vous de configurer les variables d'environnement. Créez un fichier .env à la racine du projet et configurez les variables suivantes :

`REACT_APP_API_URL=http://localhost:3000/api`

Assurez-vous de remplacer l'URL par l'URL de l'API back-end si nécessaire.

## Utilisation

Démarrez l'application en mode développement.

`npm start`

L'application devrait maintenant être accessible dans votre navigateur à l'adresse http://localhost:3000.

## Fonctionnalités

- API pour la recherche d'animaux en fonction de critères.
- API pour l'enregistrement d'utilisateurs.
- Gestion des correspondances entre humains et animaux.
- Upload d'images d'animaux grâce à Multer.
- Validation des entrées avec JOI.

## Structure du Projet

- `/app` : Contient le code source du serveur Node.js.
- `/app/routers`: Définition des routes et contrôleurs Express.
- `/src/models` : Modèles de données pour la base de données PostgreSQL.
- `/src/script` : Configuration de la base de données et d'autres paramètres.

### Auteur

Ce projet a été développé par [miazarre](https://github.com/miazarre).
