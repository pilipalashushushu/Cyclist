<?php

$errMsg="";
$memNo=$_POST["memNo"];
$card=$_POST["card"];

try{

    require_once("../connection.php");
    $sql="UPDATE `member` SET `card`=:card  WHERE `memNo`=:memNo";

    $checkout=$pdo->prepare($sql);

    $checkout->bindValue(":memNo",$memNo);
    $checkout->bindValue(":card",$card);
    
    $checkout->execute();

    echo json_encode($card);
  

}catch(PDOException $e){
    $errMsg .= "錯誤 : ".$e -> getMessage()."<br>";
    $errMsg .= "行號 : ".$e -> getLine()."<br>";
}



?>