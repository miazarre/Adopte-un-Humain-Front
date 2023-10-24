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

- Recherche d'animaux en fonction de critères (type, âge, taille, etc.).
- Affichage des détails de chaque animal.
- Enregistrement d'animaux favoris.
- Possibilité de contacter le refuge.

## Structure du Projet

- `/src` : Contient le code source de l'application React.
- `/src/component`: Composants React réutilisables.
- `/src/styles` : Fichiers SASS pour les styles.

### Auteur

Ce projet a été développé par [miazarre](https://github.com/miazarre).
