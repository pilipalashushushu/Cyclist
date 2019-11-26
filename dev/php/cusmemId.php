<?php
$errMsg="";
$memNo=1;

try{

    require_once("connection.php");
    
    $sql="select * from `member` where memNo=:memNo";
    $mem=$pdo->prepare($sql);
    $mem->bindValue(":memNo",$memNo);
    $mem->execute();
    

    if($mem->rowCount()==0){
          echo "找不到資料";
    }else{
        
      $result = $mem->fetch(PDO::FETCH_ASSOC);

      echo json_encode( $result,JSON_UNESCAPED_UNICODE);

    }

}catch(PDOEexception $e){
    $errMsg.="錯誤訊息:".$e->getMessage()."<br>";
    $errMsg.="錯誤行數:".$e->getLine()."<br>";
};


?>