<?php
namespace app\index\controller;

use QL\QueryList;
use think\Db;
use think\Request;
use think\Coll;
use think\cache\driver\Redis;
use think\cache\driver\RedisHash;
use think\response\Jsonp;



class Index  extends Jsonp
{  

    /*内涵段子*/
    public function index()  
    {  
       // $get  = input('get.sgin');
       // if ($get == sha1('mYsgin')) {
        $jsonArray = [];
        $url = 'pic';
        for($i = 0 ;$i <1 ;$i ++ ){
            $arrs = [];
            $sql = '';
            if ($i > 7) {
                $url = 'joke';
            }
            $o = rand(11111111,999999999);
            $a = file_get_contents('http://www.neihanshequ.com/'.$url.'/?is_json=2&app_name=neihanshequ_web&max_time='.$o.'81'.$i);
            $arr = json_decode($a,true);
            foreach ($arr['data']['data'] as $key => $value) {
                       if ( $value['group']['text'] == '') {
                        $jsonArray['text'][] = '无标题';
                       }
                       $str = preg_replace_callback(
                       '/./u',
                        function (array $match) {
                        return strlen($match[0]) >= 4 ? '' : $match[0];
                        },
                        $value['group']['text']);
                    $jsonArray['text'][]= $str;
                    if (isset($value['group']['large_image'])) {
                        $jsonArray['img'][] = $value['group']['large_image']['url_list'][0]['url'];
                    } else if(isset($value['group']['large_image_list'])) {
                        $a = [];
                        foreach ($value['group']['large_image_list'] as $k => $v) {
                                $a[]= $v['url'];
                        }
                        $a  =  implode(",", $a);
                        $jsonArray['img'][] = $a;
                    } 
                    // else {
                         // $jsonArray['content'][]= $value['group']['content'];
                    // }
            }
        foreach ($jsonArray['img'] as $key => $val) {
            $md5 = md5($val);
            $info = Db::table('api_article')->where('hash',$md5)->find();
                if (!empty($info)) {
                 unset($jsonArray['img'][$key]);  
                 unset($jsonArray['text'][$key]);  
            }        
            $arrs[$key]['text'] = $jsonArray['text'][$key];  
            $arrs[$key]['path'] = $val;  
            $arrs[$key]['time'] = date('Y-m-d H:i:s');
            $arrs[$key]['type_id'] = 1;  
        }
        foreach ($arrs as &$vl) {
           $vl = "('".implode("','", $vl)."')";
        }   
            $sql = 'insert into api_article (`article_name`,`path`,`add_time`,`type_id`) values'.implode(',',$arrs);
            $res = Db::execute($sql);
        }
        $sha1 = sha1('20180202');
        $this->bai($sha1);
        // }else {

        //     echo "<script>alert('失败')</script>";
        // }
    } 


    /*百思不得姐*/
    public function  bai($sha1 = '' ){

        // if ($sha1 == sha1('20180202')) {
        
        $new = new  Coll();
        $arrImg = [];
        // /*采集图片文字*/
        $rule = array(
            'title' => array('.j-r-list-c-img img', 'alt'),
            'src' => array('.lazy', 'data-original'),
        );
        for($i = 0; $i < 30;$i++){
            $html     = 'http://www.budejie.com/pic/'.$i;                
            $data = QueryList::get($html)->rules($rule)->query()->getData()->all();

            foreach ($data as $keys => $values) {
                
                $aa = '';
                if (!isset($values['title'])) {
                    $data[$keys]['title'] = '';
                } else {
                    $aa = $values['title'];
                }
                if (!isset($values['src'])) {
                  $data[$keys]['src'] = '';
                }
                $md5 = md5($values['src']);
                $data[$keys]['hash'] = $md5;

                $str = preg_replace_callback('/./u',function (array $match) {
                     return strlen($match[0]) >= 4 ? '' : $match[0];
                },
                $aa);

                $data[$keys]['title'] = $str;


                $info = Db::table('api_article')->where('hash',$md5)->find();
                if (!empty($info)) {
                 unset($data[$keys]);  
                }  
            }
            foreach ($data as  &$v) {
                $v['time'] = date('Y-m-d H:i:s');
                $v['type_id'] = 1;
                $arrImg[] = "('".implode("','", $v)."')";
            }
        }
        $redis->sadd('hosts',serialize($arrImg));
        if (!empty($arrImg)) {
             $sql = 'insert into api_article (`article_name`,`path`,`hash`,`add_time`,`type_id`) values'.implode(',',$arrImg);
             $res = Db::execute($sql);
        }
        /*采集视频*/
        $video = array(
            'name' => array('.j-r-list-c-desc a', 'text'),
            'title' => array('.j-video', 'data-poster'),
            'src' => array('.j-video', 'data-mp4'),
        );
        $viod = [];
        $arr = [];
        for($i = 6; $i < 25 ;$i++){
            $html     = 'http://www.budejie.com/video/'.$i;        
            $arr = QueryList::get($html)->rules($video)->query()->getData()->all();

            foreach ($arr as $keys => $values) {
                $info = [];
                $aaa = '';
                if (!isset($values['title'])) {
                    $arr[$keys]['title'] = '';
                }
                if (!isset($values['name'])) {
                    $arr[$keys]['name'] = '';
                }else{
                    $aaa = $values['name'];
                }
                if (!isset($values['src'])) {
                  $arr[$keys]['src'] = '';
                }
                $md5 = md5($values['src']);
                $arr[$keys]['hash'] = $md5;
                $str = preg_replace_callback('/./u',function (array $match) {
                     return strlen($match[0]) >= 4 ? '' : $match[0];
                },
                $aaa);
                $arr[$keys]['name'] = $str;

                $info = Db::table('api_article')->where('hash',$md5)->find();
                if (!empty($info)) {
                    unset($arr[$keys]);  
                }       
            }
            foreach ($arr as  &$value) {
                // $move = $new->YunMove($v['src']);
                // $v['src'] = $move;
                $value['time'] = date('Y-m-d H:i:s');
                $value['type_id'] = 2;
                $viod[] = "('".implode("','", $value)."')";
            }
        }
     
        if (!empty($viod)) {
           $sql = 'insert into api_article (`article_name`,`path`,`video`,`hash`,`add_time`,`type_id`) values'.implode(',',$viod);
          $res = Db::execute($sql);
        }
         $sha1 = sha1('20180202');
         $this->baike($sha1);
       // } else {

       //      echo "<script>alert('失败')</script>";
       // }
    }

