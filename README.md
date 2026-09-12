# L'Autrement Traiteur — refonte du site vitrine

Refonte du site [lautrement-traiteur.fr](https://lautrement-traiteur.fr) (WordPress, thème
daté, fond bois générique). Même base technique que les autres sites du dossier : HTML / CSS
/ JS statiques, **aucune étape de build**, servi tel quel par Vercel.

## Direction : éditorial gastronomique sombre, façon Saaspo

Le thème actuel (fond bois, script cursif, mise en page WordPress classique) est remplacé par
une direction sombre et éditoriale, inspirée des patterns de landing SaaS/produit qu'on trouve
sur Saaspo : nav flottante en verre, hero plein écran avec image produit assombrie, bandeau
marquee, bento grid pour les prestations (Particuliers / Professionnels), grille de plats
filtrable façon feature grid, double bandeau de témoignages en marquee opposé.

- Fond charbon `#0b0a09`, texte crème `#f5efe4`, accent or `#c9a15a` — une seule couleur
  d'accent, pas de dérive vers d'autres teintes.
- Typo : **Fraunces** (titres, serif à fort caractère, italique pour les accents) / **Inter** (texte, UI)
- Toutes les photos de plats, pièces cocktail et l'univers visuel du hero (carotte violette /
  tomates anciennes) sont les vraies photos du traiteur, récupérées en haute résolution depuis
  le site WordPress actuel (médiathèque `/wp-json/wp/v2/media`) puis réencodées en WebP.
- Animations : reveal au scroll, marquee CSS pur (bandeau de mots-clés + témoignages),
  filtres de carte en JS, nav qui se rétracte au scroll. Tout se coupe avec `prefers-reduced-motion`.

## Stack

- `index.html` — page unique à ancres : Hero / Stats / Histoire (Nicolas & Jérémy) / Particuliers
  (bento) / La carte (grille filtrable) / Professionnels (bento) / Avis (marquee) / Visite
  (adresse + carte Google Maps) / Contact (formulaire) / Footer
- `mentions-legales.html` — obligation légale ; **contient des champs `[à compléter]`**
  (forme juridique, RCS, SIRET, TVA, directeur de publication, médiateur)
- `robots.txt` / `sitemap.xml` / `vercel.json`
- `assets/styles.css` — tokens & reset partagés (couleurs, typo, nav, boutons, chips, glass, marquee)
- `assets/home.css` — sections de la page d'accueil (hero, bento, carte, témoignages, contact, footer)
- `assets/home.js` — nav flottante/menu mobile, reveals au scroll, filtres de carte, injection
  des témoignages, bannière de succès du formulaire
- `assets/fonts/` — polices **auto-hébergées** (Fraunces, Inter, sous-ensemble latin) : aucune
  requête vers Google en prod
- `assets/img/` — photos réelles du traiteur, réoptimisées en WebP, plusieurs largeurs pour le `srcset`
- `assets/img/source/` — fichiers sources haute résolution (pour retraitement futur via `tools/`)
- `assets/favicon.svg` — monogramme carotte/feuille or sur fond charbon
- `tools/` — scripts Node ponctuels (`process-images.js`, `build-fonts.js`) utilisés pour
  générer `assets/img` et `assets/fonts` (nécessitent `npm install sharp` ; pas nécessaires
  pour servir le site une fois les fichiers générés)
- Aucune dépendance externe en prod, pas de framework, pas de build.

## Formulaire de contact

Le formulaire utilise [FormSubmit.co](https://formsubmit.co) (pas de backend nécessaire),
qui relaie vers `contact@lautrement-traiteur.fr`. **Important : la toute première soumission
déclenche un e-mail de confirmation de FormSubmit à cette adresse — il faut cliquer sur le
lien de confirmation une fois pour activer l'envoi.** Ensuite tout est automatique.

## À compléter avant mise en ligne

1. **Mentions légales** (`mentions-legales.html`) : forme juridique, capital, RCS, SIRET,
   TVA intracommunautaire, directeur de publication, médiateur de la consommation.
2. **Activer FormSubmit** en envoyant un premier message de test depuis le formulaire.
3. **Domaine** : pointer `lautrement-traiteur.fr` vers le projet Vercel une fois déployé.
4. Vérifier que l'adresse Facebook (`facebook.com/lautrement.traiteur`) est toujours à jour.

### Poids
Site complet ~15 Mo avec les sources (`assets/img/source/`), ~3 Mo servis en prod
(WebP uniquement, plusieurs résolutions via `srcset`).
