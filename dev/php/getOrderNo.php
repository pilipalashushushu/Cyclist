<?php
$errMsg="";

try{

    require_once("../connection.php");
    
    $sql="select ordNo from ordermaster order by ordNo DESC LIMIT 1";
    $mem=$pdo->query($sql);


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