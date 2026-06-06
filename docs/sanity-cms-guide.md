# Guide d'édition — Le Passage Saint-Honoré

Ce guide explique comment modifier le contenu du site sans avoir besoin du développeur. Tout passe par **Sanity Studio**, l'outil d'édition intégré au site.

---

## Accéder à Sanity Studio

L'éditeur est disponible directement sur le site :

- **En production** : https://lepassagesainthonore.fr/studio
- **En local** (pour Eldar) : http://localhost:3000/studio

À la première visite, Sanity vous demandera de vous connecter. Choisissez **Google** ou **email** (lien magique). Eldar doit vous inviter au préalable depuis https://www.sanity.io/manage/personal/project/4hz3qx1b — sans invitation, vous ne pouvez pas éditer.

---

## Vue d'ensemble du Studio

À gauche, vous trouvez la navigation. Elle est organisée en deux groupes :

### 1. Sections de la page d'accueil (uniques)
Une seule fiche par section — vous ne pouvez pas créer un deuxième « Hero », par exemple.

| Section | Ce que vous éditez |
|---|---|
| Paramètres du site | Nom, téléphone, email, adresse, horaires, URL de réservation, réseaux sociaux |
| Section Hero | Phrase d'accroche, titre, photo principale |
| Section Brunch | Texte d'intro + les 4 cartes du menu (nom, prix, photo) |
| Section Terrasse | Texte + photo |
| Section Notre Histoire | Texte de présentation (riche : gras, italique) + photo |
| Section Environnement | Texte de présentation + photo |
| Section Privatisation | Texte d'intro + bouton (les salles sont gérées séparément, voir plus bas) |
| Section Playlist | URL Spotify, texte d'accroche |
| Section Instagram | ID Curator.io (si abonnement actif) |
| Section Recrutement | Intro + liste de postes ouverts |
| Section Final CTA | Texte + photo de fin de page |

### 2. Collections (plusieurs fiches)
Vous pouvez en créer/supprimer/réorganiser autant que vous voulez.

| Collection | Usage |
|---|---|
| Avis clients | Les témoignages qui défilent dans la section "On en dit" |
| Galerie photos | (Réservé pour usage futur) |
| Salles privatisables | Détails des espaces privés (nom, capacité, photo) |

---

## Modifier du texte ou une photo

1. Cliquez sur la section dans le menu de gauche.
2. Modifiez les champs (titre, description, photo…).
3. Cliquez sur **Publish** en bas à droite.
4. **Le site se met à jour automatiquement dans la minute** — pas besoin de redémarrer ou d'appeler le développeur.

> ⏱ **Délai de propagation** : environ 1 minute après publication. Si vous ne voyez pas le changement immédiatement, attendez 60 secondes et rafraîchissez la page (Cmd+R sur Mac, Ctrl+R sur Windows).

---

## Ajouter un nouvel avis client

1. Menu gauche → **Avis clients**.
2. Bouton **Create new document** (en haut).
3. Remplissez : la citation, le nom, la source (média/client), la note (0–5 étoiles), l'ordre d'affichage (1, 2, 3…).
4. **Publish**.

Pour réordonner : modifiez le champ **Ordre** (1 = en premier).

---

## Ajouter un poste ouvert

1. Menu gauche → **Section Recrutement**.
2. Faites défiler jusqu'à **Postes ouverts**.
3. Cliquez **Add item** — entrez le titre, le contrat (CDI/CDD/Extra/…), la description.
4. **Publish**.

Pour supprimer un poste : cliquez sur la fiche dans la liste, puis le bouton menu (•••) → **Remove item**.

---

## Modifier les photos

Sanity stocke toutes les photos dans son CDN (réseau d'images optimisé). Pour remplacer :

1. Cliquez sur la zone photo de la section.
2. **Replace** ou **Remove → Upload**.
3. Vous pouvez ajuster le **point focal** (clic-droit sur l'image en édition) — utile pour que le centre d'intérêt reste visible sur mobile.

> **Format recommandé** : JPG ou PNG, largeur ≥ 2000px pour les photos plein écran (hero, terrasse), ≥ 1200px pour les vignettes.

---

## Annuler une modification

- **Avant publication** : bouton **Discard changes** (icône poubelle en haut).
- **Après publication** : Sanity garde l'historique. Cliquez sur l'icône **Review changes** (horloge) → choisissez la version précédente → **Publish**.

---

## Que se passe-t-il si une section est vide ?

Le site a une **valeur de secours** pour chaque section. Si vous supprimez tout le texte d'une section, le site continue d'afficher l'ancien texte par défaut (codé en dur dans le code source). C'est une sécurité — mais évitez de laisser des champs vides : vos modifications ne seront plus visibles.

---

## En cas de problème

- **Le site ne se met pas à jour** → attendez 1 minute, rafraîchissez. Si toujours rien après 5 min, contactez Eldar.
- **Erreur lors de la publication** → vérifiez votre connexion. Si le problème persiste, prenez une capture d'écran et envoyez-la à Eldar.
- **Identifiants oubliés** → Sanity utilise Google ou email. Reconnectez-vous via la même méthode qu'à la création du compte.

**Contact dev** : Eldar Dizdarevic — info@softbird.fr
