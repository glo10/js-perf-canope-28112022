# Exercice 3 : APIs

## Modalités

**Ne pas modifier le HTML ou CSS directement**.

**Dans le HTML, vous êtes autorisé à modifier uniquement l'attribut source `src` de la balise `<script>`**.

**Toutes les modifications doivent se faire à travers JavaScript**.

**Utilisez le plus possible les classes (programmation orienté objet)**.

---

## Scénario 1

En tant qu'utilisateur ;

Lorsque, je suis sur la page d'inscription ;

Et qu'aucun pays n'a été sélectionné ;

Alors, le champ ville doit être désactivé ;

---

## Scénario 2

En tant qu'utilisateur ;

Lorsque, je suis sur la page d'inscription ;

Et que je clique sur le champ de sélection de tous les pays ;

Alors, je devrais voir la liste de tous les pays apparaitre ;

### Spécifications techniques du scénario 2

- Récupérez les pays depuis le fichier `data/countries.xml`provenant de l'API *Country State City API* [https://github.com/dr5hn/countries-states-cities-database/blob/master/countries.json](https://github.com/dr5hn/countries-states-cities-database/blob/master/countries.json) .
- [Documentation de l' API](https://countrystatecity.in/docs/)
- Le choix du pays se fait à partir d'un champ de type sélection.
- La sélection a un attribut *name* égal à *country*.
- Utilisez une promesse (objet *Promise*) qui contient un objet *XMLHttpRequest*.

---

## Scénario 3

En tant qu'utilisateur ; 

Lorsque, j'ai sélectionné un pays ;

Alors, je devrais avoir la liste de toutes les villes de ce pays dans le champ de sélection *ville* ;

Et le champ ou sélection de la ville activée ;


### Spécifications techniques du scénario 3

- Récupérez les villes depuis le fichier `data/cities.json` provenant de l'API *Country State City*  [https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/countries%2Bcities.json](https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/countries%2Bcities.json)
- [Documentation de l' API](https://countrystatecity.in/docs/)
- Le choix du pays déclenche la récupération de toutes les villes de ce pays.
- Le choix de la ville se fait à partir d'un champ de type sélection.
- La sélection a un attribut *name* égal à *city*
- Chaque ville présente dans la sélection doit avoir les attributs HTML suivants correspondants aux informations récupérées :
 - value = nom de la ville ;
 - data-latitude = coordonnée de la latitude de la ville ;
 - data-longitude = coordonnée de la longitude de la ville ;

---

## Scénario 4

En tant qu'utilisateur ;

Lorsque, je suis sur la page d'actualité ;

Alors, je devrais voir la météo du jour (température) en fonction de la latitude et longitude d'une ville choisie au hasard (plus tard, ça sera la ville choisie lors de l'inscription).

### Spécifications techniques du scénario 4

- [Documentation de l'API open-meteo pour récupérer la météo d'une ville](https://open-meteo.com/en/docs#api_form)
