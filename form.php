<?php  
    // Réception de la requête émise par le javascript
    if (isset($_POST['data'])){
        // Ouverture et décodage du fichier et de la requête

        $newData = trim(filter_input(INPUT_POST, 'data', FILTER_SANITIZE_STRING));
        // $newData = htmlspecialchars($_POST['data']);

        if (strlen($newData) < 3) {
            $response = array(
                'success' => false,
                'content' => "Erreur, la longueur de la tâche est trop courte"
            );

            echo json_encode($response);
            return;
        }
        
        $file = 'assets/todo.json';             // Chemin du fichier
        $tempData = file_get_contents($file);   // Ouverture du fichier 
        $todolist = json_decode($tempData);     // Décode le contenu du fichier

        // Stockage de la référence d'incrémentation dans une variable
        $increment = $todolist->increment;

        $newTask = array(
            'id' => $increment,
            'task' => $newData,
            'check' => false
        );

        array_push($todolist->items, $newTask);             // Ajout de la nouvelle tâche
        $todolist->increment = $increment + 1;              // +1 a l'incrémentation

        $jsonified = json_encode($todolist, JSON_PRETTY_PRINT);  // Encodage des nouvelles données
        //? Le JSON_PRETTY_PRINT permet de faire en sorte que le JSON soit incrémenté
        //? au lieu qu'il soit tout mis en une seule ligne.

        file_put_contents($file, $jsonified);     // Sauvegarde dans le fichier JSON

        $response = array(
            'success' => true,
            'content' => $newTask
        );

        $sendNewTask = json_encode($response);   // Encodage des nouvelles données entrée à afficher dans la page
        echo $sendNewTask;                      // Renvoie des données au JavaScript pour afficher dans la page
     }
    // var_dump(json_decode($_POST['data']));

    // var_dump($_POST);
?>