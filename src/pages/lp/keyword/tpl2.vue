<template>
  <div class="cms-page">
    <!-- 侧边栏导航，activeTitle传入1-1的格式，即可展开并高亮对应的导航 -->
    <cmsAside :activeTitle="activeTitle"></cmsAside>

    <div class="cms-main">
      <h3 class="text_c">新增关键词</h3>
      <p v-show="showPageTip">此ID暂无数据！</p>

      <div v-show="showPage">
        <el-button type="primary" class="fr mr20 zindex9" @click="bindChild" v-show="pageId">关联子项</el-button>
        <a class="fr el-button el-button--primary mr20 zindex9" :href="'/lp/keyword/child?id='+pageId" v-show="pageId">查看子项</a>
        
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

          

          <el-form-item>
            <el-button type="primary" @click="submitForm('addForm')">{{pageId?'修改关键词':'新增关键词'}}</el-button>
          </el-form-item>

        </el-form>
        
        
        <!-- 关联子项弹窗 -->
        <el-dialog title="关联子项" :visible.sync="showDialog" width="1200px" class="bind_dialog">

          <el-dialog
          width="40%"
          title="设置该子项优先级"
          :visible.sync="showDialogLever"
          append-to-body>
            <el-form :model="bindForm" :rules="bindRules" ref="bindForm" label-width="140px" class="demo-ruleForm">
              <el-form-item label="该子项优先级">
                <el-input type="text" class="w100 mr20" v-model="bindForm.ranking" auto-complete="off"></el-input>
                <span>数值越小，排序越靠前</span>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="onBind">绑定</el-button>
              </el-form-item>
            </el-form>
            
          </el-dialog>


          <!-- 筛选 -->
          <el-form :inline="true" :model="formInline" class="mt40">

            <el-form-item label="目的地">
              <el-select v-model="formInline.destination" placeholder="请选择一个目的地">
                <el-option label="Shanghai" value="Shanghai"></el-option>
                <el-option label="Beijing" value="Beijing"></el-option>
                <el-option label="Chengdu" value="Chengdu"></el-option>
                <el-option label="Xi'an" value="Xi'an"></el-option>
                <el-option label="Guilin" value="Guilin"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="关键词">
              <el-input v-model="formInline.keywords" placeholder="关键词"></el-input>
            </el-form-item>

            <el-form-item label="状态" class="el-form-min">
              <el-select v-model="formInline.valid" placeholder="请选择状态">
                <el-option label="全部" value=""></el-option>
                <el-option label="有效" value="1"></el-option>
                <el-option label="无效" value="0"></el-option>
              </el-select>
            </el-form-item>
            
            <el-form-item>
              <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
          </el-form>

          <!-- 表格 -->
          <div class="keyword-table-box">
            <el-table
              :data="bindTableData.list"
              border
              empty-text="没有匹配数据！！！"
              class="keyword-table">
              <el-table-column prop="id" label="ID" width="50"></el-table-column>
              <el-table-column prop="keywords" label="关键词"></el-table-column>
              <el-table-column prop="destination" label="目的地" width="120"></el-table-column>
              <el-table-column prop="level" label="模版" width="120">
                <template slot-scope="scope"><span>{{getLevel(scope.row.level)}}</span></template>
              </el-table-column>
              <el-table-column label="状态" width="120">
                <template slot-scope="scope"><span>{{scope.row.valid?'有效':'无效'}}</span></template>
              </el-table-column>
              <el-table-column prop="createTime" label="创建时间" width="200"></el-table-column>
              <el-table-column label="操作" width="140">
                <template slot-scope="scope">
                  <a class="btn_text" :class="{c_999:scope.row.isbind}" @click="btnBind(scope.row.id,scope.$index)">关联</a>
                  <!-- setValidBtnTxt(scope.row.valid) -->
                </template>
              </el-table-column>
            </el-table>

            <!-- 分页 -->
            <el-pagination class="mt20" background layout="prev, pager, next" :page-size="bindTableData.pageLength" :total="bindTableData.length"></el-pagination>
          </div>


          

        </el-dialog>


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
  name: 'tpl2',
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
      activeTitle: '1-1',
      showPage : false,
      showPageTip : false,
      dialogTip : '',
      showDialogTip : false,
      dialogTipTxt : '',


      showDialog : false,
      showDialogLever : false,
      //数据操作
      formInline: {
        valid : '',
        destination : '',
        keywords: ''
      },
      //表格数据
      bindTableData:{
        list : [],
        pageLength : 20,
        length: 1
      },
      //优先级
      childId : '',
      bindIndex : '',
      bindForm:{
        ranking : 3
      },
      bindRules: {
        ranking: [
          { required: true, message: '请输入优先级', trigger: 'blur' },
        ]
      },

      pageId : urlQuery.id,
      
      addForm : {
        level : 2,
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
        linkText : ''
      },

      addFormRules: {
        keywords: { required: true, message: '请输入关键词', trigger:'blur'},
        destination: { required: true, message: '请选择目的地', trigger:'blur'},
        title: { required: true, message: '请输入标题', trigger:'blur'},
        description: { required: false, message: '请输入描述', trigger: 'blur'},
        file: { required: true, message: '请选择头图', trigger: 'change,blur'},
        imgAlt: { required: false, message: '请选择头图', trigger: 'blur'},
        linkText: { required: false, message: '请输入导向产品标题', trigger: 'blur'},
        linkUrl: { required: false, message: '请输入导向产品URL', trigger: 'blur'}
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

    //关联子项
    getLevel(number){
      return ['外层模版','其他/中层','底层模版'][number-1];
    },
    bindChild(){
      this.showDialog = true;
    },
    btnBind(childId,index){
      var self = this;

      if(self.bindTableData.list[index].isbind){
        return;
      };


      this.bindIndex = index;
      this.childId = childId;
      
      //显示子弹窗
      self.showDialogLever = true;
    },
    onSubmit(){
      var self = this;
      var searchData = this.formInline;
      searchData.id = this.pageId;

      $.ajax({
        url: 'https://cms.localpanda.com/cms/content/landingpage/info',
        type: 'POST',
        dataType: 'json', //如果跨域用jsonp
        contentType: 'application/json',
        data: JSON.stringify(searchData),
        success:function(data){
          self.bindTableData.list = data.map(function(item){
            item.isbind = false;
            return item;
          })
          //设置数据条数
          self.bindTableData.length = self.bindTableData.list.length;
        },
        error:function(){
          self.dialogTxt('查询失败，请输入目的地或关键词!');
        }
      });	

    },
    onBind(){

      var self = this;
      var bindIndex = self.bindIndex;
      

      
      var formData = {
        parentId: this.pageId,
        childId: this.childId,
        ranking : this.bindForm.ranking
      };
      let param = new FormData()  // 创建form对象
      for(let key in formData){
        param.append(key, formData[key])  // 通过append向form对象添加数据
      }

      $.ajax({
        url: 'https://cms.localpanda.com/cms/content/landingpage/binding/commit',
        type: 'POST',
        dataType: 'json', //如果跨域用jsonp
        data: param,
        contentType: false,
        processData: false,
        success:function(data){
          self.bindTableData.list[bindIndex].isbind = true;
          self.showDialogLever = false;
        },
        error:function(){
          
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
                  location.href = '/lp/keyword/tpl2?id='+resData;
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
          //self.dialogShow = true;
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
