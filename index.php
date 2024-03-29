<?php
    // Fonction de génération des tâches stockés dans le fichier todo.json
    function generateItems($checked){
        // Chargement du fichier et décodage de son contenu
        $file = 'assets/todo.json';
        $data = file_get_contents($file);
        $todolist = json_decode($data);

        // Pour chaque élément du json
        foreach ($todolist->items as $element) {
            if ($element->check == $checked){
                // Vérifier si il est à l'état coché et définir le nom de la classe on fonction de celui-ci
                $check = ($element->check) ? "checked" : "unchecked";
                // Création de l'élément li
                echo "<li data-id='".$element->id."' class='todo-item element-".$check."'>".$element->task."</li>";
            }
        }
    }
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>PHP todo list</title>
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
    <div class="wrapper">
        <h1>Todo list</h1>
        <div id="todo">
            <h2>A faire</h2>
            <div id="dolist">
                <ul id="drag-dolist">
                    <!--//? Affichage des taches non archivés -->
                    <?php generateItems(false) ?>

                </ul>
            </div>
            <h2>Archive</h2>
            <div id="doarchive">
                <ul id="drag-archive">
                    <!--//? Affichage des tâches archivés -->
                     <?php generateItems(true) ?>

                </ul>
            </div>
            <button type="submit" id="save">Enregistrer</button>
        </div>
    </div>
    <div class="wrapper">
        <h2>Ajouter une tâche</h2>
        <form action="#" method="post">
            <input type="text" name="newtask" id="newtask">
            <button type="submit" id='submit'>Ajouter</button>
        </form>
        <div id="message"></div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/sortablejs@latest/Sortable.min.js"></script>
    <script src="assets/js/main.js"></script>
</body>
</html>