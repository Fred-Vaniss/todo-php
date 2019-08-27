<?php
    //  if (isset($_POST['data'])){
    //     $input = array(
    //         'task' => $_POST['data'],
    //         'check' => false,
    //         'archived' => false
    //     );

    //     $file = 'assets/todo.json';
    //     $tempData = file_get_contents($file);
    //     $todolist = json_decode($tempData);
    
    //     array_push($todolist, $input);
    //     $data = json_encode($todolist);
    
    //     file_put_contents($file, $data);
    //  }
    
    if (isset($_POST['data'])){
        // Ouverture et décodage du fichier et de la requête
        $newData = json_decode($_POST['data']);
        $file = 'assets/todo.json';
        $tempData = file_get_contents($file);
        $todolist = json_decode($tempData);
        $increment = $todolist->increment;

        $newData->id = $increment;
        array_push($todolist->items, $newData);
        $todolist->increment = $increment + 1;

        $data = json_encode($todolist);

        file_put_contents($file, $data);

        $sendData = json_encode($newData);
        echo $sendData;
     }
    // var_dump(json_decode($_POST['data']));

    // var_dump($_POST);
?>