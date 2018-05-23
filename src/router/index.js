import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

//**  路由设置，//路由名：文件名  */
let routers = {
  //首页
  '/': 'index',
  
  //文章页面
  '/content/addArticle': 'addArticle',

  //LP页面
  '/lp/': 'index',
  '/lp/keyword/': 'index',
  '/lp/keyword/tpl1': 'tpl1',
  '/lp/keyword/tpl2': 'tpl2',
  '/lp/keyword/tpl3': 'tpl3',
  '/lp/keyword/child': 'child'
}


//自动加载路由
let routesArr = [];
for(var thisKey in routers){
  var thisPath = thisKey.replace(/(.+\/).*$/g,'$1');
  var component = require('@/pages' + thisPath + routers[thisKey] + '.vue');
  routesArr.push({
    path: thisKey,
    name: routers[thisKey],
    component: component.default
  });
};
export default new Router({
  mode: 'history', //启用history模式
  base: __dirname,
  routes: routesArr
})

