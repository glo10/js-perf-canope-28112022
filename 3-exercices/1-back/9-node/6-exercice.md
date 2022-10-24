
# Exercice 6 : migration base de données et gestion de la connexion d'un utilisateur

---

## Migration des utilisateurs vers la base de données


1. Migrez les données du fichier JSON `users.json` vers la base de données (avec les mots de passe en clair pour le moment).

### Spécifications techniques pour la migration

- Créez une base de données `SQLite 3` nommée `app.sqlite` dans un répertoire `db`.

- Créez une table à `user` à l'aide la requête suivante : 
`CREATE TABLE user
(
    id INTEGER PRIMARY KEY NOT NULL,
    lastname VARCHAR(70),
    firstname VARCHAR(70),
    email VARCHAR(50) UNIQUE,
    password VARCHAR(72),
    age SMALLINT,
    country VARCHAR(100),
    city VARCHAR(100)
)`

- Le serveur exécute la requête de la migration à l'aide de la méthode `post` et l'*url* `http://localhost:7000/migrate`.

- Effectuez vos tests via `postman` ou `hoppscotch` avant de faire le lien entre le front et le back-end.

- Utilisez l'extension `SQLite Viewer` d'`alexcvzz` pour visualiser votre base de données (schéma et données).

---

## Gestion de la connexion

1. Gérez la connexion d'un nouvel utilisateur depuis notre application `frontend` en utilisant la base de données.

### Spécifications techniques pour la connexion

- Le serveur exécute les requêtes de connexion avec la méthode `post` et l'*url* `http://localhost:7000/signin`.
- Effectuez vos tests via `postman` ou `hoppscotch` avant de faire le lien entre le front et le back-end.
- Retournez une réponse au format JSON `{"message": "success"}` avec un status 200 pour Un utilisateur qui demande de se connecter avec la bonne adresse email et le bon mot de passe. Dans le cas contraire, `{"message": "email or password incorrect"}` et status 404.

### Requête SQL pour rechercher un utilisateur à partir de son email

#### Requête non préparée (non protégée des injections SQL)

`SELECT id, lastname, firstname, email, age, city
WHERE email="contact@tshimini.fr AND password="xd287rQD4DsP"
`
#### Requête préparée (protégée des injections SQL)

`SELECT id, lastname, firstname, email, age, city
WHERE email=? AND password=?
`

