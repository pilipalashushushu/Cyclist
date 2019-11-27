<?php
$prodNo = $_POST["prodNo"];
$prodStat = $_POST["value"];

try{
    require_once("connect.php");  
    $sql="UPDATE `product` SET `prodStat` ='$prodStat' WHERE `prodNo` ='$prodNo'";
    $delProd =$pdo->prepare($sql);
    $dpRows = $delProd->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($dpRows);
    $delProd->execute();
    

}catch(PDOException $e){
    echo $e->getMessage();
  }


?>