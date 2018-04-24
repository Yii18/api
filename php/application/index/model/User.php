<?php 
namespace app\index\model;

use think\Model;
use think\Db;
class  User extends Model{

	public static function show(){
		$info = Db::Table('user')->paginate(3);
		return $info;
	}

	public static function del($id){
		$res = Db::Table('user')->where('id = '.$id)->delete();
		return $res;
	}


	public function finds($id){
		$info = Db::Table('user')->where('id = '.$id)->find();

		return $info;
	}



	public function up($data){

		unset($data['id']);
		$info = Db::Table('user')->insert($data);

		return $info;
	}
}


	






