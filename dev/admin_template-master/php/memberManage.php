<?php
try{
    require_once("../../connection.php");
    
    $sql="select * from `member`";
    $member=$pdo->query($sql);
    $memRows = $member->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode( $memRows);

}catch(PDOException $e){
    echo $e->getMessage();
  }
?>