<template>
  <div class="cms-page">
    <!-- 侧边栏导航，activeTitle传入1-1的格式，即可展开并高亮对应的导航 -->
    <cmsAside :activeTitle="'1-1'"></cmsAside>

    <div class="cms-main" v-show="showPage">
      <h3 class="text_c">关键词查找</h3>

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
          <el-select v-model="formInline.valid" placeholder="请选择要查询的状态">
            <el-option label="全部" value=""></el-option>
            <el-option label="有效" value="1"></el-option>
            <el-option label="无效" value="0"></el-option>
          </el-select>
        </el-form-item>
        
        <el-form-item>
          <el-button @click="onSubmit" type="primary">查询</el-button>
        </el-form-item>

        <el-form-item class="ml20">
          <el-button @click="onAddKeywordBtn">新增关键词</el-button>
        </el-form-item>

        <p class="red fs14" v-show="searchTip">请输入目的地或关键词！</p>
      </el-form>

      

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
          <el-table-column prop="level" label="模版" width="120">
            <template slot-scope="scope"><span>{{getLevel(scope.row.level)}}</span></template>
          </el-table-column>
          <el-table-column label="状态" width="120">
            <template slot-scope="scope"><span>{{scope.row.valid?'有效':'无效'}}</span></template>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" width="200"></el-table-column>
          <el-table-column label="操作" width="140">
            <template slot-scope="scope">
              <a class="btn_text" :href="'/lp/keyword/tpl'+scope.row.level+'?id='+scope.row.id">编辑</a>
              <a class="btn_text" @click="setValid(scope.row,scope.$index)">{{scope.row.valid?'设为无效':'设为有效'}}</a>
              <!-- setValidBtnTxt(scope.row.valid) -->
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页 -->
        <el-pagination class="mt20" background layout="prev, pager, next" :page-size="tableData.pageLength" :total="tableData.length"></el-pagination>
      </div>

      

      <!-- 新增关键词 -->
      <el-dialog title="请先选择您要创建的关键词适用模版" :visible.sync="addKeyword.showAddKeyword">
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
      </el-dialog>


      


    </div>

    



  </div>
</template>

<script>
import cmsAside from '@/components/common/cmsAside.vue';
import {urlData} from '@/assets/js/base.js';


export default {
  name: 'keywordSearch',
  components: {
    cmsAside
  },
  data () {
    return {
      
      showPage : false,
      tableShow : false,
      searchTip : false,

      addKeyword : {
        showAddKeyword: false, //显示新增关键词
        resourceTip : false,
        resource : '',
        resourceArr : ['外层模版','其他/中层','底层模版'],
        rules: {
          resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ]
        }
      },

      //数据操作
      formInline: {
        valid : '',
        keywords: '',
        destination: ''
      },

      //表格数据
      tableData:{
        list : [],
        pageLength : 20,
        length: 1
      },


    }
  },
  computed:{
    
  },
  mounted(){
    var self = this;
    //更新状态信息
    self.showPage = true;
    

    

    

  },
  methods:{
    getLevel(number){
      return ['外层模版','其他/中层','底层模版'][number-1];
    },
    //更新状态信息
    setLevel(){
      var resourceArr = this.addKeyword.resourceArr;
      let tableList = this.tableData.list;
      this.tableData.list = tableList.map(function(item){
        item.level = resourceArr[item.level-1];
        return item;
      });
    },
    setValid(row,index){
      var self = this;
      var formData = {
        id : row.id,
        valid : row.valid?0:1
      };
      let param = new FormData()  // 创建form对象
      for(let key in formData){
        param.append(key, formData[key])  // 通过append向form对象添加数据
      }
      this.axios.post('https://cms.localpanda.com/cms/content/landingpage/valid/update',param,{
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      }).then(function(response) {

        if(response.status == 200){
          if(response.data.succeed){
            self.tableData.list[index].valid = self.tableData.list[index].valid==1 ? 0 : 1;
          }
        }
      
        
      }, function(response) {
        //this.isSubmiting = false;
      })
      
      
    },
    onSubmit(){
      var self = this;

      //异步请求
      $.ajax({
        url: 'https://cms.localpanda.com/cms/content/landingpage/info',
        type: 'POST',
        dataType: 'json', //如果跨域用jsonp
        contentType:'application/json',
        data: JSON.stringify(this.formInline),
        success:function(data){
          
          self.searchTip = false;
          self.tableData.list = data;
          //设置数据条数
          self.tableShow = true;
          //self.setLevel();
          self.tableData.length = self.tableData.list.length;
        },
        error:function(){
          self.searchTip = true;
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
    'addKeyword.resource':{
      handler(val,oldVal){
        if(val!=oldVal || !val&&!oldVal){
          this.addKeyword.resourceTip = false;
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
  .keyword-table{ 
    margin-top: 20px;
    width: 100%;
    th{}
  }
  .keyword-table-tip{
    text-align: center;
    padding: 20px 0;
  }
</style>
