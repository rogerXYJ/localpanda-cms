<template>
  <div class="cms-page">
    <!-- 侧边栏导航，activeTitle传入1-1的格式，即可展开并高亮对应的导航 -->
    <cmsAside :activeTitle="'4-1'"></cmsAside>

    <div class="cms-main">
      <h3 class="text_c">活动产品查询</h3>

      


      <!-- 筛选 -->
      <el-form :inline="true" :model="formInline" class="mt40 search_form" label-width="90px">
        <el-form-item label="产品ID">
          <el-input v-model="formInline.activityId" placeholder="请输入产品ID"></el-input>
        </el-form-item>


        <el-form-item label="产品品类">
          <el-select v-model="formInline.category" placeholder="请选择产品品类">
            <el-option label="不限" value=""></el-option>
            <el-option :label="item" :value="item" v-for="item in addActivity.categoryAll" :key="item"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item class="ml30">
          <el-button @click="onAddActivityBtn" type="primary" plain>新增产品</el-button>
        </el-form-item>

        

        <el-form-item label="产品标题" class="block">
          <el-input class="w540" v-model="formInline.title" placeholder="请输入产品标题"></el-input>
        </el-form-item>

        <el-form-item label="服务类型">
          <el-select v-model="formInline.groupType" placeholder="请选择服务类型">
            <el-option label="不限" value=""></el-option>
            <el-option label="Private" value="Private"></el-option>
            <el-option label="Group" value="Group"></el-option>
          </el-select>
        </el-form-item>
        

        <el-form-item label="目的地">
          <el-select v-model="formInline.destination" placeholder="请选择目的地">
            <el-option label="不限" value=""></el-option>
            <el-option :label="items.name" :value="items.name" v-for="(items,index) in destinationsAll" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <br>
        <el-form-item label="状态">
          <el-select v-model="formInline.valid" placeholder="请选择状态">
            <el-option label="不限" value=""></el-option>
            <el-option label="有效" :value="1"></el-option>
            <el-option label="无效" :value="0"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="供应商">
          <el-select v-model="formInline.supplierId" placeholder="请选择供应商">
            <el-option label="不限" value=""></el-option>
            <el-option :label="item.name" :value="item.id" v-for="(item,index) in supplierAll" :key="index"></el-option>
          </el-select>
        </el-form-item>

        <br>
        
        <el-form-item label=" ">
          <el-button @click="onSubmit" type="primary">查询</el-button>
        </el-form-item>

        

        <p class="red fs14" v-show="searchTip">服务器链接错误！</p>
      </el-form>

      

      <!-- 表格 -->
      <div class="keyword-table-box" v-show="tableShow">
        <el-table
          :data="tableData.list"
          border
          empty-text="没有匹配数据！！！"
          class="keyword-table">
          <el-table-column prop="activityId" label="ID" width="90"></el-table-column>
          <el-table-column prop="title" label="活动标题"></el-table-column>
          <el-table-column prop="destinations" label="目的地" width="200">
            <template slot-scope="scope">
              {{scope.row.destinations.join('，')}}
            </template>
          </el-table-column>
          <el-table-column prop="category" label="产品类型" width="180"></el-table-column>
          <el-table-column prop="groupType" label="服务类型" width="80"></el-table-column>
          <el-table-column label="状态" width="80">
            <template slot-scope="scope"><span class="opacity08" :class="{green:scope.row.valid,red:!scope.row.valid}">{{scope.row.valid?'有效':'无效'}}</span></template>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" width="120">
            <template slot-scope="scope">
              {{new Date(scope.row.createTime).toLocaleDateString()}}
            </template>
          </el-table-column>
          <el-table-column label="操作" width="140">
            <template slot-scope="scope">
              <a class="btn_text" :href="'/activity/info?id='+scope.row.activityId">编辑</a>
              <a class="btn_text" @click="setValid(scope.row,scope.$index)">{{scope.row.valid?'设为无效':'设为有效'}}</a>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页 -->
        <el-pagination class="mt20" background layout="prev, pager, next" :page-size="formInline.pageSize" :total="tableData.pageLength" @current-change="handleCurrentChange"></el-pagination>
      </div>

      

      <!-- 新增关键词 -->
      <el-dialog title="请先选择您要创建产品的类型" :visible.sync="addActivity.showAddActivity" width="1000px">
        <el-form :model="addActivity.rules" label-width="80px">
          <el-form-item label="模版 ：">
            <el-radio-group v-model="addActivity.resource">
              <el-radio v-for="resourceItem in addActivity.categoryAll" :key="resourceItem" :label="resourceItem"></el-radio>
            </el-radio-group>
          </el-form-item>
          <div class="text_c red" v-show="addActivity.resourceTip">请选择类型</div>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addActivity.showAddActivity = false">取 消</el-button>
          <el-button type="primary" @click="onAddActivityConfirm">确 定</el-button>
        </div>
      </el-dialog>


      


    </div>

    



  </div>
</template>

<script>
import cmsAside from '@/components/common/cmsAside.vue';
import {urlData} from '@/assets/js/base.js';


