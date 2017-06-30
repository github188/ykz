<?php
header('Access-Control-Allow-Origin:*');

//username：用户名
//pwd：密码

$username = $_POST["username"];
$pwd = $_POST["pwd"];

class Res{
    public $status;
    public $msg;
}

//注册
$conn = new mysqli("127.0.0.1", "root", "", "shushi100") or die("连接失败");
$sql = "select * from users where uname = '$username'";
$result = $conn->query($sql);
if($result && $result->num_rows>0){
    //存在相同用户
    $sql = "select * from users where pwd = '$pwd'";
    $result = $conn->query($sql);
    if($result && $result->num_rows>0){
        $res = new Res();
        $res->status = 1;
        $res->msg = "登入成功";
        echo json_encode($res);
    }
    else{
        $res = new Res();
        $res->status = 1;
        $res->msg = "密码错误";
        echo json_encode($res);
        $conn->close();
    }
}
else{
    //无该用户
    $res = new Res();
    $res->status = 0;
    $res->msg = "用户名错误";
    echo json_encode($res);
    $conn->close();
}


