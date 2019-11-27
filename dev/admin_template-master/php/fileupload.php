<?php 
$errMsg = '';
try {
    // echo "start";
    require_once("connect.php");

    $pdo->beginTransaction();
    $sql="INSERT INTO `product` (`prodType`, `prodName`, `prodPrice`, `prodSpec`, `prodColor`, `prodDetail`, `prodPic`, `prodStat`, `prodLv`, `prodSpeed`, `prodAvoid`) VALUES (:prodType, :prodName, :prodPrice, :prodSpec, :prodColor, :prodDetail, :picName, '1', :prodLv, :prodSpeed, :prodAvoid)";

    $prodAdd = $pdo->prepare( $sql ); //先編譯好
    // $products -> bindValue(":pname", $_POST["pname"]);
    $prodAdd -> bindValue(":prodType" , $_POST["prodType"]);
    $prodAdd -> bindValue(":prodName" , $_POST["prodName"]);
    $prodAdd -> bindValue(":prodPrice" , $_POST["prodPrice"]);
    $prodAdd -> bindValue(":prodSpec" , $_POST["prodSpec"]);
    $prodAdd -> bindValue(":prodColor" , $_POST["prodColor"]);
    $prodAdd -> bindValue(":prodDetail" , $_POST["prodDetail"]);

    $psn = $pdo->lastInsertId();

     //將檔案copy到要放的路徑
     $fileName = $_FILES["upFile"]["name"];
     $from = $_FILES["upFile"]["tmp_name"];
     $to = "../images/$fileName";
 
     if(copy( $from, $to)===true){
         //將檔案名稱寫回資料庫
         $prodAdd -> bindValue(":picName", $fileName);
         $prodAdd -> bindValue(":prodLv" , $_POST["prodLv"]);
         $prodAdd -> bindValue(":prodSpeed" , $_POST["prodSpeed"]);
         $prodAdd -> bindValue(":prodAvoid" , $_POST["prodAvoid"]);
         $prodAdd -> execute();
         echo "新增成功~";
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