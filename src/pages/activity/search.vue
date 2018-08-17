<template>
  <div class="cms-page">
    <!-- 侧边栏导航，activeTitle传入1-1的格式，即可展开并高亮对应的导航 -->
    <activityAside :activeTitle="'1-9'"></activityAside>

    <div class="cms-main">

      <h3 class="text_c">搜索信息管理</h3>
      

      <el-form label-width="150px">
        
        <el-form-item label="强制绑定关键词：">
          <ul class="keyword_list">
            <li v-for="(items,index) in keywords" :key="index">
              <input v-model="keywords[index]" class="el-input__inner" vType="text" vTip="请输入搜索关键词" type="text">
              <el-button class="ml10" type="danger" @click="del(index)" plain v-if="index>0">删除</el-button>
            </li>
          </ul>
          <div class="">
            <el-button class="mt10" type="primary" @click="add" plain>新增关键词</el-button>
          </div>
        </el-form-item>

        <el-form-item label="产品权重管理：" class="mt40 bg_eee" required>
          <el-radio v-model="weightAbsolute" :label="true">设置绝对权重</el-radio>
          <el-radio v-model="weightAbsolute" :label="false">增加相对权重</el-radio>

          <p class="c_999" v-if="weightAbsolute">主要用于固定列表页中头部产品的顺序（系统会跳过计算直接赋予该权重）</p>
          <p class="c_999" v-else>主要用于提升产品在列表页的排序位置（在系统算法的基础上增加该权重，但由于基础权重动态变化因此位置不固定）</p>

          
          <div class="mt10" v-if="weightAbsolute">
            <input v-model="weight" class="el-input__inner w200 js_validate" vType="number" min="0" max="5000" vTip="请输入0~5000之间的数字" type="text">　
          0～5000，加值越多，搜索权重越高（默认0）
          </div>
          <div class="mt10" v-else>
            <input v-model="weight" class="el-input__inner w200 js_validate" vType="number" min="0" max="500" vTip="请输入0~500之间的数字" type="text">　
          0～500，加值越多，搜索权重越高（默认0）
          </div>
        </el-form-item>

        
        <!-- <el-form-item label="二级目的地：" class="mt40">
          <div class="mdd_tip">（仅用于产品前台展示）</div>
          <el-checkbox-group v-model="destinationsDetail">
            <el-checkbox v-for="(items,index) in destArr" :label="items.name" :value="items.name" :key="index">{{items.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item> -->

        <el-form-item label=" ">
          <el-button class="mt30" type="primary" @click="submit">提交</el-button>
        </el-form-item>
      </el-form>
      

    </div>

    <!-- 文字提示 -->
    <el-dialog title="温馨提示" :visible.sync="showDialogTip" width="500px" class="bind_dialog">
      <p v-html="dialogTipTxt"></p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="showDialogTip = false">确 定</el-button>
      </span>
    </el-dialog>
    

  </div>
</template>

<script>
import activityAside from '@/components/common/activityAside.vue';
import Validate from '@/panda/validate/';

export default {
  name: 'product_pic',
  components: {
    activityAside,
    Validate
  },
  data () {
    let activityId = this.$route.query.id;

    return {
      
      
      showDialogTip : false,
      dialogTipTxt : '',

      activityId: activityId,

      keywords:[''],
      weight: 0,
      // destinationsDetail:[],
      // destArr:[],

      weightAbsolute:'',


      hasData:false
      

    }


  },
  computed:{
    
  },
  
  methods:{
    dialogTxt(txt){
      this.showDialogTip = true;
      this.dialogTipTxt = txt;
    },
    add(){
      this.keywords.push('');
    },
    del(index){
      this.keywords.splice(index,1);
    },
    submit(){
      var self = this;
      var postData = {
        "activityId": this.activityId,
        "keywords": this.keywords,
        "weight": this.weight,
        //"destinationsDetail": this.destinationsDetail,
        "weightAbsolute":this.weightAbsolute
      };


      if(self.fromValidate.validate()){
        if(self.hasData){
          $.ajax({
            url: 'https://cms.localpanda.com/cms/product/activity/search/info',
            type: 'POST',
            dataType: 'json', //如果跨域用jsonp
            contentType: 'application/json',
            data: JSON.stringify(postData),
            success:function(data){

              if(data.succeed){
                self.dialogTxt('<span class="green">设置成功！</span>');
              }else{
                self.dialogTxt('<span class="red">设置失败，请重试!!</span>');
              }
            },
            error:function(){
              self.dialogTxt('<span class="red">设置失败，请重试!!</span>');
            }
          });	
        }else{
          $.ajax({
            url: 'https://cms.localpanda.com/cms/product/activity/search/info',
            type: 'PUT',
            dataType: 'json', //如果跨域用jsonp
            contentType: 'application/json',
            data: JSON.stringify(postData),
            success:function(data){

              if(data.succeed){
                self.dialogTxt('<span class="green">设置成功！</span>');
              }else{
                self.dialogTxt('<span class="red">设置失败，请重试!!</span>');
              }
            },
            error:function(){
              self.dialogTxt('<span class="red">设置失败，请重试!!</span>');
            }
          });	
        }
        
      }

      
      

    }
  },
  mounted(){
    var self = this;
    //二级目的地查询
    // $.ajax({
    //   url: 'https://cms.localpanda.com/cms/public/dest/list/',
    //   type: 'POST',
    //   dataType: 'json', //如果跨域用jsonp
    //   contentType: 'application/json',
    //   data: JSON.stringify({
    //     "detail":true,
    //     "valid":true
    //   }),
    //   success:function(data){

    //     if(data.length){
    //       self.destArr = data;
    //     };
        
    //   },
    //   error:function(){
        
    //   }
    // });

    $.ajax({
      url: 'https://cms.localpanda.com/cms/product/activity/'+this.activityId+'/search/info',
      type: 'GET',
      dataType: 'json', //如果跨域用jsonp
      contentType: 'application/json',
      success:function(data){
        
        if(data){
          self.weight = data.weight;
          self.keywords = data.keywords;
          //self.destinationsDetail = data.destinationsDetail;
          self.weightAbsolute = data.weightAbsolute
          self.hasData = true;
        }else{
          self.weightAbsolute = true;
        }
        
        
      },
      error:function(){
        
      }
    });	


    this.fromValidate = new Validate({
      inputClassName:'js_validate', //需要校验的input的className
      errorClassName:'valError'  //报错时，会自动在input上添加的className
    });
    
  },
  watch:{
  },
  head(){
    return {
      title: '产品图片信息'
    }
  }
}

</script>




<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  
  .cms-main{
    .keyword_list{
      li{
        margin-bottom: 15px;
        position: relative;
      }
      .el-input__inner{
        width: 400px;
      }
    }
    .w200{
      width: 200px;
    }
    
    .mdd_tip{
      position: absolute;
      left: -180px;
      top: 24px;
      width: 160px;
      text-align: right;
      color: #888;
    }
    .el-checkbox{
      margin-right: 30px;
      margin-left: 0;
      min-width: 150px;
      //line-height: 30px;
      .el-form-item__content{
        
      }
    }

    .valError{
      border-color: #f56c6c;
    }
    .vTip{
      color: #f56c6c;
      position: absolute;
      left: 0;
      top: 100%;
      line-height: 24px;
      font-size: 10px;
    }

    .bg_eee{
      background-color: #f1f1f1;
      padding: 20px 0;
    }
  }
  
</style>
