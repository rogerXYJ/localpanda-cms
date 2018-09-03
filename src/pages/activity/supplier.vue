<template>
  <div class="cms-page">
    <!-- 侧边栏导航，activeTitle传入1-1的格式，即可展开并高亮对应的导航 -->
    <activityAside :activeTitle="'1-8'"></activityAside>

    <div class="cms-main">

      <h3 class="text_c">供应商信息管理</h3>
      

      <el-form label-width="200px">
        
        <el-form-item label="当前产品供应商选择：">
          <el-checkbox-group v-model="supplier">
            <el-checkbox v-for="(items,index) in supplierAll" :label="items.id" :value="items.id" :key="index">{{items.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>

      </el-form>

      <div class="text_c" v-if="supplierAll.length">
        <el-button type="primary" @click="submit">提交</el-button>
      </div>
      

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
  

export default {
  name: 'product_pic',
  components: {
    activityAside
  },
  data () {
    let activityId = this.$route.query.id;

    return {
      
      
      showDialogTip : false,
      dialogTipTxt : '',

      activityId: activityId,

      supplier:[],
      supplierAll:[]
    }


  },
  computed:{
    
  },
  
  methods:{
    dialogTxt(txt){
      this.showDialogTip = true;
      this.dialogTipTxt = txt;
    },
    submit(){
      var self = this;
      $.ajax({
        url: 'https://cms.localpanda.com/cms/product/activity/supplier',
        type: 'POST',
        dataType: 'json', //如果跨域用jsonp
        contentType: 'application/json',
        data: JSON.stringify({
          "objectType": "ACTIVITY",
          "objectId": this.activityId,
          "supplierIds": this.supplier
        }),
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
  },
  mounted(){
    var self = this;
    //编辑和新增
    $.ajax({
      url: 'https://cms.localpanda.com/cms/product/activity/'+this.activityId+'/supplier/list',
      type: 'GET',
      dataType: 'json', //如果跨域用jsonp
      success:function(data){

        if(data.allSupplierInfo.length){
          self.supplierAll = data.allSupplierInfo;
          var supplierNames = data.supplierNames;
          var supplierIds = [];
          for(var i=0;i<self.supplierAll.length;i++){
            var thisData = self.supplierAll[i];
            for(var j=0;j<supplierNames.length;j++){
              if(thisData.name == supplierNames[j]){
                supplierIds.push(thisData.id);
                break;
              }
            }
          }
          self.supplier = supplierIds;
        };
        
      },
      error:function(){
        
      }
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
<style lang="scss" scoped>
  
  .cms-main{
    .el-checkbox{
      margin-right: 30px;
      margin-left: 0!important;
      min-width: 300px;
    }
  }
  
</style>
