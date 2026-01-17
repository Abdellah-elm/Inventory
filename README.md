# 📦 Inventory Manager (Stock Dashboard)

**Inventory Manager** est une application web de gestion d’inventaire réalisée en **HTML / CSS / JavaScript** (sans framework CSS) avec une page de connexion et un dashboard multi-sections (produits, fournisseurs, entrepôts, commandes, catégories). 
Elle propose un tableau de bord moderne (glassmorphism), recherche/tri/pagination, export et support multilingue FR/AR (RTL). 
***

## 🌟 Fonctionnalités principales

### Interface (Dashboard)
- Navigation par sidebar + sections dédiées (Produits / Fournisseurs / Entrepôts / Commandes / Catégories). 
- Statistiques + graphiques via `<canvas>` (Chart.js côté UI).
- Recherche, filtres, tri par colonne et pagination gérés par la logique générique des managers.
- Export des données visibles via la fonction `exportToCSV()`.
- Thème (clair/sombre) + langue FR/AR avec support RTL côté CSS.
### Connexion (Démo)
- Page `index.html` dédiée à l’authentification. 
- Comptes de démonstration (ex: `admin/admin`) gérés côté JavaScript pour un usage académique.
- Gestion de session via `localStorage` / `sessionStorage` (ex: “Se souvenir de moi”)
***

## 🛠️ Stack technique

- **Frontend** : HTML + CSS custom (`style.css`, `login.css`). 
- **JavaScript (OOP)** : `AuthManager`, `MockService`, `EntityManager` + managers spécialisés (Products/Suppliers/Warehouses/Orders/Categories) orchestrés par `InventoryApp`.
- **UI** : Font Awesome (icônes) + police Inter importée dans le CSS.

***

## 💻 Installation & Lancement

1. Cloner / télécharger le projet.
2. Ouvrir `index.html` dans un navigateur moderne (ou via Live Server).
3. Se connecter avec un compte de démo, puis accéder automatiquement au dashboard `dashboard.html`.
***

## 📁 Structure

```text
.
├── index.html        # Page de login
├── dashboard.html    # Dashboard (sections + tableaux + charts)
├── app.js            # Logique JS (OOP + mock data + CRUD + export + i18n)
├── style.css         # Styles dashboard (glassmorphism + layout + RTL)
└── login.css         # Styles login
```


***

## ⚠️ Remarque

Ce projet est conçu comme **démo/academic project** : les données et l’authentification sont simulées côté client via `MockService` et stockage navigateur (pas de backend).
