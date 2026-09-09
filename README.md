# Concept Water — site vitrine (V1)

Site vitrine statique (HTML / CSS / JS vanilla) pour **Concept Water**, entreprise basée à Elne (66), autour de la piscine, du spa et des équipements associés.

## ⚠️ À faire avant mise en ligne

1. **Photos réelles** — le logo est intégré (voir ci-dessous), mais aucune photo de piscine, spa, équipement ou intervention n'a encore été fournie. Le site utilise pour l'instant des espaces réservés (`[PHOTO À REMPLACER]`) clairement identifiés. Un fichier `README.txt` dans chaque sous-dossier de `assets/images/` indique quoi déposer et où. Une fois les fichiers ajoutés, retirer les blocs `.media-placeholder` correspondants dans `index.html` et décommenter les balises `<img>` déjà préparées.
2. **Téléphone** (`09 63 58 62 41`) — identifié publiquement mais **à confirmer** avant publication (voir mention déjà affichée sur le site à côté du numéro).
3. **Adresse e-mail de contact** — `contact@concept-water.fr` est un espace réservé utilisé dans le lien `mailto:` du formulaire (`script.js`). Remplacer par la vraie adresse de l'entreprise.
4. **Formulaire de contact** — en V1, le formulaire ouvre le logiciel de messagerie de l'utilisateur (mailto) après validation frontend. Il n'envoie rien automatiquement. Pour un vrai envoi silencieux, brancher un service de formulaire (Formspree, Netlify Forms, etc.) ou un petit backend — voir "Améliorations V2" plus bas.

Aucune autre information (nom, chiffre, certification, avis, tarif...) n'a été inventée : tout ce qui manquait a été remplacé par un choix de design neutre plutôt qu'un fait commercial fictif.

### Logo

Le logo fourni a été détouré (fond noir d'origine rendu transparent) et intégré dans le header et le footer : `assets/images/logo/concept-water-logo.png`. Un pictogramme extrait du logo (`concept-water-mark.png`) sert de base au favicon (`assets/icons/favicon-32.png` et `apple-touch-icon.png`). Le fichier original est conservé en référence (`concept-water-logo-source.png`).

## Structure des fichiers

```
concept-water/
├── index.html
├── style.css
├── script.js
├── robots.txt
├── sitemap.xml
├── README.md
└── assets/
    ├── images/
    │   ├── logo/         → logo Concept Water
    │   ├── hero/         → photo principale du hero
    │   ├── expertise/     → photos techniques (pompes, tuyauterie...)
    │   ├── realisations/  → galerie de réalisations
    │   └── spa/           → photo(s) de spa
    ├── icons/
    │   └── favicon.svg    → favicon temporaire (initiales CW), à remplacer par le vrai logo
    └── fonts/              → vide (polices chargées via Google Fonts CDN)
```

## Installation en local

Aucune dépendance, aucun build. Deux options :

- Ouvrir directement `index.html` dans un navigateur.
- Ou, pour un rendu plus fidèle (chemins relatifs, iframe carte) : lancer un petit serveur local, par exemple avec Python :
  ```bash
  cd concept-water
  python3 -m http.server 8000
  ```
  puis ouvrir `http://localhost:8000`.

## Publication sur GitHub Pages

1. Créer un dépôt GitHub (ex. `concept-water-site`).
2. Y déposer l'ensemble du contenu de ce dossier (`index.html` à la racine du dépôt).
3. Dans les paramètres du dépôt → **Pages** → Source : `main` (ou `master`), dossier `/root`.
4. Le site sera disponible à une adresse du type `https://<utilisateur>.github.io/concept-water-site/`.
5. Si un nom de domaine personnalisé est utilisé (ex. `concept-water.fr`), l'ajouter dans **Pages → Custom domain**, et mettre à jour les URLs en dur (`og:url`, `canonical`, `sitemap.xml`, données structurées) avec le domaine réel.

## Checklist de test avant mise en ligne

- [x] Logo réel intégré (header, footer, favicon)
- [ ] Photos réelles intégrées (plus aucun `[PHOTO À REMPLACER]`)
- [ ] Téléphone confirmé
- [ ] Adresse e-mail réelle dans `script.js`
- [ ] Test mobile (320–430px), tablette (768px) et desktop (1024–1920px)
- [ ] Menu mobile fonctionnel, fermeture au clic et à la touche Échap
- [ ] Galerie : filtres + lightbox (clic, flèches clavier, Échap)
- [ ] Formulaire : validation des champs obligatoires, ouverture correcte du mailto
- [ ] Assistant de qualification : parcours complet jusqu'au résumé
- [ ] Liens réseaux sociaux et carte Google Maps fonctionnels
- [ ] Aucune clé API ni donnée sensible dans le code
- [ ] Contraste et focus clavier visibles sur tous les éléments interactifs
- [ ] `prefers-reduced-motion` respecté (animations désactivées si activé côté utilisateur)

## Améliorations possibles pour une V2

- Brancher le formulaire à un vrai service d'envoi (backend léger ou service tiers) pour un envoi silencieux, sans dépendre du client mail de l'utilisateur.
- Ajouter des pages dédiées (`/solutions`, `/realisations`, `/a-propos`) si le contenu se développe suffisamment pour le justifier.
- Remplacer les icônes SVG génériques par des pictogrammes dessinés sur mesure, cohérents avec l'identité du logo.
- Ajouter de vraies légendes (lieu, type d'intervention) à chaque photo de réalisation, une fois ces informations confirmées.
- Convertir les photos en WebP/AVIF avec dimensions explicites pour optimiser la performance.
- Si un numéro de téléphone et des horaires sont officiellement confirmés, enrichir les données structurées `LocalBusiness` (`telephone`, `openingHours`).
- Envisager un vrai assistant conversationnel (avec backend sécurisé) uniquement si cela apporte une valeur réelle au-delà du parcours actuel.
