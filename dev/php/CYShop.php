<?php
require_once('../connection.php');
$prodlist = $pdo->query("select * from `product`");
$arr = [];
while( $prodRow = $prodlist->fetch(PDO::FETCH_ASSOC) ){
    array_push($arr, $prodRow);
};
echo json_encode($arr,JSON_UNESCAPED_UNICODE);
?>