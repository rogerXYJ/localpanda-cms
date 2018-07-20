<template>
  <div class="cms-page">
    <!-- 侧边栏导航，activeTitle传入1-1的格式，即可展开并高亮对应的导航 -->
    <activityAside :activeTitle="'1-3'"></activityAside>

    <div class="cms-main">
      <h3 class="text_c">行程信息</h3>

      <div class="">
        <el-button type="primary" @click="addDestination">添加行程</el-button>
      </div>
    </div>


    <!-- 选择出发地弹窗 -->
    <el-dialog title="选择出发地" :visible.sync="dialogShow" width="800px" class="destination_dialog">
      

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="departures_change">确 定</el-button>
      </span>
    </el-dialog>


    

  </div>
</template>

<script>
import activityAside from '@/components/common/activityAside.vue';
import Validate from '@/assets/js/plugin/validate/';
  

export default {
  name: 'tpl1',
  components: {
    activityAside
  },
  data () {
    let urlQuery = this.$route.query;

    return {
      //页面配置
      dialogShow:true
    }


  },
  computed:{
    
  },
  
  methods:{
    

    submitForm(pageData){
      this.$refs[pageData].validate((valid) => {

        if (valid && this.fromValidate.validate()) {

          // $.ajax({
          //   url: submitUrl,
          //   type: this.pageId?'POST':'PUT',
          //   dataType: 'json', //如果跨域用jsonp
          //   contentType: 'application/json',
          //   data: JSON.stringify(newPostData),
          //   success:function(data){
              
          //     console.log(data);
              
          //   },
          //   error:function(){
              
          //   }
          // });	



        } else {
          console.log('error submit!!');
          return false;
        }



      });
    }
  },
  mounted(){
    var self = this;

    
    //请求编辑数据
    if(this.pageId){

      $.ajax({
        url: 'https://api.localpanda.com/cms/product/activity/'+this.pageId,
        type: 'GET',
        dataType: 'json', //如果跨域用jsonp
        contentType: 'application/json',
        success:function(data){
          
          console.log(data);
          self.pageData = data;
         
        },
        error:function(){
          
        }
      });	

      
    }else{
      
    }


    
    this.fromValidate = new Validate({
      inputClassName:'js_validate', //需要校验的input的className
      errorClassName:'valError'  //报错时，会自动在input上添加的className
    });
    
  },
  watch:{
    
  },
  head(){
    return {
      title: this.title
    }
  }
}

</script>




<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .el-input{
    width: auto;
  }
  .cms-main{
    
  }
  
</style>
