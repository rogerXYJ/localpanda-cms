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

          <el-form-item label="出发地：" required>
            <el-button type="primary" plain @click="addDepartures">添加</el-button>
            <dl class="change_type_list">
              <dd>
                <p class="destination_change"><span v-for="items in pageData.departures" :key="items">{{items}}</span></p>
              </dd>
            </dl>
          </el-form-item>


          <el-form-item label="活动时长：" required>
            <el-input v-model="pageData.duration"></el-input>
            <el-select v-model="pageData.durationUnit" placeholder="请选择交通类型">
              <el-option label="Hours" value="Hours">Hours</el-option>
              <el-option label="Day" value="Day">Day</el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="排序顺序：" required>
            <el-input v-model="pageData.ranking"></el-input>　数值越小，排序权重越大！
          </el-form-item>

          <el-form-item label="适合儿童：" required>
            <el-radio v-model="pageData.suitableForChildren" label="Yes">Yes</el-radio>
            <el-radio v-model="pageData.suitableForChildren" label="No">No</el-radio>
          </el-form-item>

          <el-form-item label="前台可见：" required>
            <el-radio v-model="pageData.display" label="Yes">Yes</el-radio>
            <el-radio v-model="pageData.display" label="No">No</el-radio>
          </el-form-item>
          

          <div class="hr"></div>

          <el-form-item label="资审时效：" required>
            <el-input v-model="pageData.workdayConfirmCost"></el-input>　工作日资审时间　
            <el-select v-model="pageData.ConfirmCostUnit" placeholder="请选择交通类型">
              <el-option label="Hours" value="Hours">Hours</el-option>
              <el-option label="Day" value="Day">Day</el-option>
            </el-select>　超过10小时请选择按天计算
          </el-form-item>

          
          <el-form-item label="集合方式：" required>
            <el-radio v-model="pageData.pickup" label="提供接送">提供接送</el-radio>
            <el-radio v-model="pageData.pickup" label="自行前往">自行前往</el-radio>
            <div class="" v-if="pageData.pickup=='自行前往'">
              <ul class="jihe_info">
                <li v-for="(item,index) in pageData.venues">
                  <p><span class="red">*</span> 集合信息描述1</p>
                  <el-input
                    type="textarea"
                    :rows="3"
                    placeholder="请输入内容"
                    v-model="pageData.venues[index]">
                  </el-input>
                  <el-button type="primary" plain>Del</el-button><br>
                  <el-button type="danger" plain>Add</el-button>
                </li>
              </ul>
            </div>
          </el-form-item>


          <div class="hr"></div>
          

          <el-form-item label="推荐理由：" required>
            <el-input
              type="textarea"
              :rows="4"
              placeholder="请输入内容"
              v-model="pageData.recommendedReason">
            </el-input>
          </el-form-item>

          <el-form-item label="活动亮点：" required>
            <el-input
              type="textarea"
              :rows="4"
              placeholder="请输入内容"
              v-model="pageData.highlights">
            </el-input>
          </el-form-item>

          <el-form-item label="备注说明：">
            <el-input
              type="textarea"
              :rows="6"
              placeholder="请输入内容"
              v-model="pageData.notice">
            </el-input>
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


        <!-- 选择出发地弹窗 -->
        <el-dialog title="选择出发地" :visible.sync="departuresDialogShow" width="800px" class="destination_dialog">
          <el-checkbox-group v-model="departuresDialogChange">
            <el-checkbox v-for="city in departuresAll" :label="city" :key="city">{{city}}</el-checkbox>
          </el-checkbox-group>

          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="departures_change">确 定</el-button>
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
      attractionsDialogShow:false,


      departuresAll:['Shanghai','Beijing'],
      departuresDialogChange:[],
      departuresDialogShow:false,

      //venuesList: {},

      pageData:{
        serviceType: 'Private',
        trafficType: '',

        tourType: [],
        tourTypeArr: ['Landmarks','City Tour','Food','Old Neighborhood','Architecture'],

        destinations: [],

        attractions: {
          Shanghai:['The Bund','Yu Garden'],
          Beijing:['The Bund'],
        },
        departures: [],
        
        // 活动时长
        duration:3,
        durationUnit: 'Hours',

        //权重
        ranking:3,

        //是否适合儿童
        suitableForChildren: 'Yes',

        //是否前台可见
        display: 'Yes',

        //资审耗时
        workdayConfirmCost: 3,
        ConfirmCostUnit: 'Hours',

        //是否提高接送
        pickup: '提供接送',

        //集合信息
        venues: ['skjadsdjksakjdasas','bbbbbbbbbbbbb'],
        recommendedReason:'推荐理由',
        highlights:'asssssssssssssssssssss',
        notice:'aaaaaaaaaaaaaaaaaa'

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
        url: 'https://api.localpanda.com/cms/content/landingpage/info/'+this.pageId,
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
      this.destinationDialogChange = this.pageData.destinations;
    },
    destination_change(){
      this.pageData.destinations = this.destinationDialogChange;
      this.destinationDialogShow = false;
    },

    addAttractions(){
      this.attractionsDialogShow =true;
      //this.attractionsDialogChange = this.pageData.attractions[this.attractionsCityValue];
    },
    attractions_change(){
      this.pageData.attractions[this.attractionsCityValue] = this.attractionsDialogChange;
      this.attractionsDialogChange = [];
      this.attractionsDialogShow = false;
    },

    addDepartures(){
      this.departuresDialogShow =true;
      this.departuresDialogChange = this.pageData.departures;
    },
    departures_change(){
      this.pageData.departures = this.departuresDialogChange;
      this.departuresDialogShow = false;
    },

    submitForm(){

    }
  },
  watch:{
    // 'pageData.venues':function (val, oldVal) { 
    //   for(var i=0;i<val.length;i++){
    //     var thisData = val[i];
    //     this.venuesList['list'+i] = thisData;
    //   }
    // }
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
  .el-input{
    width: auto;
  }
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
    .jihe_info{
      .el-textarea{
        float: left;
        width: 70%;
      }
      .el-button{
        margin-left: 20px;
        padding: 6px 20px;
        vertical-align: top;
      }
    }
  }
  
</style>
