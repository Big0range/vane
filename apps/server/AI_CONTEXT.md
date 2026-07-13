# Server Context

技术栈：

- Node.js
- Sequelize
- MySQL
- Redis

目录：

hooks/
middlewares/
routes/
middlewares/
serve/
types/
utils/

规范：

- hooks 一般不用动
- serve 只负责数据库的实现以及方法
- middlewares 只负责中间件
- routes 业务层代码 负责前端与数据库和业务之间的交互
- types 公共ts数据类型
- utils 工具函数
- 接口返回方式：

如非必要，接口返回方式为：

<!-- 这是正常成功返回 -->

res.ok({
code: 200 , //状态码 可不填 默认200
message: 'success',//给前端返回的消息 可不填 默认success
data: {} ,//返回的数据 可不填 默认空对象
raw: false,//是否返回原始数据 可不填 默认false false
})

<!-- 这是失败返回 -->

res.fail({
code: 500 , //状态码 可不填 默认400
message: 'fail',//给前端返回的消息 可不填 默认根据状态码自动生成
data: {} ,//返回的数据 可不填 默认空对象
})
可以try catch 来处理异常

<!-- 最简化写法 -->

catch (error) {
res.fail(error)
}
