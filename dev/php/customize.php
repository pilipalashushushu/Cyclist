<?php
$errMsg="";

try{

    require_once("../connection.php");
    
    $sql="select b.typeName,b.typeNo,f.frameName,f.frameNo,f.framePic,f.framePrice,h.handleName,h.handleNo,h.handlePic,h.handlePrice,c.colorNo,c.colorName,c.colorPic from handle h join color c on h.frameNo = c.frameNo join frame f on f.frameNo = h.frameNo join biketype b on b.typeNo = f.typeNo ";

    $bike=$pdo->query($sql);

    if($bike->rowCount()==0){
          echo "找不到資料";
    }else{
        
     $arr=[];
     $i=0;
        while($result = $bike->fetch(PDO::FETCH_ASSOC)){

         $arr[$i]=$result;
         $i++;

          };
          
    echo json_encode( $arr,JSON_UNESCAPED_UNICODE);

    }

}catch(PDOEexception $e){
    $errMsg.="錯誤訊息:".$e->getMessage()."<br>";
    $errMsg.="錯誤行數:".$e->getLine()."<br>";
};


?>