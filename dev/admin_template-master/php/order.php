<?php
try{
    require_once("../../connection.php");
    
    $sql="select * from `ordermaster`";
    $order=$pdo->query($sql);
    $ordRows = $order->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode( $ordRows);
  

}catch(PDOException $e){
    echo $e->getMessage();
  }
?>