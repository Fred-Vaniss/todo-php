<?php  
    // Réception de la requête émise par le javascript
    if (isset($_POST['data'])){
        // Ouverture et décodage du fichier et de la requête
        $newData = json_decode($_POST['data']); // Décode le contenu pour que le PHP puisse le lire comme un array
        $file = 'assets/todo.json';             // Chemin du fichier
        $tempData = file_get_contents($file);   // Ouverture du fichier 
        $todolist = json_decode($tempData);     // Décode le contenu du fichier

        // Stockage de la référence d'incrémentation dans une variable
        $increment = $todolist->increment;


        $newData->id = $increment;                          // Définir le numéro de l'ID par l'incrémentation
        array_push($todolist->items, $newData);             // Ajout de la nouvelle tâche
        $todolist->increment = $increment + 1;              // +1 a l'incrémentation

        $data = json_encode($todolist, JSON_PRETTY_PRINT);  // Encodage des nouvelles données
        //? Le JSON_PRETTY_PRINT permet de faire en sorte que le JSON soit incrémenté
        //? au lieu qu'il soit tout mis en une seule ligne.

        file_put_contents($file, $data);     // Sauvegarde dans le fichier JSON

        $sendData = json_encode($newData);   // Encodage des nouvelles données entrée à afficher dans la page
        echo $sendData;                      // Renvoie des données au JavaScript pour afficher dans la page
     }
    // var_dump(json_decode($_POST['data']));

    // var_dump($_POST);
?>