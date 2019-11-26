<?php
try{
    require_once("../../connection.php");
    
    $sql="select * from `customize`";
    $cust=$pdo->query($sql);
    $cusRows = $cust->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode( $cusRows);
  

}catch(PDOException $e){
    echo $e->getMessage();
  }
?>