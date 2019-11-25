<?php
	$dsn="mysql:host=localhost;port=3306;dbname=cyclist;charset=utf8";
	$user="zxcv";
	$password="zxcv";
	$options=array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION);
	$pdo = new PDO($dsn, $user, $password, $options);
?>