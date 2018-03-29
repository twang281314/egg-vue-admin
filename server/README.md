# server



## 快速入门

<!-- 在此次添加使用文档 -->

如需进一步了解，参见 [egg 文档][egg]。

### 本地开发

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### 部署

```bash
$ npm start
$ npm stop
```

### 单元测试

- [egg-bin] 内置了 [mocha], [thunk-mocha], [power-assert], [istanbul] 等框架，让你可以专注于写单元测试，无需理会配套工具。
- 断言库非常推荐使用 [power-assert]。
- 具体参见 [egg 文档 - 单元测试](https://eggjs.org/zh-cn/core/unittest)。

### 内置指令

- 使用 `npm run lint` 来做代码风格检查。
- 使用 `npm test` 来执行单元测试。
- 使用 `npm run autod` 来自动检测依赖更新，详细参见 [autod](https://www.npmjs.com/package/autod) 。


[egg]: https://eggjs.org

### 目录说明

- app/router.js 用于配置URL路由规则。  
- app/controller/**  
   1、 用于解析用户的输入，处理后返回相应的结果。  
   2、在 HTML 页面请求中，Controller 根据用户访问不同的 URL，渲染不同的模板得到 HTML 返回给用户。
- app/service/** 用于编写业务逻辑层。
- app/public/** 用于放置静态资源。
- app/model/** 用于放置sequelize相关模型。

### 文档

 - Sequelize中文文档：https://itbilu.com/nodejs/npm/VkYIaRPz-.html
 - Egg文档：https://eggjs.org/zh-cn/intro/