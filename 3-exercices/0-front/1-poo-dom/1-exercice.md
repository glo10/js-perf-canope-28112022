# Exercice 1 : gestion des événements sur un formulaire avec un CustomElement

## Modalités

**Ne pas modifier le HTML ou CSS directement**.

**Dans le HTML, vous êtes autorisé à modifier uniquement l'attribut source `src` de la balise `<script>`**.

**Toutes les modifications doivent se faire à travers JavaScript**.

**Utilisez le plus possible les classes (programmation orienté objet)**.

---

## Spécifications techniques pour les scénarios 1 à 4

 - Le message d'aide qui doit apparaître lors de la saisie devrait avoir une classe CSS `form-text`.
- Utilisez le Web Component(composant web) CustomElement.
- recopiez le contenu HTML présent dans `template/_html/_partial/signin.html`

---

## Scénario 1

En tant qu'utilisateur ;

Lorsque j'ai le focus sur le champ e-mail ;

Alors, le message suivant doit apparaître au-dessus du champ e-mail "Veuillez saisir votre adresse e-mail" ;

---

## Scénario 2

En tant qu'utilisateur ;

Lorsque j'ai le focus sur le champ mot de passe ;

Alors, le message suivant doit apparaître au-dessus du champ de mot passe "Veuillez saisir votre mot de passe" ;

---

## Scénario 3

En tant qu'utilisateur ;

Lorsque, je perds le focus sur le champ e-mail ;

Alors, le message "veuillez saisir votre adresse e-mail" doit disparaître ;

---

## Scénario 4

En tant qu'utilisateur ;

Lorsque, je perds le focus sur le champ mot de passe ;

Alors, le message "veuillez saisir votre mot de passe" doit disparaître ;

---

## Scénario 5

En tant qu'utilisateur ;

Lorsque, je ne remplis pas l'e-mail et/ou le mot de passe ;

Et que je valide ;

Alors, le message suivant "email et/ou mot de passe obligatoires" devrait apparaître ;


### Spécifications techniques du scénario 5

- Le message "email et mot de passe obligatoires" doit apparaître en dessous du bouton de validation.
- L'élément HTML *wrapper* (entourant) le message doit avoir la classe CSS `alert alert-danger`.
- La soumission du formulaire doit être empêchée.

---

## Scénario 6

En tant qu'utilisateur ;

Lorsque, je remplis l'e-mail et le mot de passe ;

Et que je valide ;

Alors, je devrais pouvoir soumettre mes données (formulaire) ;

Et ne pas avoir le message "email et/ou mot de passe obligatoires" ;

