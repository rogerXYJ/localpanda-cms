<template>
  <div class="cms-page">
    <!-- 侧边栏导航，activeTitle传入1-1的格式，即可展开并高亮对应的导航 -->
    <activityAside :activeTitle="'1-1'"></activityAside>

    <div class="cms-main">
      <h3 class="text_c">编辑基本信息</h3>

      <!-- <p v-show="showPageTip">此ID暂无数据！</p> -->
      <div>
        
        <el-form :model="pageData" :rules="rules" ref="pageData" label-width="200px">
          <el-form-item label="产品ID：" v-if="pageId">
            <span>{{pageId}}</span>
          </el-form-item>


          <el-form-item label="产品经理（owner）：" prop="owner">
            <el-radio v-model="pageData.owner" v-for="item in ownerAll" :value="item" :label="item" :key="item"></el-radio>
          </el-form-item>


          <el-form-item label="产品标题（title）：" required prop="title">
            <el-input class="w_100b" v-model="pageData.title"></el-input>
          </el-form-item>
          

          <el-form-item label="产品类型（category）：" prop="category">
            {{pageData.category}}
          </el-form-item>
          

          <el-form-item label="服务类型（groupType）：" required prop="groupType" v-if="pageData.category!='Transportation' && pageData.category!='Ticket'">
            <el-radio v-model="pageData.groupType" label="Private">Private</el-radio>
            <el-radio v-model="pageData.groupType" label="Group">Group</el-radio>
          </el-form-item>
          
          <el-form-item label="交通类型（trafficType）：" required prop="trafficType" v-if="pageData.category!='Ticket'">
            <el-select v-model="pageData.trafficType" placeholder="请选择交通类型">
              <el-option :label="item" :value="item" v-for="item in trafficTypeAll" :key="item">{{item}}</el-option>
            </el-select>
          </el-form-item>
           <el-form-item label="交通类型（trafficType）："  v-else>
            <el-select v-model="pageData.trafficType" placeholder="请选择交通类型">
              <el-option :label="item" :value="item" v-for="item in trafficTypeAll" :key="item">{{item}}</el-option>
            </el-select>
          </el-form-item>
          

          <!-- <div class="hr"></div> -->

          <el-form-item label="活动主题（tourTypes）：" prop="tourTypes" class="bg_f5f5f5">
            
            <el-checkbox-group v-model="pageData.tourTypes">
              <el-checkbox v-for="items in tourTypeArr" :label="items" :key="items">{{items}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>


          <el-form-item label="活动地点（destinations）：" prop="destinations">
            <el-button type="primary" plain @click="addDestination">添加</el-button>
            <dl class="change_type_list">
              <dd>
                <p class="destination_change"><span v-for="items in pageData.destinations" :key="items">{{items}}</span></p>
              </dd>
            </dl>
          </el-form-item>

          <el-form-item label="兴趣点（attractions）：" class="poi_box" required prop="attractions" v-if="pageData.category!='Transportation'">
            <el-button type="primary" class="js_validate" id="btn_attractions" vType="data" vTip="请选择兴趣点" :data="JSON.stringify(pageData.attractions)" plain @click="addAttractions">添加</el-button>
            <dl class="change_type_list" v-for="(item,key) in pageData.attractions">
              <!--  v-if="pageData.attractions[item] && pageData.attractions[item].length" -->
              <dt>{{key}}</dt>
              <dd>
                <p class="change_text"><span v-for="items in item" :key="items">{{items}}</span></p>
              </dd>
            </dl>
          </el-form-item>
           <el-form-item label="兴趣点（attractions）：" class="poi_box"  v-else>
            <el-button type="primary" id="btn_attractions"  :data="JSON.stringify(pageData.attractions)" plain @click="addAttractions">添加</el-button>
            <dl class="change_type_list" v-for="(item,key) in pageData.attractions">
              <!--  v-if="pageData.attractions[item] && pageData.attractions[item].length" -->
              <dt>{{key}}</dt>
              <dd>
                <p class="change_text"><span v-for="items in item" :key="items">{{items}}</span></p>
              </dd>
            </dl>
          </el-form-item>

          <el-form-item label="出发地（departures）：" prop="departures">
            <el-button type="primary" plain @click="addDepartures">添加</el-button>
            <dl class="change_type_list">
              <dd>
                <p class="destination_change"><span v-for="items in pageData.departures" :key="items">{{items}}</span></p>
              </dd>
            </dl>
          </el-form-item>


          <el-form-item class="shichang_box" label="活动时长（duration）：" prop="duration">
            <el-input v-model="pageData.duration" @blur="hideError"></el-input>
            <el-select v-model="pageData.durationUnit" placeholder="请选择活动时长">
              <el-option label="HOURS" value="HOURS">HOURS</el-option>
              <el-option label="DAYS" value="DAYS">DAYS</el-option>
            </el-select>　超过12小时请选择按天计算
          </el-form-item>

          <el-form-item label="排序顺序（ranking）：" required prop="ranking">
            <el-select v-model="pageData.ranking" placeholder="请选择排序值">
              <el-option :label="item" :value="item" v-for="item in 10" :key="item">{{item}}</el-option>
            </el-select>
            数值越小，排序权重越大！
          </el-form-item>

          <el-form-item label="适合儿童：" required prop="suitableForChildren">
            <el-radio v-model="pageData.suitableForChildren" :label="1" :value="1">Yes</el-radio>
            <el-radio v-model="pageData.suitableForChildren" :label="0" :value="0">No</el-radio>
          </el-form-item>

          <el-form-item label="是否在列表页显示：" v-if="pageId">
            <el-radio v-model="pageData.display" :label="1" :value="1">Yes</el-radio>
            <el-radio v-model="pageData.display" :label="0" :value="0">No</el-radio>
          </el-form-item>

          <el-form-item label="行程排版风格（newType）：">
            <el-radio v-model="pageData.newType" :label="false" :value="false">旧版</el-radio>
            <el-radio v-model="pageData.newType" :label="true" :value="true">新版</el-radio>
            <span v-if="!pageData.newType" class="block">(<label class="red"> 切换到新的行程排版之前，确保严格按照时间顺序组织行程内容，并使用质量较高的行程图片. <a :href="'https://www.localpanda.com/activity/details/'+pageId+'?newStyle=1&valid=1'" target="_blank" class=" check blue" >新排版预览</a></label> )</span>
            
          </el-form-item>
        

          <div class="hr"></div>

          <el-form-item class="shenzi_box" label="资审时效：" prop="workdayConfirmCost">
            <el-input v-model="pageData.workdayConfirmCost" @blur="hideError"></el-input>
            <el-select v-model="pageData.confirmCostUnit" placeholder="请选择资审时效">
              <el-option label="HOURS" value="HOURS">HOURS</el-option>
              <el-option label="DAYS" value="DAYS">DAYS</el-option>
            </el-select>　超过10小时请选择按天计算
          </el-form-item>

          
          <el-form-item label="集合方式（pickup）：" required v-if="pageData.category!='Ticket'">
            <el-radio v-model="pageData.pickup" :value="1" :label="1">提供接送</el-radio>
            <el-radio v-model="pageData.pickup" :value="0" :label="0">自行前往</el-radio>
            <div class="jihe_info" v-if="pageData.pickup==0">
              <ul>
                <li v-for="(item,index) in pageData.venues" class="clearfix">
                  
                    <p><span class="red">*</span> 集合信息描述{{index+1}}</p>

                    <textarea vtype="text" class="el-textarea__inner js_validate" rows="3" placeholder="请输入内容"  v-model="pageData.venues[index]"></textarea>
                    <el-button type="danger" plain @click="jiheDel(index)" v-if="index!=0">Del</el-button><br>
                </li>
              </ul>
              <div class="jihe_add">
                  <el-button type="primary" plain @click="jiheAdd">Add</el-button>
              </div>
              
            </div>
          </el-form-item>
          <el-form-item label="集合方式（pickup）：" v-else>
            <el-radio v-model="pageData.pickup" :value="1" :label="1">提供接送</el-radio>
            <el-radio v-model="pageData.pickup" :value="0" :label="0">自行前往</el-radio>
            <div class="jihe_info" v-if="pageData.pickup==0">
              <ul>
                <li v-for="(item,index) in pageData.venues" class="clearfix">
                  
                    <p>集合信息描述{{index+1}}</p>

                    <textarea vtype="text" class="el-textarea__inner" rows="3" placeholder="请输入内容"  v-model="pageData.venues[index]"></textarea>
                    <el-button type="danger" plain @click="jiheDel(index)" v-if="index!=0">Del</el-button><br>
                </li>
              </ul>
              <div class="jihe_add">
                  <el-button type="primary" plain @click="jiheAdd">Add</el-button>
              </div>
              
            </div>
          </el-form-item>
          


          <div class="hr"></div>
          

          <el-form-item label="推荐理由（recommendedReason）：" required prop="recommendedReason">
            <el-input
              type="textarea"
              :rows="4"
              placeholder="请输入内容"
              v-model="pageData.recommendedReason">
            </el-input>
          </el-form-item>

          <el-form-item label="活动亮点（highlights）：" required prop="highlights">
            <el-input
              type="textarea"
              :rows="4"
              placeholder="请输入内容"
              v-model="pageData.highlights">
            </el-input>
          </el-form-item>

          <el-form-item label="注意事项（notice）：">
            <el-input
              type="textarea"
              :rows="6"
              placeholder="请输入内容"
              v-model="pageData.notice">
            </el-input>
          </el-form-item>
          
          <el-form-item label="活动介绍（introduction）：">
            <el-input
              type="textarea"
              :rows="6"
              placeholder="请输入内容"
              v-model="pageData.introduction">
            </el-input>
          </el-form-item>
          
          <el-form-item label="备注说明（remark）：">
            <el-input
              type="textarea"
              :rows="6"
              placeholder="请输入内容"
              v-model="pageData.remark">
            </el-input>
          </el-form-item>






          <el-form-item>
            <el-button type="primary" @click="submitForm('pageData')">{{pageId?'修改基本信息':'新增基本信息'}}</el-button>
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
        <el-dialog title="选择兴趣点" :visible.sync="attractionsDialogShow" width="1100px" class="destination_dialog poi_dialog">

          所属城市:
          <el-select v-model="attractionsCityValue" placeholder="请选择所属城市">
            <el-option
              v-for="(item,key) in attractionsHas" :key="key" :label="key" :value="key">
            </el-option>
          </el-select>
          <el-checkbox-group v-model="attractionsDialogChange" class="mt20">
            <el-checkbox v-for="(items,index) in attractionsHas[poiCity]" :label="items" :key="index">{{items}}</el-checkbox>
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
import activityAside from '@/components/common/activityAside.vue';
import Validate from '@/panda/validate/';
  

export default {
  name: 'tpl1',
  components: {
    activityAside
  },
  data () {
    let urlQuery = this.$route.query;


    return {

      showPageTip : false,
      dialogTip : '',
      showDialogTip : false,
      dialogTipTxt : '',

      pageId: urlQuery.id?urlQuery.id:'',

      ownerAll: ['Cindy','Leo','Vicky','Jeremy'],

      trafficTypeAll: ['Private Vehicle','Walking','Biking','Van','Coach','Metro/Taxi','Bullet Train','Flight','Others'],

      categoryAll: ['Day Trip','Trans-China Trip','Regional Multi-Day Trip','Transportation','Ticket'],

      tourTypeArr: ["Landmarks","City tour","Food","Old Neighborhood","Architecture","History","Art","Cultural","Night","Nightlife","Performances & Shows","Family Friendly","Parks & Zoos","Outdoor","Wildlife","Short excursions","Shopping","Sightseeing","Nature & scenery","Layover tour","Multi-day tour","Popular & Classic Tours","Hiking","Watertown","Huangpu River Cruise"," Expat-friendly","Transfer"],

      //目的地
      destinationAll:[],
      destinationDialogChange:[],
      destinationDialogShow:false,

      //兴趣点POI
      attractionsCity:[],
      attractionsCityValue:'',
      attractionsAll: '',
      poiCity: '',
      attractionsDialogChange:[],
      attractionsDialogShow:false,

      attractionsHas:'',
      departuresAll:[],
      departuresDialogChange:[],
      departuresDialogShow:false,

      //venuesList: {},

      departuresRequired:true,

      pageData:{
        owner:'',
        title: '',
        category: '',
        groupType: '',
        trafficType: 'Walking',

        tourTypes: [],
        

        destinations: [],

        attractions: {
          // Shanghai:['Disney Land'],
          // Beijing:['Badachu Park'],
        },
        departures: [],
        
        // 活动时长
        duration:'',
        durationUnit: 'HOURS',

        //权重
        ranking:3,

        //是否适合儿童
        suitableForChildren: 1,

        //是否前台可见
        display: 1,

        //行程排版风格
        newType: false,

        //资审耗时
        workdayConfirmCost: '',
        confirmCostUnit: 'HOURS',

        //是否提高接送
        pickup: 1,

        //集合信息
        venues: [''],
        recommendedReason:'',
        highlights:'',
        notice:'',
        introduction:'',
        remark: '',

      },
      
      //校验规则
      rules: {
      	owner:[ {required: true, message: '请选择经理人', trigger: 'change' }],
        title:[
          { required: true, message: '请输入title', trigger: 'blur' }
        ],
        category:[
          { required: true, message: '请选择产品类型', trigger: 'blur' }
        ],
        trafficType: [
          { required: true, message: '请选择交通类型', trigger: 'blur' }
        ],
        tourTypes:[
          { required: true, message: '请选择活动主题', trigger: 'blur' }
        ],
        destinations:[
          { required: true, message: '请选择活动地点', trigger: 'blur' }
        ],
        attractions:[
          { required: true, message: '请选择活兴趣点', trigger: 'blur' }
        ],
        departures:[
          { required: true, message: '请选择出发地', trigger: 'blur' }
        ],
        duration:[
          { required: true, message: '请输入活动时长', trigger: 'change' }
        ],
        ranking:[
          { required: true, message: '请输入排序顺序', trigger: 'blur' }
        ],
        workdayConfirmCost:[
          { required: true, message: '请输入资审时效', trigger: 'change' }
        ],
        venues:[
          { required: true, message: '请输入集合信息', trigger: 'blur' }
        ],
        recommendedReason:[
          { required: true, message: '请输入推荐理由', trigger: 'blur' }
        ],
        highlights:[
          { required: true, message: '活动亮点', trigger: 'blur' }
        ],
        


        
      }

    }


  },
  computed:{
    
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
      this.$refs.pageData.validateField('destinations');
    },

    addAttractions(){
      this.attractionsDialogShow =true;
      this.poiCity = '';
      this.attractionsCityValue = '';
      //this.attractionsDialogChange = this.pageData.attractions[this.attractionsCityValue];
    },
    attractions_change(){
      this.pageData.attractions[this.attractionsCityValue] = this.attractionsDialogChange;
      if(!this.attractionsDialogChange.length){
        delete this.pageData.attractions[this.attractionsCityValue];
      }
      this.attractionsDialogChange = [];
      this.attractionsDialogShow = false;

      $('.poi_box .vTip').remove();
      
      //this.$refs.pageData.validateField('attractions');
      //console.log(this.pageData.attractions);
    },

    addDepartures(){
      this.departuresDialogShow =true;
      this.departuresDialogChange = this.pageData.departures;
    },
    departures_change(){
      this.pageData.departures = this.departuresDialogChange;
      this.departuresDialogShow = false;
      this.$refs.pageData.validateField('departures');
    },

    jiheDel(index){
      this.pageData.venues.splice(index,1);
    },
    jiheAdd(){
      this.pageData.venues.push('');
    },
    hideError(e){
      $(e.target).parents('.el-form-item').addClass('is-success').removeClass('is-error');
    },
    submitForm(pageData){
      var self = this;
      this.$refs[pageData].validate((valid) => {

        if (valid && this.fromValidate.validate()) {
          

          if(this.pageData.duration > 12 && this.pageData.durationUnit == 'HOURS'){
            alert('活动时长，超过12小时请按天计算!');
            setTimeout(function(){
              document.querySelector('.shichang_box').scrollIntoViewIfNeeded();
              $('.shichang_box').removeClass('is-success').addClass('is-error');
            },300);
            return;
          }


         
          if(this.pageData.workdayConfirmCost > 12 && this.pageData.confirmCostUnit == 'HOURS'){
            alert('资审时效，超过10小时请按天计算!');
            setTimeout(function(){
              document.querySelector('.shenzi_box').scrollIntoViewIfNeeded();
              $('.shenzi_box').removeClass('is-success').addClass('is-error');
            },300);
            return;
          }


          //请求接口
          var submitUrl = '';
          if(this.pageId){
            submitUrl = 'https://cms.localpanda.com/cms/product/activity';
            this.pageData.activityId = this.pageId;
          }else{
            submitUrl = 'https://cms.localpanda.com/cms/product/activity';
          }


          var newPostData = JSON.parse(JSON.stringify(this.pageData));
          var attractions = [];

          
          for(var key in newPostData.attractions){
            attractions = attractions.concat(newPostData.attractions[key]);
          }
          newPostData.attractions = attractions;


          $.ajax({
            url: submitUrl,
            type: this.pageId?'POST':'PUT',
            dataType: 'json', //如果跨域用jsonp
            contentType: 'application/json',
            data: JSON.stringify(newPostData),
            success:function(data){
              
              if(data.succeed){
                
                self.$alert("修改成功！", '温馨提示', {
                  confirmButtonText: '确定',
                  callback:function(){
                    location.reload();
                  }
                });
                
              }else{
                self.$alert("修改失败！", '温馨提示', {
                  confirmButtonText: '确定'
                });
              }
              
            },
            error:function(){
              self.$alert("修改失败！", '温馨提示', {
                confirmButtonText: '确定'
              });
            }
          });	



        } else {
          setTimeout(function(){
            if(document.querySelector('.el-form-item__error')){
              document.querySelector('.el-form-item__error').scrollIntoViewIfNeeded();
            }
            if(document.querySelector('.poi_box .vTip')){
              document.querySelector('.poi_box .vTip').scrollIntoViewIfNeeded();
            }
            
          },300);
          console.log('error submit!!');
          return false;
        }



      });
    }
  },
  mounted(){
    var self = this;

    //目的地 和 出发地
    $.ajax({
      url: 'https://cms.localpanda.com/cms/public/dest/list/all',
      type: 'GET',
      dataType: 'json', //如果跨域用jsonp
      contentType: 'application/json',
      data: {
        "detail":false,
        "valid":true
      },
      success:function(data){
        var fData = new fArray(data);
        self.destinationAll = fData.get('name');
        self.departuresAll = fData.get('name');
        
      },
      error:function(){
        
      }
    });	

    //POI城市
    $.ajax({
      url: 'https://cms.localpanda.com/cms/public/poi/list/all',
      type: 'GET',
      dataType: 'json', //如果跨域用jsonp
      contentType: 'application/json',
      success:function(data){
        self.attractionsAll = data;
      },
      error:function(){
        
      }
    });	
    
    //请求编辑数据
    if(this.pageId){

      $.ajax({
        url: 'https://cms.localpanda.com/cms/product/activity/'+this.pageId,
        type: 'GET',
        dataType: 'json', //如果跨域用jsonp
        contentType: 'application/json',
        success:function(data){
          
          

          $.ajax({
            url: 'https://cms.localpanda.com/cms/product/activity/attraction/structure',
            type: 'POST',
            dataType: 'json', //如果跨域用jsonp
            contentType: 'application/json',
            data:JSON.stringify(data.attractions),
            success:function(data2){

              data.attractions = data2;

              for(var key in data){
                self.pageData[key] = data[key];
              }
              //self.pageData = data;

              console.log(self.pageData);

              if(self.pageData.category=='Day Trip' || self.pageData.category=='Ticket' || self.pageData.category=='Transportation'){
                self.rules.departures = [{ required: false, message: '请选择出发地', trigger: 'blur' }]
              }
              
            
            },
            error:function(){
              
            }
          });	
         
        },
        error:function(){
          
        }
      });	

      
    }else{
      
    }


    
    this.fromValidate = new Validate({
      inputClassName:'js_validate', //需要校验的input的className
      errorClassName:'valError'  //报错时，会自动在input上添加的className
    });
    
  },
  watch:{
    attractionsCityValue:function(val){
      this.poiCity = val;
      //设置选中值
      var self = this;
      self.attractionsDialogChange = self.pageData.attractions[val]?self.pageData.attractions[val]:[];
    },
    'pageData.pickup':function(){
      var self = this;
      setTimeout(function(){
        self.fromValidate.init();
      },100);
    },
    'pageData.destinations':function(val){
      var hasObj = {};
      for(var key in this.attractionsAll){
        for(var j=0;j<val.length;j++){
          var thisVal = val[j];
          if(thisVal == key){
            hasObj[key] = this.attractionsAll[key]
          }
        }
      };
      this.attractionsHas = hasObj;


      //删除活动地点，同时删除目的地下的景点poi
      if(!val.length){
        this.pageData.attractions = {};
      }else{
        var attractions = this.pageData.attractions;
        for(var key in attractions){
          var has = false;
          for(var j=0;j<val.length;j++){
            var thisVal = val[j];
            if(thisVal==key){
              has = true;
            }
          }
          if(!has){
            delete this.pageData.attractions[key];
          }
        }
      }

      
      
      

      //delete this.pageData.attractions[this.attractionsCityValue];

    }
    // 'pageData.venues':function (val, oldVal) { 
    //   for(var i=0;i<val.length;i++){
    //     var thisData = val[i];
    //     this.venuesList['list'+i] = thisData;
    //   }
    // }
  },
  head(){
    return {
      title: '基本信息'
    }
  }
}

</script>




<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .el-input{
    width: auto;
  }
  .w_100b{ width: 100%;}
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
      li{
        position: relative;
        margin-bottom: 20px;
        .el-button{
          margin-left: 20px;
          padding: 6px 20px;
          vertical-align: top;
        }
      }
      .el-textarea__inner{
        float: left;
        width: 70%;
      }
      
      .jihe_add{
        margin-top: 30px;
        text-align: left;
      }
    }
    .destination_dialog{
      .el-checkbox{
        margin-left: 30px;
        min-width: 100px;
      }
    }
    .poi_dialog{
      .el-checkbox{
        margin-left: 30px;
        min-width: 300px;
      }
    }

    .valError{
      border-color: #f56c6c;
    }
    .vTip{
      color: #f56c6c;
      position: absolute;
      left: 0;
      top: 100%;
      line-height: 24px;
      font-size: 12px;
    }

    .el-checkbox-group{
      .el-checkbox{
        margin-left: 0;
        margin-right: 30px;
      }
    }
  }
  .check{
    text-decoration: underline;
  }
</style>