    /*臭事百科*/
    public function baike($sha1 = ''){
        // if ($sha1 == sha1('20180202')) {
       
        //     $redis->sadd('hosts',serialize('2222'));
        // $info = $redis->smembers('hosts'); 
        // print_r($info);die;
        $new = new  Coll();
        $video = array(
            'title' => array('.content span', 'text'),
            'src' => array('.illustration', 'src')
        );
        for($i = 3; $i < 10;$i++){
            $html     = 'https://www.qiushibaike.com/imgrank/page/'.$i;        
            $data[] = QueryList::get($html)->rules($video)->query()->getData()->all();
        }
        foreach ($data[1] as $keys => $values) {
             if (!isset($values['title'])) {
                    $data[1][$keys]['title'] = '';
                }
             if (!isset($values['src'])) {
                  $data[1][$keys]['src'] = '';
             }
            // $move = $new->YunMove($v['src']);
            // $value['src'] = $move;
            $a = '0';
            if (isset($values['src'])) {
                $a = $values['src'];
            } 
            $md5 = md5($a);
            $data[1][$keys]['hash'] = $md5;
            $info = Db::table('api_article')->where('hash',$md5)->find();
            if (!empty($info)) {
                unset($data[1][$keys]);  
            }       

        }

        foreach ($data[1] as &$value) {
            // $move = $new->YunMove($v['src']);
            // $value['src'] = $move;
            // $value['srcs'] = md5($value['src']);
            // $value['times'] = $value/;
            $value['time'] = date('Y-m-d H:i:s');
            $value['type_id'] = 1;
            $value = "('". implode("','", $value)."')";
        }   

        if (!empty($data[1])) {
        
            $sql = 'insert into api_article (`article_name`,`path`,`hash`,`add_time`,`type_id`) values'.implode(',',$data[1]);
            $res = Db::execute($sql);
         }
       //  }else {

       //      echo "<script>alert('失败')</script>";
       // }
    }

    public function cache(){

            $redis = new \Redis();
            $redis->connect('127.0.0.1',6379);
            $videoHost = Db::table('api_article')->where('type_id',1)->limit(100)->field('id,path,article_name,add_time,video,click')->select();
            $imgHost = Db::table('api_article')->where('type_id',2)->limit(100)->field('id,path,article_name,add_time,video,click')->select();
            $host = Db::table('api_article')->where('click ','>' ,'200')->limit(100)->field('id,path,article_name,add_time,video,click')->order('UNIX_TIMESTAMP(add_time)')->select();
            // $redis->sadd('hosts',serialize($data[1]));
            // $redis->sadd('hosts',serialize($data[1]));
             foreach ($videoHost as $key => $value) {
                $redis->zadd('videoHost',$key,serialize($value));
             }
             foreach ($imgHost as $key => $value) {
                $redis->zadd('imgHost',$key,serialize($value));
             }
             $array = array_chunk($host,5);
             foreach ($array as $key => $value) {
                $redis->sadd('hotData',serialize($value));
             }
                 
             $redis->expire('videoHost',86400);
             $redis->expire('imgHost',86400);
    }

     

}  