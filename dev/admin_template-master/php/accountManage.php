<?php
$memNo = $_POST["memNo"];
$memStat = $_POST["value"];

try{
    require_once("../../connection.php");  
    $sql="UPDATE `member` SET `memStat` ='$memStat' WHERE `memNo` ='$memNo'";
    $accAdmin =$pdo->prepare($sql);
    $accRows = $accAdmin->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($accRows);
    $accAdmin->execute();
    

}catch(PDOException $e){
    echo $e->getMessage();
  }


?>