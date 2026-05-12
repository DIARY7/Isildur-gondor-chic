# Gondor Chic

Site de E-commerce fait par les Isildur

## Architecture

- `src/pages/` : pages de navigation principales
- `src/styles/` : styles Tailwind CSS et imports globaux

## Installation

```bash
npm install
```

## Commandes disponibles

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

## Environnement

- React 19
- Vite
- Tailwind CSS
- React Router DOM
- Axios

## Bonnes pratiques suivies

- séparation claire pages / composants / layouts / services
- composants UI atomiques et réutilisables
- configuration Tailwind CSS propre et maintenable
- architecture prête pour évoluer vers un projet plus large
- responsive design dès la v1
- configuration API centralisée via `src/services/api.js`

## Structure recommandée

```text
src/
  assets/
  components/
  layouts/
    MainLayout.jsx
  pages/
    LoginPage.jsx
  styles/
    tailwind.css
  App.jsx
  index.css
  main.jsx
```
