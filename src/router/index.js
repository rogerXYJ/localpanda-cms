import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

//**  路由参数：路由,文件名,页面title  */
let routers = [

  {path: '/', name: 'index', title:'CMS首页'},
  {path: '/login/', name: 'index', title:'登录'},

  {path: '/content/addArticle', name: 'addArticle', title:'新增文章'},
  {path: '/content/editArticle', name: 'editArticle', title:'编辑文章'},
  {path: '/content/email', name: 'email', title:'邮件模版'},


  {path: '/lp/', name: 'index', title:'LP首页'},
  {path: '/lp/keyword/', name: 'index', title:'关键词搜索'},
  {path: '/lp/keyword/tpl1', name: 'tpl1', title:'外层模版'},
  {path: '/lp/keyword/tpl2', name: 'tpl2', title:'中层模版'},
  {path: '/lp/keyword/tpl3', name: 'tpl3', title:'底层模版'},
  {path: '/lp/keyword/child', name: 'child', title:'关联子项'},
  
  {path:'/grade/index',name: 'index', title:'点评管理首页'},
  {path:'/grade/checkpending',name: 'checkpending', title:'待审核点评列表'},
  {path:'/grade/visitorsgrade',name: 'visitorsgrade', title:'审核游客点评'},
  {path:'/grade/addreview',name: 'addreview', title:'自添加点评'},


  {path:'/activity/info',name: 'info', title:'产品基本信息'},
  {path:'/activity/content',name: 'content', title:'产品内容信息'},
  {path:'/activity/price',name: 'price', title:'产品价格信息'},
  {path:'/activity/setPrice',name: 'setPrice', title:'设置价格信息'}
  

];

//自动加载文件
let routesArr = [];
for(var i=0;i<routers.length;i++){
  var thisR = routers[i];
  var thisPath = thisR.path.replace(/(.+\/).*$/g,'$1');
  var component = require('@/pages' + thisPath + thisR.name + '.vue');
  routesArr.push({
    path: thisR.path,
    name: thisR.name,
    meta:{
      title: thisR.title
    },
    component: component.default
  });
};



//设置路由
const newRouter = new Router({
  mode: 'history', //启用history模式
  base: __dirname,
  routes: routesArr
});

//设置页面title
newRouter.afterEach((transition) => {
  let title = transition.meta.title;
  if(title){
    document.title = title;
  }
})


export default newRouter;

