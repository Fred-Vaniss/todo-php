//*////////////////////////////////////////////////////////////
//* Ce script va créer les événements de bouttons et envoyer
//* une requête à form.php et traiter les infos
//*////////////////////////////////////////////////////////////

// Ajout event click aux tâches existantes
let todoItems = document.getElementsByClassName("todo-item")

for (const item of todoItems) {
    item.addEventListener('click', checkItem);
}

// Ajout event click au boutton ajouter
const submit = document.getElementById('submit');

submit.addEventListener('click', addItem)

// Fonction d'ajout d'événement
function addItem (e) {
    e.preventDefault() // Empêche le rechargement de la page

    // Récolter le texte entré et créer un objet avec les valeurs par défaut
    let input = document.getElementById('newtask')
    const data = {
        'id': 0,
        'task': input.value,
        'check': false,
        'archived': false
    }
    
    // Création de la requête
    const req = new XMLHttpRequest();

    req.open('POST', 'form.php', true); // Requête de type POST vers form.php

    req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')

    req.send('data='+JSON.stringify(data)); // Envoie de la requête avec l'objet créé au dessus

    // Quand le PHP à fini le traitement et renvoie la réponse...
    req.onreadystatechange = () => {
        if (req.readyState == XMLHttpRequest.DONE) {
            let doList = document.getElementById('dolist').getElementsByTagName('ul')[0] //La balise UL de la page

            // Stockage de la réponse envoyé par form.php
            let response = JSON.parse(req.responseText);  
            
            // Création de l'élément li et ajout dans notre page 
            let newItem = document.createElement('li')
            newItem.className = 'todo-item  element-unchecked'
            newItem.dataset.id = response.id
            newItem.innerHTML = response.task
            newItem.addEventListener('click', checkItem)

            doList.appendChild(newItem)

            // Vidage du champ de texte
            input.value = ''
        }
    }
}

// Fonction de changement de style de l'état coché/décoché
function checkItem (e) {
    let classList = e
        e.target.classList.toggle('element-checked')
        e.target.classList.toggle('element-unchecked')

    console.log(e.target.classList.contains('element-checked'))
}