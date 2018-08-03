// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

//引入公共样式
import './assets/css/base.css'

//字体
import "./assets/font/iconfont.css";
import './assets/font/iconfont.js'

//引入UI框架
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI);

//引入js组件
import $ from "jquery";


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});



//cookie组件
(function (window) {
  function cookie(){

  };
  var _proto = cookie.prototype;
  _proto.set = function(name, value, options){
    var date2 = new Date();
    var path = options.path ? '; path=' + (options.path) : '',
    domain = options.domain ? '; domain=' + (options.domain) : '',
    secure = options.secure ? '; secure' : '',
    expires = '; expires=' + new Date(date2.setTime(date2.getTime() + (1 * 24 * 60 * 60 * 1000))).toUTCString();

    if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
        var date;
        if (typeof options.expires == 'number') {
            date = new Date();
            date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
        } else {
            date = options.expires;
        }
        expires = '; expires=' + date.toUTCString();
    }
    document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
  };

  _proto.get = function(name){
    var cookieValue = null,
      doc = document;
    if (doc.cookie && doc.cookie != '') {
      var cookies = doc.cookie.split(';');
      for (var i = 0; i < cookies.length; i++) {
          var cookie = $.trim(cookies[i]);
          if (cookie.substring(0, name.length + 1) == (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
          }
      }
    }
    return cookieValue;
  };

  _proto.del = function(name, options){
    var value = '';
    options.expires = -1;
    this.set(name, value, {expires:-1});
  };

  window.cookie = new cookie();

})(window);

//数组操作
!function(r){function t(r){this.init(r)}t.prototype={init:function(r){if(!r)return this.arr;var t="";if(Array.isArray(r))t=r;else{if("string"==typeof r)return"this type not Array";t=[r]}this.arr=t},stringify:function(r){return this.arr.length>1?JSON.stringify(this.arr):JSON.stringify(this.arr[0])},get:function(r){var t=this.arr;if(/\=/.test(r)){for(var i=[],n=r.split("==")[0],s=r.split("==")[1],o=0;o<t.length;o++)t[o][n]==s&&i.push(t[o]);return i}for(var i=[],o=0;o<t.length;o++){var e=t[o][r];i.push(e||"")}return i},each:function(r){for(var t=this.arr,i=0;i<t.length;i++)"function"==typeof r&&r(t[i],i)},sort:function(r,t){return r?"function"==typeof r?(this.arr.sort(r),this.arr):(this.arr.sort(function(i,n){return/^[\u4e00-\u9fa5]+$/.test(i[r])&&/^[\u4e00-\u9fa5]+$/.test(n[r])?(console.log(n[r].localeCompare(i[r])),n[r].localeCompare(i[r])):/(^-?[0-9]\d*$)/.test(i[r])?t&&"down"!=t?n[r]-i[r]:i[r]-n[r]:t&&"down"!=t?i[r]<n[r]:i[r]>n[r]}),this.arr):(this.arr.sort(),this.arr)}},r.fArray=t}(window);