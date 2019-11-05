//1. npm init -y
//2. 下载相关的依赖 express  mongoose art-template express-art-template
//3.导入
var express = require('express');
var path = require('path');
var router = require('./router');
var bodyParser = require('body-parser');
var session = require('express-session');

//3.创建服务器
var app = express();

//4.配置静态资源 ,
app.use('/public', express.static(path.join(__dirname, './public')));
app.use('/node_modules', express.static(path.join(__dirname, './node_modules')));
//配置模板引擎
app.engine('html',require('express-art-template'));
app.set('views', path.join(__dirname, './views'));
//配置请求头
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//5.请求路径
// app.get('/', function (req, res) {
//     res.render('index.html');
// })


//配置session
app.use(session({
    //加密字符串, 在原有的字符串上拼接你设置的字符串, 达到安全性高一点
    secret: 'keyboard sdfsdcat', //配置的字符串
    //设置session有默认的过期时间, 设置为false意为禁止了
    resave: false,
    //为true时刷新直接取票 , 登录注册时检票
    saveUninitialized: false,
    //针对于https来设置
    //cookie: { secure: true }
}));
//使用工具  设置session数据 : req.session.user = "张三";
//使用工具  获取session数据 : req.session.user
//最终可以通过req.session来进行访问和设置了

//使用cors解决跨域, 来允许所有的访问地址
app.all('*',function(req,res,next){
    res.header('Access-Control-Allow-Origin','*');
    next();
});

//将路由注册到app服务器上
app.use(router);
//6.绑定端口号
app.listen(3300, function () {
    console.log("running~~~~")
})