<?php
$memNo = $_GET["memNo"];
$ordTotal = $_GET["ordTotal"];
$memName = $_GET["memName"];
$memTel = $_GET["memTel"];
$memAddr = $_GET["memAddr"];
$errMsg = '';


try{
    require_once('../connection.php');
    $prodlist = $pdo->prepare("insert into  `ordermaster` (`memNo`,`ordTotal`,`ordStat`,`ordName`,`ordTel`,`ordAddr`) values (:memNo,:ordTotal,'1',:memName,:memTel,:memAddr)");
    $prodlist -> bindValue(":memNo",$memNo);
    $prodlist -> bindValue(":ordTotal",$ordTotal);
    $prodlist -> bindValue(":memName",$memName);
    $prodlist -> bindValue(":memTel",$memTel);
    $prodlist -> bindValue(":memAddr",$memAddr);
    $prodlist -> execute();

    echo $prodlist -> rowCount();

}catch(PDOException $e ){
    $errMsg .= "錯誤訊息" .$e->getMessage()."<br>";
    $errMsg .= "錯誤訊息" .$e->getLine()."<br>";
}

?>