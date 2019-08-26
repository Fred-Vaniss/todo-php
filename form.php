<?php
     if (isset($_POST['newtask'])){
        $input = array(
            'task' => $_POST['newtask'],
            'check' => false,
            'archived' => false
        );

        $file = 'assets/todo.json';
        $tempData = file_get_contents($file);
        $todolist = json_decode($tempData);

        array_push($todolist, $input);
        $data = json_encode($todolist);

        file_put_contents($file, $data);
     }
?>