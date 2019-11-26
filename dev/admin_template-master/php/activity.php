<?php
try{
    require_once("../../connection.php");
    
    $sql="select * from `activity`";
    $activity=$pdo->query($sql);
    $actRows = $activity->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode( $actRows);
  

}catch(PDOException $e){
    echo $e->getMessage();
  }
?>
