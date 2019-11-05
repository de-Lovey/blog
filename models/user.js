
//1. 下载导入
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//2.连接数据库名 : blog
mongoose.connect('mongodb://localhost/blog',{useUnifiedTopology: true, useNewUrlParser: true});

//3.设计表结构
var userSchema = new Schema({
    email:{
        type: String,
        required: true
    },
    nikename: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    //时间
    created_time: {
        type : Date,
        default: Date.now //注意 : 这里不需要加括号, 原理: 创建这个对象配置参数会立即执行, 就会立即调用, 千万不要加括号
    },
    //配置默认头像
    avatar: {
        type: String,
        default: '/public/img/avatar-max-img.png'
    },
    //配置个人资料
    personal: {
        type:String,
        default:''
    },
    //性别
    gender: {
        type: Number,
        //限定范围
        enum:[0,1],
        default:0
    },
    age: {
        type: Number,
        default: 0
    },
    blog:{
        type: Array,
        default :[]
    }
});

//将文档创建为数据模型 集合名: User
module.exports = mongoose.model("User", userSchema);
