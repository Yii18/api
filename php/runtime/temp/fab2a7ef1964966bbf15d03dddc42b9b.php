<?php if (!defined('THINK_PATH')) exit(); /*a:1:{s:60:"E:\servers\tp5\public/../application/index\view\into\up.html";i:1514362628;}*/ ?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>修改用户信息</title>
</head>
<body>


<center>
	
	<form action="?s=index/into/up" method="post" enctype="multipart/form-data">
	<table>
		<input type="hidden" name="id" value="<?php echo $userInfo['id']; ?>">
		<tr>
			<td>用户名</td>
			<td><input type="text" name="man" value="<?php echo $userInfo['man']; ?>"></td>
		</tr>
		<tr>
			<td>密码</td>
			<td><input type="password" name="pwd" value="<?php echo $userInfo['pwd']; ?>"></td>
		</tr>
		<tr>
			<td>用户头像</td>
			<td><input type="file" name="img_path"><br><img width="250" height="150"  src="<?php echo $userInfo['img_path']; ?> " alt=""></td>
		</tr>
		<tr>
			<td><input type="submit"></td>
			<td></td>
		</tr>
	</table>
	</form>
</center>



</body>
</html>