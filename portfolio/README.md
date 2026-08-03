# Portfolio — Djibril Pierre Clavair Pamousso

Portfolio professionnel MERN (MongoDB, Express, React, Node.js) pour Djibril Pierre
Clavair Pamousso — Ingénieur Data, Entrepreneur, Formateur et Promoteur du Grand Salon
de la Data en Afrique (GSDA).

## 🧱 Stack technique

- **Frontend** : React 18 + Vite, React Router DOM v6, Tailwind CSS, Framer Motion, i18next (FR/EN)
- **Backend** : Node.js + Express, MongoDB + Mongoose
- **Auth** : JSON Web Tokens (JWT) pour l'espace admin
- **Email** : Nodemailer (SMTP) pour le formulaire de contact

## 📁 Structure

```
portfolio/
├── server/    → API REST (Express + MongoDB)
└── client/    → Application React (Vite)
```

## 🚀 Installation & lancement

### Prérequis
- Node.js ≥ 18
- Un cluster MongoDB (Atlas gratuit convient très bien) ou une instance locale
- Un compte SMTP pour l'envoi d'emails (ex : Gmail avec un "mot de passe d'application")

### 1. Backend (API)

```bash
cd server
npm install
cp .env.example .env
# Éditez .env : MONGO_URI, JWT_SECRET, identifiants SMTP, ADMIN_EMAIL / ADMIN_PASSWORD...

# Crée le compte admin + insère les 5 projets de démonstration issus du CV
npm run seed

# Démarre le serveur en mode développement (nodemon, redémarrage auto)
npm run dev
# → API disponible sur http://localhost:5000/api
```

### 2. Frontend (client React)

Dans un second terminal :

```bash
cd client
npm install
# Le fichier .env est déjà présent avec VITE_API_URL=http://localhost:5000/api
# Modifiez-le uniquement si votre API tourne sur un autre port/domaine.

npm run dev
# → Site disponible sur http://localhost:5173
```

### 3. Espace admin

Rendez-vous sur `http://localhost:5173/admin/login` et connectez-vous avec les
identifiants définis dans `server/.env` (`ADMIN_EMAIL` / `ADMIN_PASSWORD`), utilisés
lors du `npm run seed`. Depuis le tableau de bord, vous pouvez :
- Ajouter / modifier / supprimer les projets affichés sur la page publique.
- Mettre à jour la biographie (FR/EN) affichée dans la section "À propos".

### 4. Photo de profil

Déposez une photo professionnelle dans `client/public/assets/profile-placeholder.jpg`
(voir `client/public/assets/README.txt`). Sans elle, un dégradé de secours s'affiche
automatiquement — le site reste fonctionnel.

## 🏗️ Build de production

```bash
# Frontend
cd client
npm run build     # génère client/dist, à déployer sur Vercel/Netlify/OVH...

# Backend
cd server
npm start          # démarre le serveur sans nodemon (production)
```

Pensez à :
- Définir `NODE_ENV=production` et `CLIENT_URL` (URL du frontend déployé) dans `server/.env`.
- Définir `VITE_API_URL` (URL de l'API déployée) avant le build du client.
- Servir le site en HTTPS et activer les sauvegardes automatiques de la base MongoDB.

## 🔌 Endpoints API

| Méthode | Route                  | Accès   | Description                          |
|---------|-------------------------|---------|---------------------------------------|
| POST    | `/api/auth/login`       | Public  | Authentification admin (retourne un JWT) |
| GET     | `/api/auth/me`          | Privé   | Récupère l'utilisateur connecté       |
| GET     | `/api/profile`          | Public  | Récupère la biographie (FR/EN)        |
| PUT     | `/api/profile`          | Privé   | Met à jour la biographie              |
| GET     | `/api/projects`         | Public  | Liste des projets                     |
| GET     | `/api/projects/:id`     | Public  | Détail d'un projet                    |
| POST    | `/api/projects`         | Privé   | Crée un projet                        |
| PUT     | `/api/projects/:id`     | Privé   | Modifie un projet                     |
| DELETE  | `/api/projects/:id`     | Privé   | Supprime un projet                    |
| POST    | `/api/contact`          | Public  | Envoie un message (formulaire contact) |

Les routes "Privé" nécessitent un header `Authorization: Bearer <token>`.

## 🎨 Charte graphique

| Rôle        | Couleur                     |
|-------------|------------------------------|
| Primaire    | `#0A2540` (Bleu profond)     |
| Secondaire  | `#E67E22` (Orange terracotta)|
| Fond        | `#FFFFFF` / `#F8FAFC`        |
| Texte       | `#1E293B`                    |

Typographies : **Inter** (titres) et **Roboto** (corps de texte), chargées via Google Fonts.

## ✅ Notes de conception

- Signature visuelle : un motif de **réseau de données** animé (nœuds et lignes) dans le
  hero, en écho au métier de data engineer et à la mise en réseau panafricaine portée par
  le GSDA. La timeline des expériences reprend cette idée de "pipeline" de données.
- Toutes les sections se révèlent au scroll (`whileInView`) et les changements de route
  utilisent `AnimatePresence` pour des transitions douces.
- `prefers-reduced-motion` est respecté (les animations sont désactivées si l'utilisateur
  l'a demandé au niveau système).
- Le contenu multilingue (projets, bio) est stocké en base sous forme `{ fr, en }` ; le
  reste des textes de l'interface provient de `client/src/data/translations.js` via i18next.
