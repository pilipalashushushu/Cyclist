<?php

$errMsg="";
$cusName=$_GET["cusName"];
$addr=$_GET["addr"];
$tel=$_GET["cusTel"];
$color=$_GET["colorNo"];
$handle=$_GET["handleNo"];
$frame=$_GET["frameNo"];
$type=$_GET["type"];
$price=$_GET["price"];

try{

    require_once("../connection.php");

    $sql="INSERT INTO `customize` (memNo,`price`,typeNo,frameNo,handleNo,colorNo,cusName,cusAddr,cusTel) VALUES (:memNo,:price,:type,:frame,:handle,:color,:cusName,:addr,:tel)";

    $checkout=$pdo->prepare($sql);

    $checkout->bindValue(":memNo",1);
    $checkout->bindValue(":price",$price);
    $checkout->bindValue(":type",$type);
    $checkout->bindValue(":frame",$frame);
    $checkout->bindValue(":handle",$handle);
    $checkout->bindValue(":color",$color);
    $checkout->bindValue(":cusName",$cusName);
    $checkout->bindValue(":addr",$addr);
    $checkout->bindValue(":tel",$tel);
    
    $checkout->execute();

    echo "$cusName $addr $tel $color $handle $frame $type $price";

}catch(PDOException $e){
    $errMsg .= "錯誤 : ".$e -> getMessage()."<br>";
    $errMsg .= "行號 : ".$e -> getLine()."<br>";
}



?>