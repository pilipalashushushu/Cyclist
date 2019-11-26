<?php

$dsn="mysql:host=localhost;prot=3306;dbname=cyclist;charset=utf8";
$user="tadashi";
$psw="0430";
$options=array(PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION, PDO::ATTR_CASE=>PDO::CASE_NATURAL);
$pdo=new PDO($dsn,$user,$psw,$options);

?>