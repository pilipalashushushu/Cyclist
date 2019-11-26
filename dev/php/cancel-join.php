<?php
session_start();
$errMsg="";
$actNo=$_REQUEST["actNo"];
$memNo=$_SESSION["memNo"];

try{
    require_once("../connection.php");   
    //取消報名的活動
    //$sql="delete from `member` where memNO ='$_SESSION[memNo]'";
    //$sql="delete from `member` where memNO ='8'";
    $sql="delete from `joinlist` where memNO =$memNo and actNO =$actNo";
    $cancelJoin = $pdo->prepare($sql);
    $cancelJoin->execute();   
    echo "已取消報名"; 
    
} catch (PDOException $e) {
	$errMsg .= "錯誤原因 : ".$e -> getMessage(). "<br>";
  	$errMsg .= "錯誤行號 : ".$e -> getLine(). "<br>";
  	echo $errMsg;
}

?>