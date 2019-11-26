<?php
try{
    require_once("../../connection.php");
    
    $sql="select * from `product`";
    $product=$pdo->query($sql);
    $prdRows = $product->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode( $prdRows);
  

}catch(PDOException $e){
    echo $e->getMessage();
  }
?>