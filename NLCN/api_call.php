<?php

$locale='de_DE.UTF-8';
setlocale(LC_ALL,$locale);
putenv('LC_ALL='.$locale);
putenv('LANG=en_US.UTF-8');
    header('Content-Type: text/html; charset=UTF-8');
    $input = $_POST['input'];
    $command = escapeshellcmd("python get_response.py $input ");
    $output=exec($command);
    $result = explode(' ',$output);
    print_r(json_encode($result));
?>

