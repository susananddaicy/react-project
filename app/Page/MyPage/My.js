const Mydata = {
  BaseInfo: {
    name: '戴春玉',
    sex: '男',
    age: '27',
    address: '上海',
    workYears: '工作5年',
    job: '前端开发工程师',
    company: '陆金所（上海）科技服务有限公司',
    email: 'daichunyuer@163.com',
    phone: '13651961970',
    industry: '互联网金融',
  },
  WorkData: [
    {
      title:"2016-03～至今",
      desc:"陆金所（上海）科技服务有限公司",
      hasIcon: true,
      iconDesc: "陆金所，全称上海陆家嘴国际金融资产交易市场股份有限公司，是全球领先的互联网财富管理平台，平安集团旗下成员，2011年9月在上海注册成立，注册资本金8.37亿元，位于国际金融中心上海陆家嘴。陆金所致力于结合金融全球化发展与信息技术创新，以健全的风险管控体系为基础，为广大机构、企业与合格投资者等提供专业、高效、安全的综合性金融资产交易信息及咨询相关服务。",
      success:true
    },
    {
      title:"2015-01～2016-03",
      desc:"北京京东尚科信息技术有限公司上海分公司", 
      hasIcon: true,
      iconDesc: "北京京东尚科信息技术有限公司属于京东商城，总部位于北京。京东尚科主要负责：技术开发、技术转让、技术咨询、技术服务",
    },
    {
      title:"2012-10～2015-01",
      desc:"上海杰之能信息技术有限公司", 
    }
   ],
   EducationData: [
    {
      title:"2008～2012",
      desc:"扬州大学，信息与计算科学专业，本科，统招",
      success:true
    },   
   ],
   ProjectData: [
    {
      title:"2016-03～至今",
      desc:"陆金所APP,Hybid开发,运用Html5,React,ES6,webpack等技术，eslint代码检查...",
      success:true
    },
    {
      title:"2015-01～2016-03",
      desc:"京东移动数据平台"
    },    
   ],
};
export default Mydata;




// 项目介绍
// 陆金所APP，hybrid中的H5开发，按照BU来划分，前端代码库分为很多系统，例如活期产品对应的是cash库，定期产品对应的是b2c库，网贷对应的是p2p库等等。
// 代码库luui提供react基础的UI组件
// 代码库lubase提供业务组件，公共的util方法，页面路由的管理，跟native的通信和回调管理，http请求处理，数据的存储和缓存等等
// 所有的前端库采用的是react框架（react介绍）
// 代码采用的是ES6的编写规范
// React 编写规范  https://github.com/airbnb/javascript/tree/master/react
// HTML&CSS编写规范：http://codeguide.co/
// cssnext编写规范：http://cssnext.io/features/
// 代码强制采用eslint，stylelint做规范检查
// luui和lubase接入gerrit做codereview
// 采用css变量来编写css文件（—LUUIFontFamily：XXX）

// H5跟native的通信和回调管理  JsBridge
// H5调用native，直接跳转一个schema地址，并且注册回调，通过iframe.src，通过约定url的参数，来传递回调
// android与ios实现方式不一致，android采用在webview中注入的方式，native采用iframe截获的方式
// native调用H5，window.Bridge.appCallback
// 对于hybrid调用native功能，如调用后端请求，双方只需要约定taskname，hybrid调用时在前端管理好业务回调，调用Bridge.call({task,sessionId,version,options})交给native，native在完成功能后通过window.Bridge.appCallback({task,sessionId,callbackId,version,data})将数据返回给hybrid。

// 打包机制
// 前端库打包
// luui和lubase前端库打包进 m-public-web。
// 各自的前端业务代码库打包到各自的web项目中，例如lu-m-cash代码打包进m-yeb-web中。
// 源码是通过webpack打包为前端的build结果，然后在java web层则使用gulp根据各web的需求配置，自动各取所需，自动拉取由webpack生产的结果，并由gulp自动生成java velocity模板，并按照规划存放和引用build后的js。

