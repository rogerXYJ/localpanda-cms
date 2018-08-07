<template>
  <div class="cms-page">
    <!-- 侧边栏导航，activeTitle传入1-1的格式，即可展开并高亮对应的导航 -->
    <activityAside :activeTitle="'1-2'"></activityAside>

    <div class="cms-main">

      <h3 class="text_c">预定信息</h3>
      

      <el-form label-width="250px">
        
        <el-form-item label="销售团期（Sales Calendar）：">
          <el-radio v-model="allAvailable" :value="true" :label="true">全部可售</el-radio>
          <el-radio v-model="allAvailable" :value="false" :label="false">自定义可售团期</el-radio>
        </el-form-item>

      </el-form>

      <calendar v-if="allAvailable===false" type="multi2" size="big" showDouble="true" maxMonths="6" v-model="changeDate" @change="selectDate" :loading="isLoading"></calendar>


      <el-form label-width="250px" class="mt30">
        <el-form-item label=" ">
          <el-button type="primary" @click="submit">提交</el-button>
        </el-form-item>
      </el-form>
      

    </div>

    <!-- 文字提示 -->
    <el-dialog title="温馨提示" :visible.sync="showDialogTip" width="500px" class="bind_dialog" @close="dialogClose" :close-on-click-modal="false">
      <p v-html="dialogTipTxt"></p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="showDialogTip = false">确 定</el-button>
      </span>
    </el-dialog>
    

  </div>
</template>

<script>
import activityAside from '@/components/common/activityAside.vue';
import calendar from '@/panda/calendar/';
  