export default {
  name: 'index',
  components: {
    cmsAside
  },
  data () {
    return {
      
      showPage : false,
      tableShow : false,
      searchTip : false,

      addActivity : {
        showAddActivity: false, //显示新增关键词
        resourceTip : false,
        resource : '',
        categoryAll: ['Day Trip','Trans-China Trip','Regional Multi-Day Trip','Transportation','Ticket']
      },

      //数据操作
      formInline: {
        activityId : '',
        category: '',
        groupType: '',
        title:'',
        destination:'',
        valid:'',
        supplierId:'',
        pageSize:10,
        pageNum:1,
      },
      
      destinationsAll:[],
      supplierAll:[],

      //表格数据
      tableData:{
        list : [],
        pageLength : 10
      },


    }
  },
  computed:{
    
  },
  mounted(){
    var self = this;
    //更新状态信息
    self.showPage = true;
    

    $.ajax({
      url: 'https://cms.localpanda.com/cms/public/dest/list',
      type: 'POST',
      dataType: 'json', //如果跨域用jsonp
      contentType:'application/json',
      data: JSON.stringify({
        "detail":false,
        "valid":true
      }),
      success:function(data){

        if(data.length){
          self.destinationsAll = data;
        }
        

      },
      error:function(){
        
      }
    });	


    //获取供应商
    $.ajax({
      url: 'https://cms.localpanda.com/cms/product/supplier/list/all',
      type: 'GET',
      dataType: 'json', //如果跨域用jsonp
      contentType:'application/json',
      success:function(data){

        if(data.length){
          self.supplierAll = data;
        }
        

      },
      error:function(){
        
      }
    });	
    

    

  },
  methods:{
    
    setValid(row,index){
      var self = this;

      $.ajax({
        url: 'https://cms.localpanda.com/cms/product/activity',
        type: 'POST',
        dataType: 'json', //如果跨域用jsonp
        contentType:'application/json',
        data: JSON.stringify({
          activityId: row.activityId,
          valid: row.valid?0:1
        }),
        success:function(data){
          if(data){
            self.tableData.list[index].valid = self.tableData.list[index].valid==1 ? 0 : 1;
          }else{
            alert('设置失败');
          }
          

        },
        error:function(){
          alert('设置失败');
        }
      });	

      
      
    },
    loadPage(){
      var self = this;
      var postData = {};
      for(var key in this.formInline){
        var thisData = this.formInline[key];
        if(thisData || thisData===0){
          postData[key] = thisData;
        }
      }

      $.ajax({
        url: 'https://cms.localpanda.com/cms/product/activity/list',
        type: 'POST',
        dataType: 'json', //如果跨域用jsonp
        contentType:'application/json',
        data: JSON.stringify(postData),
        success:function(data){
          
          
          self.searchTip = false;
          self.tableData.list = data; //self.tableData.list.concat(data);
          //设置数据条数
          self.tableShow = true;
          //self.setLevel();
          //self.tableData.index = self.tableData.list.length;
        },
        error:function(){
          self.searchTip = true;
        }
      });

      //异步请求
      $.ajax({
        url: 'https://cms.localpanda.com/cms/product/activity/count',
        type: 'POST',
        dataType: 'json', //如果跨域用jsonp
        contentType:'application/json',
        data: JSON.stringify(postData),
        success:function(data){
          if(data){
            self.tableData.pageLength = data;
          }
          
        },
        error:function(){
          
        }
      });	
    },
    onSubmit(){
      var self = this;
      //self.tableData.list = [];
      this.loadPage();
      
    },
    onAddActivityBtn(){
      //清空当前选中状态
      this.addActivity.resource = '';
      //显示新增关键词弹窗
      this.addActivity.showAddActivity = true;
    },
    onAddActivityConfirm(){
      var keyData = this.addActivity;
      //新增关键词选择模版检测
      if(!keyData.resource){
        keyData.resourceTip = true;
        return;
      }
      //成功跳转新增关键词页面
      location.href = '/activity/add?category='+keyData.resource;
    },
    handleCurrentChange(val) {
      this.formInline.pageNum = val;
      this.loadPage();
    },
  },
  watch:{
    'addActivity.resource':{
      handler(val,oldVal){
        if(val!=oldVal || !val&&!oldVal){
          this.addActivity.resourceTip = false;
        }
      }
    }
  }
}

</script>




<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .el-form--inline .el-form-item{
    margin-right: 20px;
  }
  .el-form-min .el-form-item__content{ width:100px;}
  .search_form .el-form-item__content{ width: 217px;}
  .search_form{
    .el-form-item{
      .w540{
        width: 548px;
      }
    }
  }
  .keyword-table{ 
    margin-top: 20px;
    width: 100%;
    th{}
  }
  .keyword-table-tip{
    text-align: center;
    padding: 20px 0;
  }
  .el-radio-group{
    .el-radio{
      margin-left: 0;
      margin-right: 30px;
      line-height: 40px;
    }
  }

  
</style>
