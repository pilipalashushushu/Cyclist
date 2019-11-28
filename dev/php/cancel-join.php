<?php
session_start();
$errMsg="";
$actNo=$_REQUEST["actNo"];
$memNo=$_SESSION["memNo"];

try{
    require_once("localhost.php");   
    //取消報名的活動，FK無法刪改別會員編號
    //$sql="delete from `joinlist` where memNO =$memNo and actNO =$actNo";

    $sql ="UPDATE `joinlist` SET memNo='1' WHERE memNo=$memNo";
    $cancelJoin = $pdo->prepare($sql);
    $cancelJoin->execute();   
    echo "已取消報名"; 
    
} catch (PDOException $e) {
	$errMsg .= "錯誤原因 : ".$e -> getMessage(). "<br>";
  	$errMsg .= "錯誤行號 : ".$e -> getLine(). "<br>";
  	echo $errMsg;
}

?>