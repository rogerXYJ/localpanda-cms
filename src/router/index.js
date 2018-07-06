import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

//**  路由参数：路由,文件名,页面title  */
let routers = [

  {path: '/', name: 'index', title:'CMS首页'},

  {path: '/content/addArticle', name: 'addArticle', title:'新增文章'},
  {path: '/content/editArticle', name: 'editArticle', title:'编辑文章'},
  {path: '/content/email', name: 'email', title:'邮件模版'},

  {path: '/lp/', name: 'index', title:'LP首页'},
  {path: '/lp/keyword/', name: 'index', title:'关键词搜索'},
  {path: '/lp/keyword/tpl1', name: 'tpl1', title:'外层模版'},
  {path: '/lp/keyword/tpl2', name: 'tpl2', title:'中层模版'},
  {path: '/lp/keyword/tpl3', name: 'tpl3', title:'底层模版'},
  {path: '/lp/keyword/child', name: 'child', title:'关联子项'},

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

