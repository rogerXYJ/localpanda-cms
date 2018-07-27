<template>
  <div class="cms-page">
    <!-- 公共导航，activeTitle用来设置导航高亮位置,第几个导航，第几个索引 -->
    <cmsAside :activeTitle="'2-3'"></cmsAside>

    <div class="cms-main">
      <h3 class="text_c">邮件模版</h3>
      <el-form label-width="80px" class="addarticle-form">

        <el-form-item label="邮件模版" class="el-form-min">
          <el-select v-model="templateName" @change="typeChange" placeholder="请选择邮件模版">
            <el-option v-for="(item,index) in templateList" :key="index" :label="item.typeName" :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="title" v-show="showForm" required>
            <el-input v-model="templateData.title" id="title"></el-input>
        </el-form-item>
        <el-form-item label="content" v-show="showForm" required>
          <UE :defaultContent="defaultContent" :config="ueConfig" :id="ueId" ref="ue"></UE>
          <!-- <UE :config="ueConfig" :id="ueName1" ref="ue"></UE> -->
        </el-form-item>
        <el-form-item v-show="showForm">
            <el-button type="primary" @click="submit">提交</el-button>
        </el-form-item>
      </el-form>    
    </div>

    <!-- 文字提示 -->
    <el-dialog title="温馨提示" :visible.sync="showDialogTip" width="500px" class="bind_dialog" :close-on-click-modal="false" :show-close="false">
      <p v-html="dialogTipTxt"></p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirm">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import cmsAside from "@/components/common/cmsAside.vue";
import UE from "@/components/plugin/ue.vue";

export default {
  name: "addArticle",
  components: {
    cmsAside,
    UE
  },
  data() {
    return {
      templateList: [],
      templateName: '',
      templateData: '',
      // title:'',
      // content : '',
      
      showForm: false,

      isLoading : false,
      showDialogTip :false,
      dialogTipTxt:'',

      defaultContent:'',
      ueConfig:{
        initialFrameWidth: '90%',
        initialFrameHeight:400
      },
      ueId: 'ue1'
    };
  },
  mounted() {
    var self = this;

    //调用编辑器
    this.ue = this.$refs.ue;

    //列表数据
    $.ajax({
      url: 'https://cms.localpanda.com/cms/public/template/list/all',
      type: 'GET',
      //contentType: 'application/json',
      success:function(data){
        self.templateList = data;
      },
      error: function () {
        
      }
    });	

  },
  methods: {
    reloadPage(){
      
        
    },
    confirm(){

      this.showDialogTip = false;

      if(!/error|失败|错误/.test(this.dialogTipTxt)){
        location.reload();
      }
    },
    submit(){
      var self = this;

      if(this.isLoading){
          return;
      }
      
      //获取html
      var ue = this.ue;
      var htmlContent = ue.getUEContent();


      if(this.templateData.title==''){
          $('#title').focus();
          return;
      }else if(htmlContent==''){
          ue.editor.focus();
          return;
      }
      //提交数据
      self.isLoading = true;
      
      
      $.ajax({
          url: 'https://cms.localpanda.com/cms/public/template',//https://cms.localpanda.com/cms/travel/article/commit
          type: 'POST',
          contentType: 'application/json',
          data: JSON.stringify({
              typeId: this.templateData.id,
              title: this.templateData.title,
              content: htmlContent,
          }),
          success:function(data){
            if(data.succeed){
              self.dialogTipTxt = '修改成功！';
              self.showDialogTip = true;
              self.isLoading = false;
            }
          },
          error: function () {
            self.dialogTipTxt = '修改失败，请重试！或联系服务器管理员！';
            self.showDialogTip = true;
            self.isLoading = false;
          }
      });	
    },
    typeChange(value){
      for(var i=0;i<this.templateList.length;i++){
        var thisData = this.templateList[i];
        if(value == thisData.id){
        
          this.templateData = thisData;
          // this.title = thisData.title;
          // this.content = thisData.content;
          this.ue.editor.setContent(thisData.content);
        }
        
      }
    }
  },
  watch:{
    templateName:function(value){
      if(value){
        this.showForm = true;
      }
    }
  }
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.modal-body a{ color: #09c;}
</style>
