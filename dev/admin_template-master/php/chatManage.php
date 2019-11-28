<?php
try{
    require_once("../../connection.php");
    
    $sql="SELECT * FROM `customerservice`";
    $chat=$pdo->query($sql);
    $chatRows = $chat->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode( $chatRows);
}catch(PDOException $e){
    echo $e->getMessage();
  }


?>