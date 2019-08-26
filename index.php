<?php
    $file = 'assets/todo.json';
    $data = file_get_contents($file);
    $todolist = json_decode($data);
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
                <ul>
                    <!--? Affichage des taches non archivés -->
                    <?php 
                        foreach ($todolist as $element) {
                            if ($element->archived == false){
                                $check = ($element->check) ? "checked" : "unchecked";
                                echo "<li data-id='".$element->id."' class='todo-item element-".$check."'>".$element->task."</li>";
                            }
                        }
                    ?>

                </ul>
            </div>
            <h2>Archive</h2>
            <div id="doarchive">
                <ul>
                    <!--? Affichage des tâches archivés -->
                     <?php 
                        foreach ($todolist as $element) {
                            if ($element->archived == true){
                                $check = ($element->check) ? "☑" : "☐";
                                echo "<li>".$check." ".$element->task."</li>";
                            }
                        }
                    ?>

                </ul>
            </div>
        </div>
    </div>
    <div class="wrapper">
        <h2>Ajouter une tâche</h2>
        <form action="#" method="post">
            <input type="text" name="newtask" id="newtask">
            <button type="submit" id='submit'>Ajouter</button>
        </form>
    </div>

    <script src="assets/js/main.js"></script>
</body>
</html>