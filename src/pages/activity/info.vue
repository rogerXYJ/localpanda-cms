<template>
  <div class="cms-page">
    <!-- 侧边栏导航，activeTitle传入1-1的格式，即可展开并高亮对应的导航 -->
    <cmsAside :activeTitle="activeTitle"></cmsAside>

    <div class="cms-main">
      <h3 class="text_c">基本信息</h3>

      <p v-show="showPageTip">此ID暂无数据！</p>
      <div>
        
        <el-form ref="addForm" label-width="150px">
          <el-form-item label="产品ID：" required>
            <span>123132</span>
            
            <!-- <a class="fr el-button el-button--primary mr20" @click="bindChild" v-show="pageId">关联子项</a>
            <a class="fr el-button el-button--primary mr20" :href="'/lp/keyword/child?id='+pageId" v-show="pageId">查看子项</a> -->
            
          </el-form-item>
          <el-form-item label="产品标题：" required>
            <el-input></el-input>
          </el-form-item>
          

          <el-form-item label="产品类型：" required>
            Day Trips
          </el-form-item>

          <el-form-item label="服务类型：" required>
            <el-radio v-model="pageData.serviceType" label="Private">Private</el-radio>
            <el-radio v-model="pageData.serviceType" label="Group">Group</el-radio>
          </el-form-item>
          
          <el-form-item label="交通类型：" required>
            <el-select v-model="pageData.trafficType" placeholder="请选择交通类型">
              <el-option label="Walking" value="Walking">Walking</el-option>
              <el-option label="Biking" value="Biking">Biking</el-option>
            </el-select>
          </el-form-item>
          

          <!-- <div class="hr"></div> -->

          <el-form-item label="活动主题：" required>
            
            <el-checkbox-group v-model="pageData.tourType">
              <el-checkbox v-for="items in pageData.tourTypeArr" :label="items" :key="items">{{items}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>


          <el-form-item label="活动地点：" required>
            <el-button type="primary" plain @click="addDestination">添加</el-button>
            <dl class="change_type_list">
              <dd>
                <p class="destination_change"><span v-for="items in pageData.destinations" :key="items">{{items}}</span></p>
              </dd>
            </dl>
          </el-form-item>

          <el-form-item label="兴趣点：" required>
            <el-button type="primary" plain @click="addAttractions">添加</el-button>
            <dl class="change_type_list" v-for="item in attractionsCity" v-if="pageData.attractions[item] && pageData.attractions[item].length">
              <dt>{{item}}</dt>
              <dd>
                <p class="change_text"><span v-for="items in pageData.attractions[item]" :key="items">{{items}}</span></p>
              </dd>
            </dl>
          </el-form-item>
          

          

          <el-form-item>
            <el-button type="primary" @click="submitForm('addForm')">{{pageId?'修改基本信息':'新增基本信息'}}</el-button>
          </el-form-item>

        </el-form>
        
       
        <!-- 选择活动地点弹窗 -->
        <el-dialog title="选择活动地点" :visible.sync="destinationDialogShow" width="800px" class="destination_dialog">
          <el-checkbox-group v-model="destinationDialogChange">
            <el-checkbox v-for="city in destinationAll" :label="city" :key="city">{{city}}</el-checkbox>
          </el-checkbox-group>

          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="destination_change">确 定</el-button>
          </span>
        </el-dialog>

        <!-- 选择兴趣点弹窗 -->
        <el-dialog title="选择兴趣点" :visible.sync="attractionsDialogShow" width="800px" class="destination_dialog">

          所属城市:
          <el-select v-model="attractionsCityValue" placeholder="请选择所属城市">
            <el-option
              v-for="item in attractionsCity" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
          <el-checkbox-group v-model="attractionsDialogChange" class="mt20">
            <el-checkbox v-for="(items,index) in attractionsAll.Shanghai" :label="items" :key="index">{{items}}</el-checkbox>
          </el-checkbox-group>

          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="attractions_change">确 定</el-button>
          </span>
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
  

export default {
  name: 'tpl1',
  components: {
    cmsAside
  },
  data () {
    let urlQuery = this.$route.query;

    return {
      //页面配置
      title : 'LP管理-新增/编辑关键词',
      keywords: '',
      description: '',
      activeTitle: '4-1',

      showPageTip : false,
      dialogTip : '',
      showDialogTip : false,
      dialogTipTxt : '',

      pageId: urlQuery.id,


      destinationAll:['Shanghai','Beijing'],
      destinationDialogChange:[],
      destinationDialogShow:false,

      attractionsCity:['Shanghai','Beijing','Chengdu'],
      attractionsCityValue:'',
      attractionsAll:{
        Shanghai:['The Bund','Yu Garden','French Concession'],
        Beijing:['The Bund','Yu Garden','French Concession'],
      },
      attractionsDialogChange:[],
      attractionsDialogShow:true,

      pageData:{
        serviceType: 'Private',
        trafficType: '',
        tourType: [],
        tourTypeArr: ['Landmarks','City Tour','Food','Old Neighborhood','Architecture'],
        destinations: [],
        attractions: {
          Shanghai:['The Bund','Yu Garden'],
          Beijing:['The Bund'],
        }
      }
      



    }
  },
  computed:{
    
  },
  mounted(){
    var self = this;
    
    //请求编辑数据
    if(this.pageId){

      $.ajax({
        url: 'https://api.localpanda.com/api/content/landingpage/info/'+this.pageId,
        type: 'GET',
        dataType: 'json', //如果跨域用jsonp
        contentType: 'multipart/form-data',
        success:function(data){
          
         
        },
        error:function(){
          
        }
      });	

      
    }else{
      
    }

  },
  methods:{
    changeImg(e){
      
    },
    addDestination(){
      this.destinationDialogShow =true;
    },
    destination_change(){
      this.pageData.destinations = this.destinationDialogChange;
      this.destinationDialogShow = false;
    },
    addAttractions(){
      this.attractionsDialogShow =true;
    },
    attractions_change(){
      this.pageData.attractions[this.attractionsCityValue] = this.attractionsDialogChange;
      this.attractionsDialogChange = [];
      this.attractionsDialogShow = false;
    },
    submitForm(){

    }
  },
  watch:{
    
  },
  head(){
    return {
      title: this.title
    }
  }
}

</script>




<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .cms-main{
    .change_type_list{
      margin-top: 10px;
      dt{
        font-size: 16px;
        font-weight: bold;
      }
      p{
        font-size: 14px;
        span{ margin-right: 20px;}
      }
    }
  }
  
</style>
