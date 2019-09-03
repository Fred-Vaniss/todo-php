<?php 
    if (isset($_POST['modifs'])){
        $file = 'assets/todo.json';

        $newModifs = json_decode($_POST['modifs'], true);

        $tempData = file_get_contents($file);           // Ouverture du fichier 
        $todolist = json_decode($tempData, true);       // Décode le contenu du fichier

        foreach ($newModifs as $element) {
            $sanitizedElement = filter_var_array($element, array(
                'id'    => FILTER_SANITIZE_NUMBER_INT,
                'check' => FILTER_VALIDATE_BOOLEAN
            ));

            $index = array_search($sanitizedElement['id'], array_column($todolist['items'], 'id'), false);
                                                //? On utilisera "array_column" pour qu'il sélectionne bien la clé 'id'

            $check = $todolist['items'][$index]['check'];

            $todolist['items'][$index]['check'] = $check ? false : true;
            
        }
        
        $data = json_encode($todolist, JSON_PRETTY_PRINT);

        file_put_contents($file, $data);
    }
?>