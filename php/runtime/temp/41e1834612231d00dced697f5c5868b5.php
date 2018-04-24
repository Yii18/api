<?php if (!defined('THINK_PATH')) exit(); /*a:4:{s:63:"E:\servers\tp5\public/../application/index\view\into\index.html";i:1516014836;s:49:"E:\servers\tp5\application\index\view\layout.html";i:1514425778;s:54:"E:\servers\tp5\application\index\view\user\header.html";i:1514425377;s:54:"E:\servers\tp5\application\index\view\user\footer.html";i:1514425319;}*/ ?>
<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>[title]</title>
<style>
body{
color: #333;
font: 16px Verdana, "Helvetica Neue", helvetica, Arial, 'Microsoft YaHei', sans-ser
if;
margin: 0px;
padding: 20px;
}
a{
color: #868686;
cursor: pointer;
}
a:hover{
text-decoration: underline;
}
h2{
color: #4288ce;
font-weight: 400;
padding: 6px 0;
margin: 6px 0 0;
font-size: 28px;
border-bottom: 1px solid #eee;
}
div{
margin:8px;
}
.info{
padding: 12px 0;
border-bottom: 1px solid #eee;
}
.copyright{
margin-top: 24px;
padding: 12px 0;
border-top: 1px solid #eee;
}
</style>
</head>
<body>

	<center>
		<table>
			<tr>
				<td>id</td>
				<td>名称</td>
				<td>头像</td>
				<td>set</td>
			
			</tr>	
			<link rel="stylesheet" href="__PUBLIC__/static/bootstrap/css/bootstrap.min.css" />

			<h2>用户列表（<?php echo $list->total(); ?>）</h2>
		
			
		</table>
		<?php echo $list->render(); ?>
	</center>



<div class="copyright">
<a title="官方网站" href="http://www.thinkphp.cn">ThinkPHP</a>
<span>V5</span>
<span>{ 十年磨一剑-为API开发设计的高性能框架 }</span>
</div>