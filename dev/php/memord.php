<?php
session_start();
$errMsg="";
$memNo=$_SESSION["memNo"];


try{
    require_once("localhost.php");

   //撈我的訂單 ok
   $sql= "select * from `ordermaster` where memNo='3'";

    $ordermaster=$pdo->query($sql);

    if($ordermaster->rowCount()==0){
          echo "找不到資料";
    }else{
        
     $arr=[];
 
     $i=0;

        while($result = $ordermaster->fetch(PDO::FETCH_ASSOC)){
         $arr[$i]=$result;
         $i++;
          };
          
    echo json_encode($arr,JSON_UNESCAPED_UNICODE);

    }

}catch(PDOEexception $e){
    $errMsg.="錯誤訊息:".$e->getMessage()."<br>";
    $errMsg.="錯誤行數:".$e->getLine()."<br>";
};


?>