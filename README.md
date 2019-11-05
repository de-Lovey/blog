## 设计路由

|   路径    | 请求方式 | get参数 |         post参数          |     备注     |
| :-------: | :------: | :-----: | :-----------------------: | :----------: |
|     /     |   get    |         |                           |   渲染首页   |
| /register |   get    |         |                           | 渲染注册页面 |
| /register |   post   |         | email, nikename, password | 处理注册请求 |
|  /login   |   get    |         |                           | 渲染登录页面 |
|  /login   |   post   |         |      email, password      | 处理登录请求 |
|  /logout  |   get    |         |                           | 处理退出请求 |
| /comment  |   get    |         |                           | 渲染评论界面 |
| /comment  |   post   |         |     nikename, content     | 处理评论内容 |

