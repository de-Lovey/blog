var express = require('express');
var User = require('./models/user');
var md5 = require('blueimp-md5');
//创建路由对象
var router = express.Router();

//配置路由
router.get('/', function (req, res) {
    console.log(req.session.user); //获取登录的信息
    res.render('index.html',{
        user: req.session.user
    });
});

//渲染注册页面
router.get('/register', function (req, res) {
    res.render('register.html')
});

//处理注册请求
router.post('/register', function (req, res) {
    //1.设置请求头  body-parser
    //2.获取表单数据
    //console.log(req.body);
    //3.操作数据库----连接数据库等等
    //4.分析 : 如果邮箱或者昵称已存在, 不允许注册
    //         如果邮箱或者昵称不存在, 注册新用户
    var body = req.body;
    //5.查询时判断邮箱或者昵称是否存在
    User.find({
        $or: [
            { email : body.email },
            { nikename: body.nikename}
        ]
    }, function (err, data) {
        //查询失败
        if(err) return res.status(500).json({ statusCode: 1005, message :"服务器繁忙"});

        //查询成功 ,有数据, 说明已存在, 不能注册
        if(data.length){
            console.log(data);
            //给客户端发送json数据, express提交一个json()方法, 能帮你转换成json对象
            return res.status(200).json({
                statusCode: 1000,
                message: "邮箱或者密码已存在"
            });
        }
        //console.log(data); // []

        //查询成功 ,没有数据, 添加数据
        //使用md5工具加密密码 ---- 尽量层叠加密
        body.password = md5(md5(md5(body.password)));
        new User(body).save(function (err, data) {
            if(err) {
                return res.status(500).json({ statusCode: 1005, message :"服务器繁忙"});
            }

            //保存用户信息---保险
            req.session.user = data.nikename;
            //响应数据给客户端
            res.status(200).json({"success": true, message: "注册成功" });

            //重定向到首页====关于重定向 : 只针对于同步
            //res.redirect('/');
        })


    })

});

//渲染登录页面
router.get('/login', function (req, res) {
    res.render('login.html');
});

//处理登录请求
router.post('/login', function (req, res) {
    //1. 获取表单数据  req.body
    //2. 查询数据库中邮箱和密码是否正确
    //3. 发送响应数据
    var body = req.body;
    User.find({
        email: body.email,
        password: md5(md5(md5(body.password)))  //注意登录时, 也要加密之后去查询
    }, function (err, data) {
        if( err) return res.status(500).json({ statusCode: 1005, message:"服务端错误"});
        //查询成功 没有数据, 返回[], 提示用户邮箱或者密码不存在
        if(!data.length){
            return res.status(200).json({ statusCode: 1001, message:"邮箱或者密码不存在"});
        }
        //查询成功 有对应的数据 , 登陆成功
        //console.log(data);
        //通过session记录登录的状态
        console.log(data);

        req.session.user = data[0].nikename;
        res.status(200).json({ success: true, message:"ok"});
    })
});

//处理登出请求
router.get('/logout', function (req, res) {
    //清除登录的状态
    req.session.user = null;
    res.redirect('/login');//因为是同步行为, 直接使用重定向来跳到登录页
});

//发表博客
//评论
//修改个人资料

/*
* 总结步骤:
* 1. 使用express框架来搭建服务器
* 2. 设计路由
* 3. 处理注册请求  配置请求头, 通过设计数据库来查询数据
* 4. 使用mongoose来链接数据库, 并且设计表结构,
* 5. 查询数据库时判断数据是否存在, 根据判断处理业务逻辑, 即给客户端发送响应
* 6.注册成功时,直接跳到首页, 使用express-session记录你的个人信息 ,最终可以通过req.session来进行访问和设置了 . 配置成功, 注册成功的时候设置, 跳到首页访问, 并且通过模板引擎渲染你所访问时的信息
* 7.处理登录请求. 判断和数据库的信息是否匹配, 给客户端发送响应
* 8.处理登出请求, 清除当前的用户个人信息
*
* 注意 : 使用blueimp-md5 对密码加密
*        使用express-session 来保存用户登录的状态
*        使用path.join(__dirname, './public')) 很规范的拼接对应的目录, 不会受执行node所处终端的影响
*
*
* */

//将路由对象挂载上去
module.exports = router;
