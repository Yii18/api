<?php 

namespace app\index\controller;

use app\index\Model\User;
use think\Db;
use think\Controller;
use think\Request;
use think\config;
use think\response\Jsonp;
// require_once '/usr/local/xunsearch/sdk/php/lib/XS.php';
		

class Into extends Jsonp
{

	public $sqlOffse = 0;

	public function index(){
		// $list->render()	
		$this->display("layout_test/model.html");
		// $info = User::show();
		// // $info = User::paginate(3)->select();
		// $this->assign('list',$info);

// 		print_r($a);
// die;
		return $this->fetch('into/file');
	}

	public function api(){

 		// return $_FILES;
		$config = Config::get('api');
		if ($_POST) {

			$post = $_POST;
 			$file = Request::instance()->file('path');


 			if ($file && !empty($post['state'])&& !empty($post['app_id'])) {

 				 if (!empty($post['token'])) {

					$token = $post['token'];
					$token =  $this->decode($token);

					$client_id = $post['app_id'];
					$TokenInfo = DB::name('user_token')->where('user_id',$client_id)->field('user_token,time,id')->find();

					if ($token != $TokenInfo['user_token']  || time() - $TokenInfo['time']  < 86400 ) {
						
						$code = $config['code'][1];
						$message = $config['message'][1];
	 				 	return  json_encode(array('code'=>$code,'message'=>$message));
					}

	 				 $path = $file->getInfo();
					 $bucket = "yii182";
					 $info = $file->upOss('yii182',$_POST['name']);
					 $message = $info['info']['url'];	
	 				 if ($post['state'] == 1) {
	 					 $code = $config['code'][7];
	 				 	return  json_encode(array('code'=>$code,'message'=>$message));
	 				 } elseif ($post['state'] == 2) {
						$code = $config['code'][7];
	 				 	return xml(array('code'=>$code,'message'=>$message));
	 				 } 
	 				 else {
						$code = $config['code'][3];
						$message = $config['message'][3];
	 				 }
	 				 return json_encode(array('code'=>$code,'message'=>$message));


 				 } else {
						$code = $config['code'][1];
						$message = $config['message'][1];
 				 }




			 } else {

			 	$code = $config['code'][0];
				$message = $config['message'][0];
			 }
		} else {
		 	$code = $config['code'][0];
			$message = $config['message'][0];
		}
		$arr = array('code'=>$code,'message'=>$message);
		return json_encode($arr);
	}




	/*对称加密*/
	public function encode($string = '', $skey = 'cxphp') {
    $strArr = str_split(base64_encode($string));
    $strCount = count($strArr);
    foreach (str_split($skey) as $key => $value)
        $key < $strCount && $strArr[$key].=$value;
   		return str_replace(array('=', '+', '/'), array('O0O0O', 'o000o', 'oo00o'), join('', $strArr));
	}



	/**
	 * 简单对称加密算法之解密
	 * @param String $string 需要解密的字串
	 * @param String $skey 解密KEY
	 * @author Anyon Zou <zoujingli@qq.com>
	 * @date 2013-08-13 19:30
	 * @update 2014-10-10 10:10
	 * @return String
	 */
	public function decode($string = '', $skey = 'cxphp') {
	    $strArr = str_split(str_replace(array('O0O0O', 'o000o', 'oo00o'), array('=', '+', '/'), $string), 2);
	    $strCount = count($strArr);
	    foreach (str_split($skey) as $key => $value)
	        $key <= $strCount  && isset($strArr[$key]) && $strArr[$key][1] === $value && $strArr[$key] = $strArr[$key][0];
	    return base64_decode(join('', $strArr));
	}


	/*获取token*/
	public function token(){
		//必须为get方式 参数包含app_id 和 app_server
		$config = Config::get('api');
		$data = Input('get.');
		if (!empty($data['app_id'])&&!empty($data['app_server'])) {
			$app_id = $data['app_id'];
			$app_server = $data['app_server'];
			$AppInfo = DB::name('client')->where('app_id',$app_id)->field('app_id,app_server,client_id')->find();
			if ($AppInfo['app_server'] == $app_server) {
			   
				$client_id =  $AppInfo['client_id'];
				$TokenInfo = DB::name('user_token')->where('user_id',$client_id)->field('user_token,time,id')->find();
				if (time() - $TokenInfo['time'] > 86400) {

					$token = md5($client_id.'token');
					$TokenInfo['user_token'] = $client_id.$token;
					$res= DB::name('user_token')->where('user_id',$client_id)->where('id',$TokenInfo['id'])->update(['time'=>time(),'user_token'=>$token]);
				} 
				$code = $config['code'][7];
				$message = $this->encode($TokenInfo['user_token']);
				$json = array('code'=>$code,'message'=>$message);
				return json($json);

			} else {
				$code = $config['code'][4];
				$message = $config['message'][4];
			}
		} else {
			$code = $config['code'][0];
			$message = $config['message'][0];
		}

		$json = array('code'=>$code,'message'=>$message);
		return json_encode($json);
	}

	/*删除数据*/
	public function del(){
		$id = $_GET['id'];
		$res = User::del($id);
		if ($res) {
			return $this->success('o鸡巴k');
		} 
			return $this->success('滚鸡巴k');
	}


