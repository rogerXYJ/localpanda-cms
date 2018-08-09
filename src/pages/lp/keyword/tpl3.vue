<template>
  <div class="cms-page">
    <!-- 侧边栏导航，activeTitle传入1-1的格式，即可展开并高亮对应的导航 -->
    <cmsAside :activeTitle="activeTitle"></cmsAside>

    <div class="cms-main">
      <h3 class="text_c">新增关键词</h3>
      <p v-show="showPageTip">此ID暂无数据！</p>


      <div v-show="showPage">
        <el-form ref="addForm" :model="addForm" label-width="150px" :rules="addFormRules" :show-message="true">
          <el-form-item label="模  版：" required>
            <span>{{templateName}}</span>
          </el-form-item>
          <el-form-item label="关键词：" required prop="keywords">
            <el-input v-model="addForm.keywords"></el-input>
          </el-form-item>
          <el-form-item label="目的地：" required prop="destination">
            <el-select v-model="addForm.destination" placeholder="请选择目的地">
              <el-option label="Shanghai" value="Shanghai"></el-option>
              <el-option label="Beijing" value="Beijing"></el-option>
              <el-option label="Chengdu" value="Chengdu"></el-option>
              <el-option label="Xi'an" value="Xi'an"></el-option>
              <el-option label="Guilin" value="Guilin"></el-option>
            </el-select>
          </el-form-item>

          <div class="hr"></div>

          <el-form-item label="标   题：" prop="title">
            <el-input v-model="addForm.title"></el-input>
          </el-form-item>

          <el-form-item label="描   述：" prop="description" v-show="addFormRules.description">
            <el-input v-model="addForm.description" type="textarea" :autosize="{ minRows: 6, maxRows: 6 }"></el-input>
          </el-form-item>

          <div class="hr"></div>

          <div class="upload_box">
            <el-form-item label="头图图片：" prop="file" v-show="addFormRules.file">
              <img width="80%" :src="addForm.photo.url" alt="">
              <input type="file" @change="changeImg" accept="image/*">
            </el-form-item>
            <el-form-item label="图片描述：">
              <el-input v-model="addForm.content" v-show="!pageId"></el-input>
              <el-input v-model="addForm.photo.content" v-show="pageId"></el-input>
            </el-form-item>
            <el-form-item v-show="pageId">
              <el-button type="primary" plain @click="editPhoto">修改图片和描述</el-button>
            </el-form-item>
          </div>


          <div class="hr"></div>

          <el-form-item label="导向产品标题：" prop="linkText" v-show="addFormRules.linkText">
            <el-input v-model="addForm.linkText"></el-input>
            <p class="c_999">如：View all food activities</p>
          </el-form-item>

          <el-form-item label="导向产品URL：" prop="linkUrl" v-show="addFormRules.linkUrl">
            <el-input v-model="addForm.linkUrl"></el-input>
            <p class="c_999">如：https://www.localpanda.com/activity/list/Shanghai?opctions=Food</p>
          </el-form-item>

          <el-form-item label="推荐产品：" prop="productIds" v-show="addFormRules.productIds">
            <el-input v-model="addForm.productIds"></el-input>
            <p class="c_999">如：11111,11112,11113</p>
          </el-form-item>        

          <el-form-item>
            <el-button type="primary" @click="submitForm('addForm')">{{pageId?'修改关键词':'新增关键词'}}</el-button>
          </el-form-item>

        </el-form>



        <!-- 文字提示 -->
        <el-dialog title="温馨提示" :visible.sync="showDialogTip" width="500px" class="bind_dialog">
          <p>{{dialogTipTxt}}</p>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="showDialogTip = false">确 定</el-button>
          </span>
        </el-dialog>
      
      
      </div>

    </div>

    

    

  </div>
</template>

<script>
import cmsAside from '@/components/common/cmsAside.vue';
import {urlData} from '@/assets/js/base';


  

