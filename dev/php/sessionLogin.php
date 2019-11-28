<?php
ob_start();
session_start();
$memId = $_POST["memId"];
$memPsw = $_POST["memPsw"];
$errMsg = "";
try {
    require_once("../connection.php");
    
    $sql = "select * from `member` where memId=:memId and memPsw=:memPsw and memStat='1'"; //''

    $member = $pdo->prepare( $sql ); //先編譯好
    $member->bindValue(":memId", $memId); //代入資料
    $member->bindValue(":memPsw", $memPsw);
    $member->execute();//執行之

    if( $member->rowCount() == 0 ){//找不到
        $errMsg .= "帳密錯誤, <a href='sessionLogin.html'>重新登入</a><br>";
    }else{
        $memRow = $member->fetch(PDO::FETCH_ASSOC);
        //登入成功,將登入者的資料寫入session
        $_SESSION["memNo"] = $memRow["memNo"]; //會員編號
        $_SESSION["memNickName"] = $memRow["memNickName"]; //暱稱
        $_SESSION["memId"] = $memRow["memId"]; //帳號
        $_SESSION["memPsw"] = $memRow["memPsw"]; //密碼
        $_SESSION["memEmail"] = $memRow["memEmail"];  //可以不用寫
    }
} catch (PDOException $e) {
    $errMsg .= "錯誤 : ".$e -> getMessage()."<br>";
    $errMsg .= "行號 : ".$e -> getLine()."<br>";
}
?>  
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title></title>

</head>
<body>
<?php 
if($errMsg !=""){
    echo $errMsg;
}else{
    echo $memRow["memNickName"], " 您好~<br>";
}

?>

<a href="sessionMember.php">前往會員專區</a> 
<a href="act.html">活動資料</a>
<a href="memajax.html">去會員資料庫html</a>
<hr>
編號:<?php echo $memRow["memNo"];?>
<hr>
暱稱:<?php echo $memRow["memNickName"];?>
<hr>
帳號:<?php echo $memRow["memId"];?>
<hr>
密碼:<?php echo $memRow["memPsw"];?>
<hr>
姓名:<?php echo $memRow["memName"];?>
<hr>
信箱:<?php echo $memRow["memEmail"];?>
<hr>
地址:<?php echo $memRow["memAddr"];?>
<hr>
照片:<?php echo $memRow["memPic"];?>
<hr>
資料更新時間:<?php echo $memRow["memDate"];?>
<hr>
購物金:<?php echo $memRow["coupon"];?>
<hr>
電話:<?php echo $memRow["tel"];?>
<h4></h4>

<h2 style="text-align:center;color:deeppink">基本資料</h2>
  <table align="center" width="300">
    <form action="UpdateToDb.php" method="get">
      <input type="hidden" name="memNo" value="<?php echo $memRow["memNo"];?>">
    <tr><th>編號</th><td><?php echo $memRow["memNo"];?></td></tr>
    <tr><th>暱稱</th><td><input type="text" name="memNickName" value="<?php echo $memRow["memNickName"];?>"></td></tr>
    <tr><th>帳號</th><td><input type="text" name="memId" value="<?php echo $memRow["memId"];?>"></td></tr>
    <tr><th>密碼</th><td><input type="text" name="memPsw" value="<?php echo $memRow["memPsw"];?>"></td></tr>
    <tr><th>姓名</th><td><input type="text" name="memName" value="<?php echo $memRow["memName"];?>"></td></tr>
    <tr><th>信箱</th><td><input type="text" name="memEmail" value="<?php echo $memRow["memEmail"];?>"></td></tr>
    <tr><th>地址</th><td><input type="text" name="memAddr" value="<?php echo $memRow["memAddr"];?>"></td></tr>
    <tr><th>電話</th><td><input type="text" name="tel" value="<?php echo $memRow["tel"];?>"></td></tr>
    
    <tr><td colspan="2" align="center"><input type="submit" value="修改"></td></tr>
    </form>
  </table>





<!-- <input type="hidden" name="MAX_FILE_SIZE" value="2048"> -->
     

<!-- 帳號<input type="text" name="memId"><br>
密碼<input type="text" name="memId"><br>
姓名<input type="text" name="memName"><br>	 -->



<form action="fileUpload.php" method="post" enctype="multipart/form-data">
<input type="file" name="upFile" id="upFile" style="display:none"><br>
<label for="upFile">  
大頭貼 <img id="imgPreview" src="camera.svg">
</label>
<input type="submit" value="submit">



</form> 


<script type="text/javascript">
	window.addEventListener("load", function(){
		//.................upFile.onchange
		document.getElementById("upFile").onchange = function(e){
			let file = e.target.files[0];
			let reader = new FileReader();
			reader.onload = function(e){
				document.getElementById("imgPreview").src= reader.result;
			}
			reader.readAsDataURL( file );
		};
		     
	})
</script> 






















</body>
</html>