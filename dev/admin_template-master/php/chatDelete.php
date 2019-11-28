<?php
$csNo = $_POST["csNo"];
try{
    require_once("../../connection.php");  
    $sql="DELETE FROM `customerservice` WHERE `csNo` ='$csNo'";
    $delCust =$pdo->prepare($sql);
    $delRows = $delCust->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($delRows);
    $delCust->execute();

}catch(PDOException $e){
    echo $e->getMessage();
  }


?>