# Base de données - Paris Activities Vote

Ce dossier contient toutes les migrations et les données de seed pour la base de données Supabase.

## Structure

```
db/
├── migrations/          # Migrations SQL (à exécuter dans l'ordre)
│   ├── 001_initial_schema.sql
│   ├── 002_row_level_security.sql
│   └── 003_activity_rankings_view.sql
├── seed/               # Données initiales
│   └── activities.sql
└── README.md           # Ce fichier
```

## Installation

### 1. Exécuter les migrations

Dans Supabase SQL Editor, exécutez les migrations **dans l'ordre** :

1. `migrations/001_initial_schema.sql` - Crée les tables
2. `migrations/002_row_level_security.sql` - Configure RLS
3. `migrations/003_activity_rankings_view.sql` - Crée la vue de classement

### 2. Insérer les données de seed

Exécutez le fichier de seed pour insérer les activités :

```sql
-- Dans Supabase SQL Editor
\i db/seed/activities.sql
```

Ou copiez-collez le contenu du fichier `seed/activities.sql` dans l'éditeur SQL.

## Migrations

### 001_initial_schema.sql
Crée les tables de base :
- `users` - Membres de la famille
- `activities` - Activités parisiennes
- `votes` - Votes des utilisateurs
- Index pour les performances

### 002_row_level_security.sql
Configure Row Level Security (RLS) :
- Politiques de lecture publique
- Politiques d'insertion/modification publique
- Sécurité adaptée pour une application familiale

### 003_activity_rankings_view.sql
Crée la vue `activity_rankings` qui calcule automatiquement :
- Nombre de likes/dislikes
- Total des votes
- Pourcentage de likes
- Classement trié par popularité

## Seed

### activities.sql
Insère 23 activités parisiennes couvrant :
- Culture (5 activités)
- Gastronomie (3 activités)
- Sport (3 activités)
- Nature (4 activités)
- Shopping (3 activités)
- Divertissement (5 activités)

## Commandes utiles

### Réinitialiser la base de données

```sql
-- Supprimer toutes les données
TRUNCATE TABLE votes CASCADE;
TRUNCATE TABLE activities CASCADE;
TRUNCATE TABLE users CASCADE;

-- Réinsérer les activités
-- (Copier le contenu de seed/activities.sql)
```

### Vérifier les données

```sql
-- Compter les activités
SELECT COUNT(*) FROM activities;

-- Voir le classement
SELECT * FROM activity_rankings LIMIT 10;

-- Voir les utilisateurs
SELECT * FROM users;

-- Voir les votes
SELECT * FROM votes;
```

## Notes

- Les migrations sont idempotentes (utilisent `IF NOT EXISTS`)
- Les données de seed peuvent être exécutées plusieurs fois (utiliser `ON CONFLICT` si nécessaire)
- Pour un environnement de production, considérez ajouter des migrations de rollback

