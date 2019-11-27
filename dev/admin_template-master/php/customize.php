<?php
try{
    require_once("connect.php");
    
    $sql="select * from `customize`";
    $cust=$pdo->query($sql);
    $cusRows = $cust->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode( $cusRows);
  

}catch(PDOException $e){
    echo $e->getMessage();
  }
?>