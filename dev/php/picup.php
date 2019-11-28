<?php 
session_start();
$memNo=$_SESSION["memNo"];

$errMsg = '';
try {
   
    require_once("../connection.php");

    $pdo->beginTransaction();  
    $sql = "update `member` set memPic=:picName where memNo=$memNo";
    //$sql="INSERT INTO `picturelab` (`picSrc`) VALUES (:picName)";
    $picAdd = $pdo->prepare( $sql ); //先編譯好
 

    $psn = $pdo->lastInsertId();

     //將檔案copy到要放的路徑
     $fileName = $_FILES["upFile"]["name"];
     $from = $_FILES["upFile"]["tmp_name"];
     $to = "./images/$fileName";
     $memPic = "./images/$fileName"; 
 
     if(copy( $from, $to)===true){
         //將檔案名稱寫回資料庫
         $picAdd -> bindValue(":picName", $to);
         $picAdd -> execute();
         echo "新增成功~";
         //echo '<img id="imgPreview" src="./image/$fileName">';
         echo json_encode("$memPic");
         $pdo->commit();     
     }else{
         $pdo->rollBack();
     }
        			
}catch (PDOException $e) {
        $errMsg .= "錯誤 : ".$e -> getMessage()."<br>";
        $errMsg .= "行號 : ".$e -> getLine()."<br>";
        echo $errMsg;
    }
?>