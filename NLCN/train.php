<?php 
    //$startTime = time();

    $list = $_POST['list'];
    $count = count($list);
    $commandString = "python train.py $count";
    foreach($list as $item) {
        $next = escapeshellarg($item['content']);
        $commandString = $commandString . " $next";
    }
    // $command = escapeshellcmd($commandString);
    $output=exec($commandString);
   // $endTime = time() - $startTime;
    // header('Content-Length: '.strlen($endTime));
    $response['success']=true;
    print_r($response)
    // print_r($commandString);
    // echo $list;

?>