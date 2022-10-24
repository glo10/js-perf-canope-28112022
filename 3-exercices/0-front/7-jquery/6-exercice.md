# Exercice 6 : plugin JQuery vérifications des données avec les REGEX

## Documentation

[Documentation pour créer un Plugin JQuery](https://learn.jquery.com/plugins/basic-plugin-creation/)

---

## Scénario 1

En tant qu'utilisateur ;

Lorsque, je souhaite m'inscrire ;

Et que je saisi une information incompatible avec le format attendu ;

Alors, je devrais voir un message de format incorrecte ;

---

## Scénario 2

En tant qu'utilisateur ;

Lorsque, je souhaite m'inscrire ;

Et que je saisis une information compatible avec le format attendu du champ attendu ;

Alors, je ne devrais pas voir un message d'erreur de format incorrect ;

## Spécifications techniques du plugin

1. Créez un plugin `JQuery` permettant de vérifier les données de nos formulaires à l'aide des Regex. Pour chaque type de donnée, créez une fonction spécifique. Par exemple une fonction regex pour le traitement du mot de passe, une autre pour l'e-mail, prénom etc. Cf les détails ci-après.

---

### Nom et prénom

- Au moins 2 caractères.
- Aucun chiffre.
- Espaces et le tiret du 6 (-) autorisées.
- `< > & $ + * / # ~ € % ^ ! @` interdites.

---

### Age

- Compris entre 14 et 130.

---

### Pays et villes

- Au moins 2 caractères.
- Chiffres autorisés.
- Espaces et tirets du 6 (-) autorisés.
- `& $ + * / # ~ € % ^ ! _ @` interdites.

---

### Email

- Les extensions doivent avoir au moins 2 caractères.
- Les extensions ne doivent pas avoir plus de 10 caractères.

---

### Mot de passe

- Le mot de passe doit contenir au moins 15 caractères.
- Le mot de passe doit contenir au maximum 36 caractères.
- Le mot de passe doit avoir au moins une lettre minuscule.
- Le mot de passe doit avoir au moins une lettre majuscule.
- Le mot de passe doit avoir au moins un chiffre.
- Le mot de passe doit avoir au moins un des caractères suivants  `& $ + - * / # ~ € % ^ ! - _`.