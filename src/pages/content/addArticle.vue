<template>
  <div class="cms-page">
    <!-- 公共导航，activeTitle用来设置导航高亮位置,第几个导航，第几个索引 -->
    <cmsAside :activeTitle="'2-1'"></cmsAside>

    <div class="cms-main">
      <h3 class="text_c fs40">Add new article</h3>
      <el-form label-width="80px" class="addarticle-form">
        <el-form-item label="title" required>
            <el-input v-model="title" id="title"></el-input>
        </el-form-item>
        <el-form-item label="keywords">
            <el-input v-model="keywords"></el-input>
        </el-form-item>
        <el-form-item label="description">
            <el-input v-model="description"></el-input>
        </el-form-item>
        <el-form-item label="content" required>
        <UE :defaultContent="defaultContent" :config="ueConfig" :id="ueId" ref="ue"></UE>
        <!-- <UE :config="ueConfig" :id="ueName1" ref="ue"></UE> -->
        </el-form-item>
        <el-form-item>
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
      title : '',
      keywords: '',
      description: '',
      content : '',

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
    this.ue = this.$refs.ue;
    

  },
  methods: {
    reloadPage(){
      
        
    },
    confirm(){

      this.showDialogTip = false;

      if(this.dialogTipTxt != 'error'){
        this.title = '';
        this.keywords = '';
        this.description = '';
        this.content = '';
        this.ue.editor.setContent('');
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

      this.content = htmlContent;
      
      if(this.title==''){
          $('#title').focus();
          return;
      }else if(htmlContent==''){
          ue.editor.focus();
          return;
      }
      //提交数据
      self.isLoading = true;
      

      //document.getElementById("myForm").submit();
      
      $.ajax({
          url: 'https://cms.localpanda.com/cms/travel/article/commit',//https://cms.localpanda.com/cms/travel/article/commit
          type: 'POST',
          contentType: 'application/x-www-form-urlencoded',
          data: {
              title: this.title,
              keywords: this.keywords,
              description: this.description,
              content: htmlContent,
          },
          success:function(data){
              if(data.succeed){
                  self.dialogTipTxt = 'success!  ID：<a target="_blank" href="https://www.localpanda.com/travel/article/'+data.response+'">'+data.response+'</a>，Click ID to view the article！';
                  self.showDialogTip = true;
                  self.isLoading = false;
              }
              
          },
          error: function () {
              self.dialogTipTxt = 'error';
              self.showDialogTip = true;
              self.isLoading = false;
          }
      });	
    }
  }
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.modal-body a{ color: #09c;}
</style>
