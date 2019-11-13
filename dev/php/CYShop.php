<?php
session_start();
$_SESSION["date"] = date("Y/m/d");
require_once('connect.php');
echo $_SESSION["date"];
?>