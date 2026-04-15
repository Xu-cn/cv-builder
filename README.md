# CV Builder

Créez, personnalisez et partagez votre CV en ligne.

## Prérequis

| Outil | Version | Installation |
|-------|---------|-------------|
| Node.js | ≥ 18.x | https://nodejs.org ou `nvm install 18` |
| pnpm | ≥ 8.x | `npm i -g pnpm` |
| PostgreSQL | ≥ 15 | `brew install postgresql` ou Docker (voir ci-dessous) |
| Git | ≥ 2.x | https://git-scm.com |

## Démarrage rapide

```bash
# 1. Cloner et installer
git clone <ton-repo>
cd cv-builder
pnpm install

# 2. Lancer PostgreSQL via Docker (optionnel)
docker run -d --name cv-pg \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=cv_builder \
  -p 5432:5432 \
  postgres:16-alpine

# 3. Configurer les variables d'environnement
cp .env.example .env
# → Remplir les clés API (voir section ci-dessous)

# 4. Générer le client Prisma et pousser le schéma
pnpm db:generate
pnpm db:push

# 5. Lancer le serveur de dev
pnpm dev
# → http://localhost:3000
```

## Configuration des services externes

### Auth (obligatoire — choisis au moins un provider)

**Google OAuth :**
1. Console Google Cloud → APIs & Services → Credentials
2. Créer un OAuth 2.0 Client ID
3. Authorized redirect URI : `http://localhost:3000/api/auth/callback/google`
4. Copier Client ID et Secret dans `.env`

**GitHub OAuth :**
1. GitHub → Settings → Developer Settings → OAuth Apps
2. Authorization callback URL : `http://localhost:3000/api/auth/callback/github`
3. Copier Client ID et Secret dans `.env`

### Email — Resend (optionnel, pour magic links)
1. Créer un compte sur https://resend.com
2. Copier l'API key dans `RESEND_API_KEY`

### Upload fichiers — UploadThing (optionnel, pour photos de profil)
1. Créer un compte sur https://uploadthing.com
2. Copier les clés dans `.env`

### IA — Anthropic (optionnel, pour suggestions de reformulation)
1. https://console.anthropic.com → API Keys
2. Copier dans `ANTHROPIC_API_KEY`

## Structure du projet

```
src/
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/   # NextAuth handlers
│   │   ├── resume/               # CRUD CV
│   │   └── pdf/                  # Génération PDF
│   ├── cv/[slug]/                # Page publique du CV (SSR)
│   ├── editor/[id]/              # Éditeur de CV
│   ├── dashboard/                # Liste des CVs
│   └── login/                    # Page de connexion
├── components/
│   ├── editor/                   # Composants de l'éditeur (formulaires, drag & drop)
│   ├── templates/                # Templates de CV (Classic, Modern, Minimal...)
│   ├── ui/                       # Composants UI réutilisables (Button, Input, Card...)
│   └── layout/                   # Header, Sidebar, Footer
├── hooks/                        # Custom hooks (useResume, useAutoSave...)
├── lib/                          # Config (auth, db, utils)
├── types/                        # TypeScript types
└── styles/                       # Styles additionnels
```

## Commandes utiles

```bash
pnpm dev              # Serveur de dev (hot reload)
pnpm build            # Build production
pnpm db:studio        # Interface visuelle Prisma (localhost:5555)
pnpm db:migrate       # Créer une migration
pnpm lint             # ESLint
```

## Roadmap

- [x] Auth (Google, GitHub, Magic Link)
- [x] CRUD CV + sections + items
- [x] Template Classic
- [ ] Éditeur drag & drop
- [ ] Preview live split-screen
- [ ] Export PDF (Puppeteer)
- [ ] Templates supplémentaires (Modern, Minimal, Creative)
- [ ] Page publique avec OG tags
- [ ] Suggestions IA (reformulation, adaptation à une offre)
- [ ] Analytics (vues CV)
- [ ] i18n FR/EN
