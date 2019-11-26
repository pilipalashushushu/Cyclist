<?php
	$dsn="mysql:host=localhost;port=3306;dbname=cyclist2;charset=utf8;";
	$user="root";
	$password="sqluser3553";
	$options=array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION);
	$pdo = new PDO($dsn, $user, $password, $options);
?>