<?php
session_start();
$errMsg="";

try{

    require_once("../connection.php");
    
    //撈我舉辦的所有活動
    //$sql = "select * from `activity` where memNo='$_SESSION[memNo]'";
    $sql = "select * from `activity` where memNo='3'";

    //我報名的活動
    //$sql="select * from `member` m join `activity` a ON a.memNo= m.memNo join `joinlist` j on  a.actNo = j.actNo";

    $activity=$pdo->query($sql);

    if($activity->rowCount()==0){
          echo "找不到資料";
    }else{
        
     $arr=[];
     $i=0;
        while($result = $activity->fetch(PDO::FETCH_ASSOC)){

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