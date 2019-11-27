<?php
ob_start();
session_start();
$errMsg = "";
$adminId = $_POST["adminId"];
$adminPsw = $_POST["adminPsw"];

try {
    require_once("connect.php"); //連線資料庫
    $sql = "select * from `adminster` where adminId=:adminId and adminPsw=:adminPsw"; //sql指令查詢管理員帳密
    $adminster = $pdo->prepare( $sql ); //先編譯好
    $adminster->bindValue(":adminId", $adminId); //代入資料
    $adminster->bindValue(":adminPsw", $adminPsw);
    $adminster->execute();//執行之


    if( $adminster->rowCount() == 0 ){//找不到
       echo "error";
    }else{
        $adminRow = $adminster->fetch(PDO::FETCH_ASSOC);
        // //登入成功,將登入者的資料寫入session
        $_SESSION["adminNo"] = $adminRow["adminNo"]; //會員編號
        $_SESSION["adminName"] = $adminRow["adminName"]; //暱稱
        $_SESSION["adminId"] = $adminRow["adminId"]; //帳號
        $_SESSION["adminPsw"] = $adminRow["adminPsw"]; //密碼
        echo "success";
    }

}catch (PDOException $e) {
    $errMsg .= "錯誤 : ".$e -> getMessage()."<br>";
    $errMsg .= "行號 : ".$e -> getLine()."<br>";
}
?>  


