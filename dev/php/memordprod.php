<?php
session_start();
$errMsg="";

//$ordNo=$_REQUEST["ordNo"];
// $memNo=$_SESSION["memNo"];
//echo "ok $ordNo";

try{


  require_once("localhost.php");

  //我訂購的明細資料
   $sql="select i.ordNo,i.prodNo,p.prodName,i.amount,p.prodPrice 
   from `member` m 
   join `ordermaster` o ON m.memNo=o.memNo
   join `orderitem` i ON o.ordNo=i.ordNo 
   join `product` p ON i.prodNo=p.prodNo 
   WHERE m.memNo='3'";

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