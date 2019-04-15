# 好卖符项目 PC端

> edit by valor with 2018-9-14 

## 编译设置

> 为方便, 本项目使用cnpm代替npm

``` bash
# 安装依赖关系
cnpm install

# 在本地主机8080上启动热重载服务
cnpm run dev

# 编译项目用于发布项目时
cnpm run build

# 编译项目用于发布项目时并添加报告
cnpm run build --report
```

## 安装模块

1. router --> 前端路由
2. vuex --> 统一数据管理 已转用CDN
3. axios --> ajax获取数据
4. element-ui --> ui框架 已转用CDN
5. jquery --> layer依赖库,也可以使用ajax获取数据, 此模块已由第三方库代替
6. layer --> 页面弹框
7. vue-clipboard2 --> 一键复制
8. vue-lazyload --> 图片懒加载
 
## 代码规范

1. 运算符、函数小括号前后要加空格
2. 行尾不加分号
3. 冒号前不加空格,后加空格
4. 对象中最后一个属性结束不加逗号
5. 缩进格式为两格缩进
6. 函数有参数的话,逗号后加空格

```javascript
  let a = '上述规则例子'
  function (id, str, arr) {
    console.log(id)
  }
  json: {
    "a": 1,
    "b": 2
  }
```

7. VUE文件命名为首字母大写, 文件命名、name命名、import 命名必须一致, 均为首字母大写
8. 每个功能模块的主页面名字均为Index.vue
9. JQ仅用来使用ajax，严禁使用JQ操作dom对象
10. 尽量使用es6语法进行书写
11. Demo.vue为模板文件,可用来参考各项规则

## 代码结构

```
|---build                      构建项目所需配置
    |---build.js               构建配置
    |---check-vxxxx.js         版本检查配置
    |---utils.js               工具
    |---webpack.base.conf      webpack基础配置
    |---webpack.dev.conf       webpack开发配置
    |---webpack.prod.conf      webpack生产配置
|---config                     配置文件
|---src                        源文件
    |---assets                 需要编译打包的静态资源文件
    |---components             组件文件
        |---invite             邀请返利组件
        |---login              登录组件
        |---personal           个人中心组件
        |---public             公共组件
        |---recharge           充值中心组件
        |---reg                注册组件
        |---task               发布任务组件
        Demo.vue               模板组件
        Index.vue              首页
    |---router                 路由文件
    |---store                  全局状态管理文件
    App.vue                    入口VUE文件
    main.js                    主文件
|---static                     不需要编译打包的静态资源文件
|---test                       测试用例(此项目未开启测试)
index.html                     入口html文件
README.md                      介绍
```

## 参考资料

[VueAPI资料站](https://cn.vuejs.org/v2/api/)

[Vuex资料站](https://vuex.vuejs.org/zh/)

[Vue代码风格指南](https://cn.vuejs.org/v2/style-guide/)

[element-ui文档](http://element-cn.eleme.io/#/zh-CN/component/installation)

[layer文档](https://www.layui.com/doc/modules/layer.html)

[奥森图标检索](https://www.thinkcmf.com/font/font_awesome/icons.html)