	/*修改数据*/
	public function up(){
		// $id = isset($_GET['id']) ?$_GET['id'] :0 ;
		// $data = $_POST;
		// // $new = new User;

		// if ($data) {
			 $file = Request::instance()->file('ceshi');
			 // //文件信息
			 // $path = $file->getInfo();
			 // $bucket = "yii182";
			 // $info = $file->upOss($path,$bucket);
 			 $info = $file->move(ROOT_PATH . 'public' . DS . 'uploads');
             if($info){
             	// 成功上传后 获取上传信息
             	// 输出 jpg
             	// echo $info->getExtension();
             	// 输出 20160820/42a79759f284b767dfcb2a0197904287.jpg
             	$name = $info->getSaveName();
            	 // 输出 42a79759f284b767dfcb2a0197904287.jpg
             	// $name =  $info->getFilename();
             	$data['img_path'] = 'uploads/'.$name;
             	// print_r($data);die;
             	// $res = $new->up($data);
				// return $this->success('o鸡巴k',"into/index");
             }
         //     else{
         //    	// 上传失败获取错误信息
         //    	echo $file->getError();
        	// // }
			
		// } else {

		// 	$res = $new->finds($id);
		// 	$this->assign('userInfo',$res);
		// 	return $this->fetch();
		// }
	}


	/*首页数据*/
	public function Recommend(){

		$config = Config::get('api');	
		$state =  Input('get.state');
		$callback = Input('get.callback');
		$callback = isset($callback) ?$callback : 'error';
		$status = 'no';	

		$info = [];
		if (isset($state) && $callback != 'error') {
			$redis = new \Redis();
			$redis->connect('127.0.0.1',6379);
			$newOffse = Input('get.offset');
			$offse = ($newOffse-1)*5 < 0  ? 0:($newOffse-1)*5 ;
			$size  = 5;
			$arrinfo = [];

			switch ($state) {

				case 'recommend':
					$arr = $this->CacheOrSql('hotData',$state,$offse,$size,$newOffse);
				break;

				case 'void':
					$arr =	$this->CacheOrSql('videoHost',$state,$offse,$size,$newOffse);
				break;

				case 'img':
				    $arr = 	$this->CacheOrSql('imgHost',$state,$offse,$size,$newOffse);
				break;
			}

			$status = empty($arr) ? 'no' :'yes';
			$code = $config['code'][7];
			return $message = $callback."(".json_encode(array('code'=>$code,'is_state'=>$status,'message'=>$arr)).")";
			 
		} else {
			$code = $config['code'][0];
			$message = $config['message'][0];
		}
		$array = ['code'=>$code,'statuss'=>$status,'message'=>$message];
		return json($array);	
	}


	public function CacheOrSql($key,$status,$offse,$size,$newOffse){

		$arrinfo = [];
		$info = [];

		$redis = new \Redis();
		$redis->connect('127.0.0.1',6379);
		if ($status == 'recommend') {
			$info = $redis->SRANDMEMBER($key);
			$info = unserialize($info);
		} else {
		    $count =  $redis->zsize($key);
			if ($offse < ($count -5)) {
				$arrinfo = $redis->zrangebyscore($key,0, $count, array('limit' => array($offse,$size)));
				foreach ($arrinfo as $key => $value) {
					$info[] = unserialize($value);
		   		}
			} else {
				$this->sqlOffse++;
           		$info = Db::table('api_article')->where('click ','>' ,'200')->limit($this->sqlOffse,5)->field('id,path,article_name,add_time,video,click,type_id')->order('UNIX_TIMESTAMP(add_time)')->select();
			}
		}

		$arr = [];


		if (!empty($info)) {
			foreach ($info as $key => $value) {
				$value['status'] = 'no';
				$a = explode(",", $value['path']);
				$count = count($a);
				if ($count > 1) {
					$value['status'] = 'yes';
					$value['path'] = $a;
				}
				$arr[] = $value;
			}
		}



		return $arr;

	}


	public function xunsearch(){

		$keyWord =  input('get.keyWord');
		$callback = input('get.callback');
		$offse = input('get.offse');

		$keyWord =  isset($keyWord) ?$keyWord : 'error';

		$callback = isset($callback) ?$callback : 'error';
		$xunDemoConfig = Config::get('search');	
		$config = Config::get('api');	
		$array = [];
		$arr = [];
		$count = 0;
		$status = 'no';
		if ($keyWord == 'error') {
			$code = $config['code'][10];
			$code = $config['message'][10];

		} else {

			$demo = $xunDemoConfig['demo'];
			$xs = new \XS($demo);	
			$search = $xs->search;
			//注意 此处调用的为xs类中的search属性
			$search->setQuery($keyWord);
			// 设置搜索语句：检索body型字段及混合型区
			$search->setLimit(1,$offse);
			//设置排序方式
			// $search->setSort('add_time', true); // 按 news_date字段的值正序排列 默认为倒序
			//多个排序条件用法如下
			//执行搜索并返回结果
			$data = $search->search();
			//注意：这里调用的是search方法
	
			if ($data) {
				foreach ($data as $key=>$value) {
					$array[$key]['article_name'] =  $search->highlight($value->article_name);
					$array[$key]['id'] =  $value->id;
					$array[$key]['path'] =  $value->path;
					$array[$key]['video'] =  $value->video;
					$array[$key]['add_time'] =  $value->add_time;
				}	
			}
			//demo案例获取结果方式
			//document类中：percent方法标识匹配度，rank为当前数据的序号（不是主键ID）
			//搜索结果高亮显示：
			//获取搜索结果数量
			$count = $search->count();// 此方法应使用在search() 方法之后
			//获取热门搜索词汇
			$code = $config['code'][7];
			$status = 'yes';
		}

		if ($array) {

			foreach ($array as $key => $value) {
				$value['status'] = 'no';
				$a = explode(",", $value['path']);
				$count = count($a);
				if ($count > 1) {
					$value['status'] = 'yes';
					$value['path'] = $a;
				}
				$arr[] = $value;
			}
		} else {
			$status = 'no';
		}
		return $callback."(".json_encode(array('code'=>$code,'message'=>$arr,'count'=>$count,'status'=>$status)).")";
	}

	
}

