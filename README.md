# Todo list en PHP
* Projet solo
* Formation: BeCode
* Réalisé en une semaine
* PHP, JavaScript
* Application publiée: [https://todo-php-fred.herokuapp.com/](https://todo-php-fred.herokuapp.com/)

![alt](*/../markdown/Annotation&#32;2019-09-02&#32;095045.png)

## Instruction de l'exercice
<details><summary>Cliquez pour afficher</summary>

# To-do list, en php

Crée un outil de gestion de tâches basique et fiable. Il contient deux écrans :  

- écran 1 : un petit formulaire permettant d'ajouter une tâche (un champ "textarea" et le bouton "submit").
- écran 2 : la liste des tâches à faire, avec pour chaque tâche, une checkbox. Lorsqu'une tâche est effectuée, on coche la tâche puis on appuye sur un bouton "Enregistrer" qui rafraichit la liste en barrant la tâche terminée et en la mettant dans la zone "archivée".

## Objectif principal

- Fichier "formulaire.php" : Lorsqu'on traite le formulaire il faut, après sanitization et validation, stocker les tâches au format JSON dans un fichier TXT ( par exemple `todo.json`)
- Fichier "contenu.php" : il lit le contenu du fichier json, et affiche chaque entrée dans la bonne zone ("A Faire" ou "Archive") avec le contenu html nécessaire pour avoir une checkbox.
- Via Javascript, cacher le bouton "Enregistrer" et sauvegarder la liste via ajax lorsqu'une checkbox change d'état (selected / unselected).
- Via Javascript, pouvoir réorganiser l'ordre vertical des tâches, via drag and drop.

## Ce qui est nouveau

- le format JSON ([documentation](https://www.alsacreations.com/article/lire/1675-json-stockage-leger-pratique-donnees-multitypes.html))
- fonction pour lire et écrire le contenu d'un fichier: [`file()`](http://php.net/manual/en/function.file.php) et [`file_put_contents`](http://php.net/manual/en/function.file-put-contents.php)
- fonction pour manipuler du contenu au format json [`json_encode()`](http://php.net/manual/en/function.json-encode.php) et [`json_decode()`](http://php.net/manual/en/function.json-decode.php)

## Ce qui est déjà connu
- tableau
- boucles
- conditions
- Ce qu'est une fonction et comment l'utiliser

## Remise
- nom du repository : `projet-6-todolist`
- publie ton app sur Heroku pour qu'on puisse la tester
- envoie l'URL de ton repository + heroku via ryver

## Deadline
Vendredi 16h30.

## Planning
Voici un planning réaliste auquel tu dois arriver à la fin de chaque jour.

### Jour 1
- Avoir créé son repo et dossier de travail local
- Avoir lu et compris la [documentation](https://www.alsacreations.com/article/lire/1675-json-stockage-leger-pratique-donnees-multitypes.html) sur le format JSON 
- Avoir identifié les fichiers de travail nécessaires à ton projet et les avoir créé (vides au départ).
- Sanitisation et validation lors de l'exécution du formulaire d'ajout des tâches.
- Ecriture de la tâche dans le fichier `todo.json`.
- Avoir committé son évolution, au minimum à la fin de la journée.

### Jour 2
- Lecture du fichier json `todo.json`
- Affichage des tâches dans les 2 zones de contenu (A faire/Archive) selon leur état.
- Avoir committé son évolution, au minimum à la fin de la journée.

### Jour 3
- Le fichier "contenu.php" modifie le status des tâches lorsqu'on le soumet.
- Avoir committé son évolution, au minimum à la fin de la journée.
	
### Jour 4
- Si OK, la merger à la branche "Master"

### Jour 5
Remise

</details>

## Développement

Ce projet à été fait à la fois avec du PHP et Javascript et les tâches sont stockés dans un fichier JSON.

Le JavaScript gère la création des tableau et des intéraction et envoie les informations au PHP, qui lui se charge du traitement des informations reçues et génère la page.