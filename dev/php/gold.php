<?php

$errMsg="";
$memNo=$_GET["memNo"];
$coupon=$_GET["gold"];

try{

    require_once("../connection.php");

    $sql="UPDATE `member` SET `coupon`=:cuopon  WHERE `memNo`=:memNo";

    $checkout=$pdo->prepare($sql);

    
    $checkout->bindValue(":memNo",$memNo);
    $checkout->bindValue(":cuopon",$coupon);
    
    $checkout->execute();

  

}catch(PDOException $e){
    $errMsg .= "錯誤 : ".$e -> getMessage()."<br>";
    $errMsg .= "行號 : ".$e -> getLine()."<br>";
}



?>