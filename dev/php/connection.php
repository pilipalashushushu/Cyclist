<?php

$dsn="mysql:host=localhost;prot=8889;dbname=dd103g4;charset=utf8";
$user="root";
$psw="root";
$options=array(PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION, PDO::ATTR_CASE=>PDO::CASE_NATURAL);
$pdo=new PDO($dsn,$user,$psw,$options);

?>