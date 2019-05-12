<?php
$img = $_POST['img'];
$img = str_replace('data:image/png;base64,', '', $img);
$img = str_replace(' ', '+', $img);
$fileData = base64_decode($img);
//saving
$fileName = 'saves/save.png';
file_put_contents($fileName, $fileData);
echo 'saved';
?>
