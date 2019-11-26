<?php
$memNo = 3;
try{
    require_once('connection.php');
    $prodlist = $pdo->prepare("select * from `member` where memNo =:memNo");
    $prodlist -> bindValue(":memNo",$memNo);
    $prodlist -> execute();

    if( $prodlist-> rowCount() == 0) {
        echo "找不到";
    }else{
        $re = $prodlist -> fetch(PDO::FETCH_ASSOC);
        echo json_encode($re,JSON_UNESCAPED_UNICODE);
    }
}catch(PDOException $e ){
    $errMsg .= "錯誤訊息" .$e->getMessage()."<br>";
    $errMsg .= "錯誤訊息" .$e->getLine()."<br>";
}

?>