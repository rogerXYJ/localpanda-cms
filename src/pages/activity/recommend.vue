<template>
  <div class="cms-page">
    <!-- 侧边栏导航，activeTitle传入1-1的格式，即可展开并高亮对应的导航 -->
    <activityAside :activeTitle="'1-10'"></activityAside>

    <div class="cms-main">

      <h3 class="text_c">推荐产品管理</h3>
      

      <el-form label-width="150px">
        
        <el-form-item label="产品ID：">
          <ul class="keyword_list">
            <li v-for="(items,index) in idList" :key="index">
              <input v-model="idList[index].activityId" class="el-input__inner js_validate" vType="text" vTip="请输入产品ID" type="text">
              <el-button class="ml10" type="danger" @click="del(index)" plain>删除</el-button>
            </li>
          </ul>
          <div class="">
            <el-button type="primary" @click="add" plain>添加产品</el-button>
          </div>
        </el-form-item>

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

      idList:[],
      defaultList:[]  //用于对比删除的id
      

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
      this.idList.push({
        "activityId": '',
        "objectId": this.activityId,
        "objectType": "GUIDE_SERVICE"
      });
      this.fromValidate.init();
    },
    del(index){
      var self = this;
      this.fromValidate.init();

      $.ajax({
        url: 'https://cms.localpanda.com/cms/product/activity/binding/'+this.idList[index].id,
        type: 'DELETE',
        success:function(data){
          if(data.succeed){
            self.$message({
              message: '删除成功！',
              type: 'success'
            });
            self.idList.splice(index,1);
          }else{
            self.$message.error('删除失败，请重试!!');
          }
        },
        error:function(data){
          self.$message.error('删除失败，请重试!!');
        }
      });	
    },
    getDelId(){
      var defaultList = this.defaultList;
      var idList = this.idList;
      var delArr = [];
      for(var i=0;i<defaultList.length;i++){
        var thisData = defaultList[i];
        var hasId = false;
        for(var j=0;j<idList.length;j++){
          var thisData2 = idList[j];
          if(thisData.activityId == thisData2.activityId){
            hasId = true;
          }
        }
        if(!hasId){
          delArr.push(thisData.activityId);
        }
      }
      return delArr;
    },
    submit(){
      var self = this;



      if(self.fromValidate.validate()){
        $.ajax({
          url: 'https://cms.localpanda.com/cms/product/activity/binding/',
          type: 'POST',
          dataType: 'json', //如果跨域用jsonp
          contentType: 'application/json',
          data: JSON.stringify(this.idList),
          success:function(data){

            if(data.succeed){
              self.$message({
                message: '设置成功！',
                type: 'success'
              });
              setTimeout(function(){
                location.reload();
              },1000);
            }else{
              self.$message.error('设置失败，请重试!!');
            }
          },
          error:function(){
            self.$message.error('设置失败，请重试!!');
          }
        });	
      
      }

      
      

    }
  },
  mounted(){
    var self = this;
    $.ajax({
      url: 'https://cms.localpanda.com/cms/product/GUIDE_SERVICE/'+this.activityId+'/activity/binding/list',
      type: 'GET',
      dataType: 'json', //如果跨域用jsonp
      contentType: 'application/json',
      success:function(data){
        if(data && data.length){
          self.idList = data;
          self.defaultList = JSON.parse(JSON.stringify(data));
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
        margin-bottom: 20px;
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
