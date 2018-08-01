<template>
  <div class="cms-aside">
      <div class="logo"><a href="/">Local panda</a></div>

      <a class="aside-back" href="/activity/">返回产品查询</a>

      <div class="aside-content">
        <el-menu :default-openeds="activeDown" :default-active="activeTitle" background-color="#333" text-color="#fff" active-text-color="#ffd04b">
          <!-- 内容管理 -->

          <!-- 导航渲染 -->
          <el-submenu :index="''+(titleIndex+1)" :key="titleIndex" v-for="(item,titleIndex) in cmsNav">
            <template slot="title"><i :class="item.icon"></i>{{item.title}}</template>
            <el-menu-item-group>
                <el-menu-item  :key="navIndex" v-for="(nav,navIndex) in item.list" :index="(titleIndex+1)+'-'+(navIndex+1)" @click="jump(nav.url)">{{nav.title}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          

        </el-menu>
        
      </div>

  </div>
</template>

<script>


export default {
  name: 'activityAside',
  props:{
    activeTitle : ''
  },
  data () {
    
    let urlQuery = this.$route.query.id;
    var urlId = urlQuery?('?id='+urlQuery):'';
    //导航配置文件
    var cmsNav = [
      
      {
        title:'活动产品管理',
        icon: 'el-icon-menu',
        list:[
          {'title':'基本信息','url':'/activity/info'+urlId},
          {'title':'预定信息','url':'/activity/book'+urlId},
          {'title':'行程信息','url':'/activity/itinerary'+urlId},
          {'title':'内容信息','url':'/activity/content'+urlId},
          {'title':'价格信息','url':'/activity/price'+urlId},
          {'title':'产品图片','url':'/activity/product_pic'+urlId},
          {'title':'游客图片（未开放）','url':'/activity/visitor_pic'+urlId},
          {'title':'供应商信息','url':'/activity/supplier'+urlId},
          {'title':'搜索信息管理','url':'/activity/search'+urlId}
        ]
      }
    ];


    return {
      id: urlQuery,
      cmsNav : cmsNav,//导航结束
    }
  },
  mounted(){
    if(!this.id){
      alert('不存在此产品，请从新查询！');
      location.href = '/activity/';
    }
  },
  computed:{
    activeDown(){      
      if(!this.activeTitle){
        return ['0'];
      }
      let downIndex = this.activeTitle.split('-')[0];
      return [downIndex];
    }
  },
  methods:{
    jump(href){
      location.href = href ? href : '/';
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .logo{ font-size: 24px; text-align: center; height: 60px; line-height: 60px; }
  .cms-aside{
    width: 200px; 
    background-color:#333; 
    color:#fff; 
    overflow: hidden; 
    height: 100vh;
    position: fixed; left: 0; top: 0;
    z-index: 99;
  }
  .cms-aside .logo a{ color: #fff;
    display: block;
    width: 100%;
    height: 100%;
  }
  .cms-aside .el-menu{ border: none;}
  .el-menu-item-group{ padding: 0 0 10px;}
  .cms-aside .el-submenu__title,.cms-aside .el-submenu .el-menu-item{ line-height: 40px; height: 40px;}
  .cms-aside .is-opened .el-menu .el-menu-item{ color: #ccc!important;}
  .cms-aside .is-opened .el-menu .is-active{ color: #ffd04b!important;}
  .cms-aside .is-opened .el-submenu__title{
    background-color: #222 !important;
  }
  .cms-aside .el-menu-item-group__title{
    display: none;
  }
  .aside-content{
    max-height: calc(100% - 60px);
    overflow-y: auto;
  }
  .aside-content .el-menu .is-active .el-menu-item{
   background-color: #333 !important;
 }
 .aside-content>.el-menu>li{
   border-top: #222 solid 1px;
 }
.aside-content .el-menu .is-active .el-menu-item:hover{
  background-color: #2a2a2a !important;
}
 /* .el-menu .is-active .el-submenu__title{
   background-color: #555 !important;
 } */
.el-submenu .el-submenu__title i{
  vertical-align: middle;
}
.el-submenu .el-submenu__title i:nth-child(1){
  position: relative;
  top: -2px;
}
.aside-content::-webkit-scrollbar { width: 6px;  }
.aside-content::-webkit-scrollbar-track { background-color: #333;  border-radius: 3px; }
.aside-content::-webkit-scrollbar-thumb { border-radius: 3px;  background-color: #000; }
.aside-back{
  display: block;
  border: 1px solid #ddd;
  width: 100px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  color: #ddd;
  margin: 0 auto 20px;
  &:hover{
    color: #fff;
    border: 1px solid #fff;
  }
}
</style>