export default {
  name: 'product_pic',
  components: {
    activityAside,
    calendar
  },
  data () {
    let activityId = this.$route.query.id;

    return {
      
      
      showDialogTip : false,
      dialogTipTxt : '',

      activityId: activityId,

      allAvailable: '',
      defaultData: [],
      changeDate:[],
      isLoading: true,
      maxLoadNum:1,
      loadNum:0,

      isSubmit:false
    }


  },
  computed:{
    
  },
  
  methods:{
    dialogTxt(txt){
      this.showDialogTip = true;
      this.dialogTipTxt = txt;
    },
    selectDate(data){
      //清除所有可售字段
      var $list = data.el.querySelectorAll('.day_list .is_sale');
      for(var i=0;i<$list.length;i++){
        $list[i].remove();
      }
      
      //根据选择添加可售字段
      var $active = data.el.querySelectorAll('.active');
      for(var i=0;i<$active.length;i++){
        var tipDom = document.createElement('div');
        tipDom.className='is_sale';
        tipDom.innerHTML = '可售';
        $active[i].appendChild(tipDom);
      }
      
    },
    getSale(){
      var changeDate = this.changeDate;
      var defaultData = this.defaultData;

      var addArr = [],
        delArr = [];

      //筛选需要删除的日期
      for(var i=0;i<defaultData.length;i++){
        var thisDef = defaultData[i];
        var has = false;
        for(var j=0;j<changeDate.length;j++){
          var thisChange = changeDate[j];
          if(thisDef.saleDate == thisChange){
            has = true;
          }
        }
        if(!has){
          delArr.push(thisDef);
        }
      }

      //筛选需要添加的日期
      for(var j=0;j<changeDate.length;j++){
        var thisChange = changeDate[j];
        var has = false;
        for(var i=0;i<defaultData.length;i++){
          var thisDef = defaultData[i].saleDate;
          if(thisDef==thisChange){
            has = true;
          }
        };
        if(!has){
          addArr.push(thisChange);
        }
      }

      return {
        add:addArr,
        del:delArr
      }
    },
    submit(){
      var self = this;
      var postData = {
        "activityId": this.activityId,
        "allAvailable": this.allAvailable
      };

      var saleData = this.getSale();

      if(self.isSubmit){
        return;
      }

      self.isSubmit = true;

      //添加日期
      self.addDate(saleData.add);

      //删除日期
      self.delDate(saleData.del);

      //设置全部可售状态
      $.ajax({
        url: 'https://cms.localpanda.com/cms/product/activity',
        type: 'POST',
        dataType: 'json', //如果跨域用jsonp
        contentType: 'application/json',
        data: JSON.stringify(postData),
        success:function(data){
          
          if(data.succeed){
            self.loadNum++;
            if(self.loadNum>=self.maxLoadNum){
              self.dialogTxt('<span class="green">设置成功！</span>');
            }
          }else{
            self.dialogTxt('<span class="red">设置可售状态失败，请重试!!</span>');
          }

          self.isSubmit = false;

        },
        error:function(){
          self.dialogTxt('<span class="red">网络异常，请重试!!</span>');
          self.isSubmit = false;
        }
      });	

      

    },
    addDate(dateArr){
      var self = this;
      if(!dateArr.length){
        return;
      }

      self.maxLoadNum++;
      
      var putData = [];
      for(var i=0;i<dateArr.length;i++){
        putData.push({
          "activityId": this.activityId,
          "saleDate": dateArr[i]
        });
      }

      $.ajax({
        url: 'https://cms.localpanda.com/cms/product/activity/sale/calendar',
        type: 'PUT',
        dataType: 'json', //如果跨域用jsonp
        contentType: 'application/json',
        data:JSON.stringify(putData),
        success:function(data){
          
          if(data.succeed){
            self.loadNum++;
            if(self.loadNum>=self.maxLoadNum){
              self.dialogTxt('<span class="green">设置成功！</span>');
            }
          }else{
            self.dialogTxt('<span class="red">修改日期失败，请重试!!</span>');
          }
          self.isSubmit = false;
          
        },
        error:function(){
          self.isSubmit = false;
          self.dialogTxt('<span class="red">网络异常，请重试!!</span>');
        }
      });	
    },
    delDate(dateArr){
      var self = this;

      if(!dateArr.length){
        return;
      }

      self.maxLoadNum++;

      var delId = [];
      for(var i=0;i<dateArr.length;i++){
        delId.push(dateArr[i].id);
      }

      $.ajax({
        url: 'https://cms.localpanda.com/cms/product/activity/sale/calendar/'+delId.join(','),
        type: 'DELETE',
        success:function(data){

          
          if(data.succeed){
            self.loadNum++;
            if(self.loadNum>=self.maxLoadNum){
              self.dialogTxt('<span class="green">设置成功！</span>');
            }
          }else{
            self.dialogTxt('<span class="red">修改日期失败，请重试!!</span>');
          }
          self.isSubmit = false;
        },
        error:function(){
          self.isSubmit = false;
          self.dialogTxt('<span class="red">网络异常，请重试!!</span>');
        }
      });	
    },

    searchSale(){
      var self = this;
      self.isLoading = true;
      $.ajax({
        url: 'https://cms.localpanda.com/cms/product/activity/'+self.activityId+'/sale/calendar',
        type: 'GET',
        dataType: 'json', //如果跨域用jsonp
        success:function(saleData){

          //设置默认数据
          self.defaultData = saleData;

          //设置已选日期
          var dateArr = [];
          for(var i=0;i<saleData.length;i++){
            dateArr.push(saleData[i].saleDate);
          }
          self.changeDate = dateArr;

          self.isLoading = false;

        },
        error:function(){
          
        }
      });	
    },

    dialogClose(){
      if(!/失败/.test(this.dialogTipTxt)){
        location.reload();
      }
      
    }
  },
  mounted(){
    var self = this;
    //查询状态
    $.ajax({
      url: 'https://cms.localpanda.com/cms/product/activity/'+this.activityId,
      type: 'GET',
      dataType: 'json', //如果跨域用jsonp
      success:function(data){

        if(data){
          self.allAvailable = data.allAvailable;

          if(!data.allAvailable){
            //查询可售日期
            self.searchSale();
          }else{
            self.isLoading = false;
          }

          


        }

      },
      error:function(){
        
      }
    });	

    

    
  },
  watch:{
    allAvailable:function(val){
      if(!val){
        //查询可售日期
        this.searchSale();
      }
    }
  },
  head(){
    return {
      title: '产品图片信息'
    }
  }
}

</script>




<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  
  .cms-main{
    .el-checkbox{
      margin-right: 30px;
      margin-left: 0;
      min-width: 300px;
    }
  }
  
</style>


