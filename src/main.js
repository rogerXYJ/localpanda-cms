// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

//引入公共样式
import './assets/css/base.css'

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
