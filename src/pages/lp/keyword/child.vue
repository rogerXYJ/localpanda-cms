<template>
  <div class="cms-page">
    <!-- 侧边栏导航，activeTitle传入1-1的格式，即可展开并高亮对应的导航 -->
    <cmsAside :activeTitle="activeTitle"></cmsAside>

    <div class="cms-main" v-show="showPage">
      <h3 class="text_c">关键词子项管理</h3>

      <!-- 筛选 -->
      <el-form class="mt40" label-width="130px">
        
        

        <el-form-item label="所属关键词：">
          <el-badge>{{keywords}}</el-badge>
          <el-badge><a class="btn_text" :href="'/lp/keyword/tpl'+pageLevel+'?id='+pageId">编辑</a></el-badge>
        </el-form-item>
        
        <el-form-item label="目的地：">
          <el-badge>{{destination}}</el-badge>
          <el-badge class="fr"><a class="el-button el-button--primary" @click="bindChild">关联新子项</a></el-badge>
        </el-form-item>
        
      </el-form>
      
      

      <div class="hr"></div>

      <!-- 表格 -->
      <div class="keyword-table-box" v-show="tableShow">
        <el-table
          :data="tableData.list"
          border
          empty-text="没有匹配数据！！！"
          class="keyword-table">
          <el-table-column prop="id" label="ID" width="50"></el-table-column>
          <el-table-column prop="keywords" label="关键词"></el-table-column>
          <el-table-column prop="destination" label="目的地" width="120"></el-table-column>
          <el-table-column prop="binding" label="优先级" width="120">
            <template slot-scope="scope">
              <el-input type="text" class="w50 mr20" v-model="scope.row.binding.ranking" @blur="rankingBlur"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" width="200"></el-table-column>
          <el-table-column label="操作" width="180">
            <template slot-scope="scope">
              <a class="btn_text" :href="'/lp/keyword/tpl'+scope.row.level+'?id='+scope.row.id">编辑</a>
              <a class="btn_text" @click="removeBind(scope.row,scope.$index)">解除</a>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页 -->
        <el-pagination class="mt20" background layout="prev, pager, next" :page-size="tableData.pageLength" :total="tableData.length"></el-pagination>
      </div>

      <!-- 新增关键词 -->
      <!-- <el-dialog title="请先选择您要创建的关键词适用模版" :visible.sync="addKeyword.showAddKeyword">
        <el-form :model="addKeyword.rules" label-width="80px" label-position="left">
          <el-form-item label="模版 ：" prop="resource" required>
            <el-radio-group v-model="addKeyword.resource">
              <el-radio v-for="resourceItem in addKeyword.resourceArr" :key="resourceItem" :label="resourceItem"></el-radio>
            </el-radio-group>
          </el-form-item>
          <div class="text_c red" v-show="addKeyword.resourceTip">请选择一项模版</div>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addKeyword.showAddKeyword = false">取 消</el-button>
          <el-button type="primary" @click="onAddKeywordConfirm">确 定</el-button>
        </div>
      </el-dialog> -->
      <el-dialog title="关联子项" :visible.sync="showDialog" width="1200px" class="bind_dialog">

        <el-dialog
        width="40%"
        title="设置该子项优先级"
        :visible.sync="showDialogLever"
        append-to-body>
          <el-form :model="bindForm" :rules="bindRules" ref="bindForm" label-width="140px" class="demo-ruleForm">
            <el-form-item label="该子项优先级" prop="ranking">
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
</template>

<script>
import cmsAside from '@/components/common/cmsAside.vue';
import {urlData} from '@/assets/js/base';


