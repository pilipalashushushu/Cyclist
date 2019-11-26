<?php
try{
    require_once("../../connection.php");
    
    $sql="select * from `adminster`";
    $admin=$pdo->query($sql);
    $admRows = $admin->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode( $admRows);
}catch(PDOException $e){
    echo $e->getMessage();
  }


?>