export default {
  name: 'tpl3',
  components: {
    cmsAside
  },
  data () {
    let urlQuery = this.$route.query;

    return {
      //页面配置
      title : 'LP管理-新增/编辑关键词',
      keywords: 'LP管理-新增/编辑关键词',
      description: 'LP管理-新增/编辑关键词',
      activeTitle: '1-1', //导航高亮位置
      showPage : false,
      showPageTip : false,
      dialogShow : false,
      dialogTip : '',
      showDialogTip : false,
      dialogTipTxt : '',

      pageId : urlQuery.id,
      
      addForm : {
        level : 3,
        keywords : '',
        destination : '',
        valid : 1,

        title : '',
        description : '',

        file : '',
        content : '',

        photo : {
          photoId : '',
          url : '',
          content : ''
        },
        linkUrl : '',
        linkText : '',
        productIds : ''
      },

      addFormRules: {
        keywords: { required: true, message: '请输入关键词', trigger:'blur'},
        destination: { required: true, message: '请选择目的地', trigger:'blur'},
        title: { required: true, message: '请输入标题', trigger:'blur'},
        description: { required: true, message: '请输入描述', trigger: 'blur'},
        file: { required: false, message: '请选择头图', trigger: 'change,blur'},
        imgAlt: { required: false, message: '请选择头图', trigger: 'blur'},
        linkText: { required: false, message: '请输入导向产品标题', trigger: 'blur'},
        linkUrl: { required: false, message: '请输入导向产品URL', trigger: 'blur'},
        productIds: { required: false, message: '请输入导向产品URL', trigger: 'blur'}
      }

    }
  },
  computed:{
    templateName(){
      return ['外层模版','其他/中层','底层模版'][this.addForm.level-1];
    }
  },
  mounted(){
    var self = this;

    //请求编辑数据
    if(this.pageId){

      $.ajax({
        url: 'https://cms.localpanda.com/cms/content/landingpage/info/'+this.pageId,
        type: 'GET',
        dataType: 'json', //如果跨域用jsonp
        contentType: 'multipart/form-data',
        success:function(data){
          
          if(!data.photo){
            data.photo = {
              photoId : '',
              url : '',
              content : ''
            }
          }
          self.addForm = data;
          //如果是编辑页面 头图可以不验证
          if(self.addFormRules.file.required){
            self.addFormRules.file.required = self.pageId?false:true;
          }
          self.showPage = true;
        },
        error:function(){
          self.showPage = false;
          self.showPageTip = true;
        }
      });	

    }else{
      self.showPage = true;
    }

  },
  methods:{
    changeImg(e){
      var self = this;
      
      self.addForm.file = e.target.files.item(0);

      //change后校验
      this.$refs.addForm.validateField('file');
    },
    dialogTxt(txt){
      this.showDialogTip = true;
      this.dialogTipTxt = txt;
    },
    editPhoto(){
      var self = this;
      var formData = {
        objectId : this.pageId,
        objectType : 'LANDING_PAGE',
        content : self.addForm.photo.content,
        file : self.addForm.file
      };
      let param = new FormData()  // 创建form对象
      for(let key in formData){
        param.append(key, formData[key])  // 通过append向form对象添加数据
      }
      //编辑和新增
      $.ajax({
        url: 'https://cms.localpanda.com/cms/public/photo/update',
        type: 'POST',
        dataType: 'json', //如果跨域用jsonp
        data: param,
        contentType: false,
        processData: false,
        success:function(data){
          var resData = data;
          if(resData.succeed){
            self.dialogTxt('修改成功！');
          }else{
            self.dialogTxt('更新失败，请确认是否选择图片!');
          }
        },
        error:function(){
          self.dialogTxt('更新失败，请确认是否选择图片!');
        }
      });	

    },


    submitForm(formName){
      var self = this;
      //校验
      this.$refs[formName].validate((valid) => {
        
        if (valid) {//成功
          
          let formData = this.addForm;
          delete formData.createTime;//删除属性
          delete formData.photo;//删除属性
          //新增请求
          let postUrl = 'https://cms.localpanda.com/cms/content/landingpage/info/commit',
            contentType = 'multipart/form-data; charset=UTF-8';
          
          //编辑请求
          if(self.pageId){
            postUrl = 'https://cms.localpanda.com/cms/content/landingpage/info/update';
            contentType = 'application/x-www-form-urlencoded; charset=UTF-8';
          }
          
          let param = new FormData()  // 创建form对象
          for(let key in formData){
            param.append(key, formData[key])  // 通过append向form对象添加数据
          }
          formData = param;

          //编辑和新增
          $.ajax({
            url: postUrl,
            type: 'POST',
            dataType: 'json', //如果跨域用jsonp
            data: formData,
            contentType: false,
            processData: false,
            success:function(data){
              var resData = data;
              if(resData.succeed){
                if(!self.pageId){
                  location.href = '/lp/keyword/tpl3?id='+resData;
                }else if(self.pageId){
                  location.reload();
                }
              }else{
                alert('参数错误！');
              }
            },
            error:function(){
              alert('请求失败！');
            }
          });	

        } else {//失败
          return false;
        }
      });
    }
  },
  watch:{
    'addForm.content':{
      handler(val,oldVal){
        if(val!=oldVal && !this.pageId){
          this.addForm.photo.content = val;
        }
      }
    }
  },
  head(){
    return {
      title: this.title,
      meta: [{
        name: "keywords",
        content: this.keywords
      },
      {
        name: "description",
        content: this.description
      }]
    }
  }
}

</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .el-form-item{
    margin-bottom: 30px;
  }
  .upload_box{ 
    padding: 20px 0 5px;
    background-color: #f2f2f2;
    margin-bottom: 30px;
  }
</style>
