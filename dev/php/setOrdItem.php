<?php
$errMsg="";
$ordNo=$_GET["ordNo"];

try{

    require_once("../connection.php");
    
    $sql="INSERT INTO `orderitem` (ordNo,prodNo,amount,price) VALUES (:ordNo,1,1,16000)";

    $checkout=$pdo->prepare($sql);

    $checkout->bindValue(":ordNo",$ordNo);
    
    $checkout->execute();


    if($checkout->rowCount()==0){
          echo "找不到資料";
    }else{
        
  
    }

}catch(PDOEexception $e){
    $errMsg.="錯誤訊息:".$e->getMessage()."<br>";
    $errMsg.="錯誤行數:".$e->getLine()."<br>";
};


?>