> 前端

# 安装

项目地址: (git clone)

```
git clone https://github.com/twang281314/egg-vue-admin
```

通过npm安装本地服务第三方依赖模块(需要已安装Node.js)

```
npm install 

```

启动服务

```
cd client

npm run dev

```

发布代码

```
npm run build
```

# 目录结构

```
├── build                     // 项目的 Webpack 配置文件
├── config                    // 项目配置目录
├── server                    // 项目开发的请求数据
├── src                       // 生产目录
│   ├── assets                // 一些资源文件
│   ├── common                // 通用文件、如工具类、状态码
│   ├── components            // 各种组件
│   ├── views                 // 各种页面
│   ├── plugins               // 各种插件
│   ├── router                // 路由配置及map
│   ├── store                 // Vuex 状态管理器
│   ├── App.vue               // 根组件
│   ├── favicon.ico           // ico小图标
│   ├── index.html            // 项目入口文件
│   ├── main.js               // Webpack 编译入口文件，入口js
├── static                    // 静态资源，一般把不需要处理的文件可以放这里
├── .babelrc                  // babelrc配置文件
├── .editorconfig             // 代码风格文件，前提是要你的编辑器支持
├── .gitignore                // 用于Git配置不需要加入版本管理的文件
├── .postcssrc.js             // autoprefixer的配置文件
├── package.json              // 项目配置文件

```

# 使用的技术和库

- [Vue](https://cn.vuejs.org/) 当下最流行的前端JavaScript框架
- [VueRouter](https://router.vuejs.org/zh-cn/) 基于Vue的路由插件
- [Vuex](https://vuex.vuejs.org/zh-cn/) 管理Vue中多组件共享状态的插件，类似react的redux
- [Axios](https://github.com/mzabriskie/axios) 当前最流行的一个http库
- [iView](https://www.iviewui.com/) 基于Vue的一套UI组件库
- [Mock.js](http://mockjs.com/) 生成随机数据，拦截 Ajax 请求 让前端攻城师独立于后端进行开发
