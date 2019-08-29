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
        'check': false
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

            // Stockage et décodage de la réponse envoyé par form.php
            let response = JSON.parse(req.responseText);  
            
            // Création de l'élément li et ajout dans notre page 
            let newItem = document.createElement('li')
            newItem.dataset.id = response.id
            newItem.className = 'todo-item  element-unchecked'
            newItem.innerHTML = response.task
            newItem.addEventListener('click', checkItem)

            doList.appendChild(newItem)

            // Vidage du champ de texte
            input.value = ''
        }
    }
}



//*
//* Cocher/décocher les éléments
//*////////////////////////////////

// Variable qui va stocker les éléments modifiés avant d'envoyer au php
let modifications = [];

// Fonction de cocher/décocher un élément
function checkItem (e) {
    // Varialbe qui indiquera si il a trouvé un élément ou pas
    let found = false

    // Changement du style
    e.target.classList.toggle('element-checked');
    e.target.classList.toggle('element-unchecked');

    // Si aucun élément modifié, alors il ajout d'office l'élément
    if (modifications.length === 0){
        addNewElement(e)
    
    // Sinon il va chercher dans le tableau
    } else {
        for(let i = 0; i < modifications.length; i++) {
            // Si il trouve un élément qui correspond, il stocke dans la variable "found" l'indexe où il se trouve dans le tableau
            if(modifications[i].id === e.target.dataset.id){
                found = i;
                break;
            }
        }

        // Si rien n'a été trouvé, alors il ajoute un nouvel élément au tableau
        if (found === false){
            addNewElement(e);

        // Si il a été trouvé, alors il supprime l'élément à l'indexe du tableau où il se trouve
        } else {
            modifications.splice(found,1);
        }
    }

    console.table(modifications)
}

// Ajout d'un élément
function addNewElement (e) {
    // Il crée un objet avec l'ID et l'état coché ou pas
    let target = {
        "id": e.target.dataset.id,
        "check": e.target.classList.contains('element-checked') ? true : false
    }

    // Il push l'objet dans le tableau des éléments modifiés
    modifications.push(target)
}

// Envoie des modifications au PHP pour traiter les modifications
document.getElementById('save').addEventListener('click', () => {
    const req = new XMLHttpRequest();

    req.open('POST', 'edit.php', true);

    req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    req.send('modifs='+JSON.stringify(modifications))

    console.log("enregistrer")

    req.onreadystatechange = () => {
        if (req.readyState == XMLHttpRequest.DONE){
            location.reload()
        }
    }
})


// Eléments glissable
const draggableTasks = document.getElementById("drag-dolist")
Sortable.create(draggableTasks, {
    animation: 150,
    group: "todolist-sort",
    store: {
		/**
		 * Get the order of elements. Called once during initialization.
		 * @param   {Sortable}  sortable
		 * @returns {Array}
		 */
		get: function (sortable) {
			var order = localStorage.getItem(sortable.options.group.name);
			return order ? order.split('|') : [];
		},

		/**
		 * Save the order of elements. Called onEnd (when the item is dropped).
		 * @param {Sortable}  sortable
		 */
		set: function (sortable) {
			var order = sortable.toArray();
			localStorage.setItem(sortable.options.group.name, order.join('|'));
		}
	}
}
)
const draggableArchived = document.getElementById("drag-archive")
Sortable.create(draggableArchived, {
    animation: 150,
    group: "archive-sort",
    store: {
		/**
		 * Get the order of elements. Called once during initialization.
		 * @param   {Sortable}  sortable
		 * @returns {Array}
		 */
		get: function (sortable) {
			var order = localStorage.getItem(sortable.options.group.name);
			return order ? order.split('|') : [];
		},

		/**
		 * Save the order of elements. Called onEnd (when the item is dropped).
		 * @param {Sortable}  sortable
		 */
		set: function (sortable) {
			var order = sortable.toArray();
			localStorage.setItem(sortable.options.group.name, order.join('|'));
		}
	}
})