<?php
$errMsg = '';
try{
    require_once("../../connection.php");  
    $pdo->beginTransaction();

    $sql="INSERT INTO `customerservice` (`csKey`, `csAns`) VALUES (:csKey, :csAns);";
    $csAdmin =$pdo->prepare($sql);
    $csAdmin -> bindValue(":csKey" , $_POST["csKey"]);
    $csAdmin -> bindValue(":csAns" , $_POST["csAns"]);
    $csRows = $csAdmin->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($csRows);
    $csAdmin->execute();
    $pdo->commit();

}catch(PDOException $e){
    echo $e->getMessage();
  }


?>