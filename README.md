# Users Products API

API REST développée avec NestJS, TypeORM et SQLite.

## Fonctionnalités

- Module Users : création, lecture, modification, suppression
- Module Products : création, lecture, modification, suppression
- Validation des données avec class-validator
- Mots de passe hashés avec bcryptjs

## Installation

npm install
npm run start:dev

Le serveur démarre sur http://localhost:3000

## Routes Users

| Méthode | URL | Description |
|---|---|---|
| POST | /users | Créer un utilisateur |
| GET | /users | Lister les utilisateurs |
| GET | /users/:id | Récupérer un utilisateur |
| PATCH | /users/:id | Modifier un utilisateur |
| DELETE | /users/:id | Supprimer un utilisateur |

## Routes Products

| Méthode | URL | Description |
|---|---|---|
| POST | /products | Créer un produit |
| GET | /products | Lister les produits |
| GET | /products/:id | Récupérer un produit |
| PATCH | /products/:id | Modifier un produit |
| DELETE | /products/:id | Supprimer un produit |

## Exemples de corps JSON

Créer un utilisateur :

{ "email": "ali@test.com", "username": "ali", "password": "123456" }

Créer un produit :

{ "name": "Clavier", "description": "Mecanique", "price": 49.99, "stock": 10 }