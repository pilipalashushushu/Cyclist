<?php
ob_start();
session_start();
$memId = $_POST["memId"];
$memPsw = $_POST["memPsw"];
$errMsg = "";
try {
    require_once("connect.php");
    
    $sql = "select * from `member` where memId=:memId and memPsw=:memPsw"; //''

    $member = $pdo->prepare( $sql ); //先編譯好
    $member->bindValue(":memId", $memId); //代入資料
    $member->bindValue(":memPsw", $memPsw);
    $member->execute();//執行之

    if( $member->rowCount() == 0 ){//找不到
        $errMsg .= "帳密錯誤, <a href='sign_in.html'>重新登入</a><br>";
        echo  "帳密錯誤";
    }else{
        $memRow = $member->fetch(PDO::FETCH_ASSOC);
        //登入成功,將登入者的資料寫入session
        $_SESSION["memNo"] = $memRow["memNo"]; //會員編號
        $_SESSION["memNickName"] = $memRow["memNickName"]; //暱稱
        $_SESSION["memId"] = $memRow["memId"]; //帳號
        $_SESSION["memPsw"] = $memRow["memPsw"]; //密碼 

        
        echo json_encode($memRow,JSON_UNESCAPED_UNICODE);
     
    }
} catch (PDOException $e) {
    $errMsg .= "錯誤 : ".$e -> getMessage()."<br>";
    $errMsg .= "行號 : ".$e -> getLine()."<br>";
}
?>
