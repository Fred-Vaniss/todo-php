<?php  
    // Réception de la requête émise par le javascript
    if (isset($_POST['data'])){
        // Ouverture et décodage du fichier et de la requête
        $newData = json_decode($_POST['data']);
        $file = 'assets/todo.json';
        $tempData = file_get_contents($file);
        $todolist = json_decode($tempData);

        // Stockage de la référence d'incrémentation dans une variable
        $increment = $todolist->increment;


        $newData->id = $increment;                          // Définir le numéro de l'ID par l'incrémentation
        array_push($todolist->items, $newData);             // Ajout de la nouvelle tâche
        $todolist->increment = $increment + 1;              // +1 a l'incrémentation

        $data = json_encode($todolist, JSON_PRETTY_PRINT);  // Encodage des nouvelles données

        file_put_contents($file, $data);                    // Sauvegarde dans le fichier JSON

        $sendData = json_encode($newData);                  // Encodage des nouvelles données entrée
        echo $sendData;                                     // Renvoie des données au JavaScript
     }
    // var_dump(json_decode($_POST['data']));

    // var_dump($_POST);
?>