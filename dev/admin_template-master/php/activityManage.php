<?php
$actNo = $_POST["actNo"];
$actCancelStat = $_POST["value"];

try{
    require_once("connect.php");  
    $sql="UPDATE `activity` SET `actCancelStat` ='$actCancelStat' WHERE `actNo` ='$actNo'";
    $actAdmin =$pdo->prepare($sql);
    $actRows = $actAdmin->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($actRows);
    $actAdmin->execute();
    

}catch(PDOException $e){
    echo $e->getMessage();
  }


?>