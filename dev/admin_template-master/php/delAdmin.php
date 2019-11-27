<?php
$adminNo = $_POST["adminNo"];
try{
    require_once("connect.php");  
    $sql="DELETE FROM `adminster` WHERE `adminNo` ='$adminNo'";
    $delAdmin =$pdo->prepare($sql);
    $delRows = $delAdmin->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($delRows);
    $delAdmin->execute();

}catch(PDOException $e){
    echo $e->getMessage();
  }


?>