export default {
  name: 'child1',
  components: {
    cmsAside
  },
  data () {

    let urlQuery = this.$route.query;
    
    return {
      //页面配置
      title : 'LP管理-关键词子项管理',
      keywords: 'LP管理-关键词子项管理',
      description: 'LP管理-关键词子项管理',
      activeTitle: '1-1', //导航高亮位置
      showPage : false,
      tableShow : false,
      showDialog : false,
      showDialogLever : false,
      showDialogTip : false,
      dialogTipTxt : '',

      pageLevel : '',
      pageId : urlQuery.id,
      keywords : '',
      destination : '',
      


      //数据操作
      formInline: {
        valid : '',
        destination : '',
        keywords: ''
      },

      //表格数据
      tableData:{
        list : [],
        pageLength : 20,
        length: 1
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
      }
    }
  },
  computed:{
    
  },
  mounted(){
    var self = this;
    //更新状态信息
    self.showPage = true;
    

    this.getChildList();


  },
  methods:{
    getLevel(number){
      return ['外层模版','其他/中层','底层模版'][number-1];
    },
    dialogTxt(txt){
      this.showDialogTip = true;
      this.dialogTipTxt = txt;
    },
    removeBind(row,index){
      var removebind = confirm('你确定要解绑吗？');
      if(!removebind){
        return;
      }
      
      var self = this;
      let param = new FormData()  // 创建form对象
      param.append('id', row.binding.id)  // 通过append向form对象添加数据
      

      $.ajax({
        url: 'https://cms.localpanda.com/cms/content/landingpage/binding/delete/'+row.binding.id,
        type: 'DELETE',
        contentType: 'application/json', //如果跨域用jsonp
        success:function(data){
          if(data.succeed){
            self.tableData.list.splice(index,1);
          }else{
            self.dialogTxt('解除失败!');
          }
        },
        error:function(){
          self.dialogTxt('网络异常!');
        }
      });	

    },
    bindChild(){
      this.showDialog = true;
    },
    rankingBlur(){
      //设置优先级
      // this.axios.post('https://cms.localpanda.com/cms/content/landingpage/binding/commit',param,{
      //   headers: {
      //     'Content-Type': 'application/x-www-form-urlencoded;'
      //   }
      // }).then(function(response) {
      //   if(response.status == 200 && response.data.succeed){
          
      //     self.bindTableData.list[bindIndex].isbind = true;
      //     self.showDialogLever = false;
      //     console.log(123);

      //   }
      // }, function(response) {
      //   //this.isSubmiting = false;
      // });
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
      //绑定子模版
      $.ajax({
        url: 'https://cms.localpanda.com/cms/content/landingpage/binding/commit',
        type: 'POST',
        dataType: 'json', //如果跨域用jsonp
        contentType: false,
        processData: false,
        data: param,
        success:function(data){
          
          if(data.succeed){
            self.bindTableData.list[bindIndex].isbind = true;
            self.showDialogLever = false;

            //重刷关联列表数据
            self.getBindList();
          }

        },
        error:function(){
          
        }
      });	

    },
    getChildList(){



      var self = this;

      //请求基本信息
      $.ajax({
        url: 'https://cms.localpanda.com/cms/content/landingpage/info/'+this.pageId,
        type: 'GET',
        dataType: 'json', //如果跨域用jsonp
        success:function(data){
          
          self.keywords = data.keywords;
          self.destination = data.destination;
          self.formInline.level = data.level+1;
          self.pageLevel = data.level;

        },
        error:function(){
          self.dialogTxt('基本信息查询失败!');
        }
      });	

      //渲染关联列表
      this.getBindList();
    },
    //渲染关联列表
    getBindList(){
      var self = this;
      //请求关联列表
      $.ajax({
        url: 'https://cms.localpanda.com/cms/content/landingpage/children/'+this.pageId,
        type: 'GET',
        dataType: 'json', //如果跨域用jsonp
        success:function(data){
          
          self.tableData.list = data;
          self.tableShow = true;

        },
        error:function(){
          self.dialogTxt('关联列表查询失败!');
        }
      });	

    },
    onSubmit(){
      var self = this;
      var searchData = this.formInline;
      searchData.id = this.pageId;

      
      if(!searchData.destination && !searchData.keywords){
        self.dialogTxt('查询失败，请输入目的地或关键词!');
        return;
      }

      $.ajax({
        url: 'https://cms.localpanda.com/cms/content/landingpage/info',
        type: 'POST',
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
    onAddKeywordBtn(){
      //清空当前选中状态
      this.addKeyword.resource = '';
      //显示新增关键词弹窗
      this.addKeyword.showAddKeyword = true;
    },
    onAddKeywordConfirm(){
      var keyData = this.addKeyword;
      //新增关键词选择模版检测
      if(!keyData.resource){
        keyData.resourceTip = true;
        return;
      }
      //成功跳转新增关键词页面
      location.href = '/lp/keyword/tpl'+(keyData.resourceArr.getIndex(keyData.resource)+1);
    },
    handleCurrentChange(val) {
      console.log(`每页 ${val} 条`);
    },
  },
  watch:{
    
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
<style lang="scss" scoped>
  .el-form--inline .el-form-item{
    margin-right: 20px;
  }
  .el-form-min .el-form-item__content{ width:100px;}
  .keyword-table{ 
    margin-top: 20px;
    width: 100%;
    
  }
  .keyword-table-tip{
    text-align: center;
    padding: 20px 0;
  }
  .btn_text{ 
    margin-left: 30px;
  }
  .bind_dialog .el-dialog__body{ 
    padding-top: 0;
    padding-bottom: 50px;
  }
</style>
