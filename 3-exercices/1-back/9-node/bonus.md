# Exercices Bonus en supplément des énoncés de base

## Exercice 2

Créez un programme qui dialogue avec l'utilisateur en lui demandant de saisir des informations parmi une liste proposé et d'afficher des réponses différentes selon la réponse saisie par l'utilisateur.

## Exercice 3

Ajoutez d'autres routes et envoyez des réponses dans d'autres formats tels que `html, text, xml` etc.

## Exercice 4

Ajoutez un lien `CSS` dans les fichiers html.
Vos pages html à l'affichage sur le navigateur doivent être stylisé.

## Exercice 5

Mettre en place une vérification des données à insérer côté back-end en réutilisant le module `RegexJQ` implémenter précédemment dans la partie `front-end`.

Une version de ce module peut se télécharger sur npm `npm i @gtmi/regegjq`.

## Exercice 6

Créez un serveur HTTP de base de données à part qui écoute sur le port `6033`.
Créez un client HTTP qui communique avec le serveur précédent pour traiter les requêtes.

## Exercice 7

Uploadez le middleware en utilisant `axios`.

### Documentation d'aide pour la création du middleware (3)

- Téléchargez le package axios `npm i axios`.
- Remplacez `fetch` et/ou `XMLHttpRequest` par `axios` pour les requêtes à destination du serveur `back-end Node`.
- Ajoutez l'intercepteur des requêtes pour y ajouter le token dans le header, vous pouvez vous appuyez sur l'implémentation suivante [axios.interceptors](https://masteringjs.io/tutorials/axios/interceptors).
