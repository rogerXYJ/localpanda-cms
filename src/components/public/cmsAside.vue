<template>
  <div class="cms-aside">
      <div class="logo"><a href="/">Local panda</a></div>

      <div class="aside-content">
        <el-menu :default-openeds="activeDown" :default-active="activeTitle" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
          <!-- 内容管理 -->

          <!-- 导航渲染 -->
            <el-submenu :index="''+(titleIndex+1)" :key="item.title" v-for="(item,titleIndex) in cmsNav">
                <template slot="title"><i class="el-icon-menu"></i>{{item.title}}</template>
                <el-menu-item-group>
                    <el-menu-item  :key="nav.url" v-for="(nav,navIndex) in item.list" :index="(titleIndex+1)+'-'+(navIndex+1)" @click="jump(nav.url)">{{nav.title}}</el-menu-item>
                </el-menu-item-group>
            </el-submenu>

          

        </el-menu>
        
      </div>

  </div>
</template>

<script>

//导航配置
export default {
  name: 'cmsAside',
  props:{
    activeTitle : ''
  },
  data () {
    return {
      showAside : false,
      cmsNav : {}
    }
  },
  mounted(){
    this.cmsNav = [
      {
        title:'LP管理',
        list:[
          {'title':'关键词管理','url':'/lp/keyword/'}
        ]
      },
      // {
      //   title:'内容管理',
      //   list:[
      //     {'title':'新增文章'}
      //   ]
      // }
    ];

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
<style lang="css">
  .logo{ font-size: 24px; text-align: center; height: 60px; line-height: 60px; border-bottom: #333 solid 1px;}
  .cms-aside .logo a{ color: #fff;
    display: block;
    width: 100%;
    height: 100%;
  }
  .cms-aside .el-menu{ border: none;}
  .el-menu-item-group{ padding: 0 0 10px;}
  .cms-aside .el-submenu__title,.cms-aside .el-submenu .el-menu-item{ line-height: 40px; height: 40px;}
  .cms-aside .el-menu-item-group__title{
    display: none;
  }
</style>