// 跨域问题
// 跨域并不是服务端做的限制，是浏览器本身的限制。你用F12看，浏览器发起的请求和响应时，是可以看到跨域访问的回传数据的，只是ajax的success中你无法去使用这些数据。
// 1.cors方式，在接口的响应中添加允许跨域的响应头headers.Add("Access-Control-Allow-Origin”） 目前项目中采用cors跨域方式。CROS是现在主流解决跨域问题的方案，未来估计也是趋势。Cross-Origin Resource Sharing (CORS)
// 2.JSONP
// 3.IFame方式（Hybrid APP）

// 1.JSONP的原理
// 1. 首先是利用script标签的src属性来实现跨域。
// 2. 通过将前端方法作为参数传递到服务器端，然后由服务器端注入参数之后再返回，实现服务器端向客户端通信。
// 3. 由于使用script标签的src属性，因此只支持get方法

//     var flightHandler = function(data){
//         alert('你查询的航班结果是：票价 ' + data.price + ' 元，' + '余票 ' + data.tickets + ' 张。');
//     };
//     // 提供jsonp服务的url地址（不管是什么类型的地址，最终生成的返回值都是一段javascript代码）
//     var url = "http://flightQuery.com/jsonp/flightResult.aspx?code=CA1998&callback=flightHandler";
//     // 创建script标签，设置其属性
//     var script = document.createElement('script');
//     script.setAttribute('src', url);
//     // 把script标签加入head，此时调用开始
//     document.getElementsByTagName('head')[0].appendChild(script); 


// webpack打包
// webpack的config文件 webpack.config.js文件
// entry表示入口文件名称
// output表示输出文件名称
// module => loader处理各种类型的文件
// 处理css的需要style-loader css-loader
// 处理jsx需要babel-loader
// 处理图片需要url-loader
// 处理字体需要file-loader
// plugins 例如 
//       new HtmlWebpackPlugin({
//       new webpack.optimize.UglifyJsPlugin({
      
// devServer  配置webpack-dev-server，在package.json里配置scripts， "start": "webpack-dev-server --hot --inline"
// postcss 
// externals


// Flex布局，详见自己的项目
// 常见的css3
//   由下到上的动画效果
//   transform: translate3d(0, 100%, 0);
//   transition-duration: 200ms;
// cdn双活
// 修改本地的kernel-core的版本及依赖(tools/parent.lib.gradle)
// 修改本地的ViewResolver（applicationContext.xml）

// react介绍
// react跟vue比较 	
// React	Vue	结果
// 大小	单纯比较两个库的大小没有意义，在开发时这两个库都必须配合其他类库来补充功能的不足。		平手
// 功能	组件化、基于状态自动更新	组件化、双向绑定	平手，Vue 略胜
// 周边组件和架构	react-router、flux 架构、Redux	vue-router、vuex，更多地，vue 都是参考 angular 和 react 社区推出对应的模块	React 胜
// 架手架、构建工具	create-react-app、webpack 等	vue-cli、Webpack	各种支持都有，不是问题，平手
// 服务端渲染	支持	支持	平手
// 混合开发	React-Native（Facebook）	Weex（阿里巴巴） 不成熟	React 胜
// 学习曲线和开发难度	JSX、基于状态的开发思路起初有一定的学习成本，之后平滑	平滑，API 相较于 React 略复杂	平手
// 社区生态	背靠 Facebook，在全球范围内广泛使用，有三到四年的积累	独立开发者维护，代码质量高，新生代类库，在国内比较流行	React 胜
// 总结	Vue 有的核心功能，React 都已经具备，从开发难度，到技术架构两者也没有自己的短板，React 背靠大公司，更加稳定一些，生态更为成熟。		React 胜


// ES6的语法，promise，generator，async，decorator
// javascript基础，this，作用域，闭包，

// 高阶函数
// * 函数可以作为参数被传递；
// * 函数可以作为返回值输出。

// node
// node框架 luffy（基于express）
// react+node

// Decorator（类和类的方法，不能用于函数）

// React 16 新的特性
// https://reactjs.org/blog/2017/09/26/react-v16.0.html
