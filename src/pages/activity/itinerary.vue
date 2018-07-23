<template>
  <div class="cms-page">
    <!-- 侧边栏导航，activeTitle传入1-1的格式，即可展开并高亮对应的导航 -->
    <activityAside :activeTitle="'1-3'"></activityAside>

    <div class="cms-main">

      <h3 class="text_c">行程信息</h3>

      <div class="">
        <el-button type="primary" @click="addDestination">添加行程</el-button>
      </div>

      <el-table
        :data="tableData"
        class="itinerary_list"
        border
        style="width: 100%; max-width:1200px;">
        <el-table-column
          type="index"
          label="行程排列"
          header-align="center" 
          align="center" 
          width="100">
        </el-table-column>
        <el-table-column
          prop="title"
          label="行程标题"
          header-align="center" 
          align="center" 
          >
        </el-table-column>
        <el-table-column header-align="center" label="图片" width="200"  align="center">
          <template slot-scope="scope">
            <a class="btn_view" target="_blank" :href="scope.row.photo.url">View</a>
            <span class="fs12 c_999 ml5" v-if="scope.row.photo && scope.row.photo.url == coverPhotoUrl">Banner photo</span>
            <el-button type="text" size="small" v-else @click="setCover(scope.row)">Set as Cover</el-button>
          </template>
        </el-table-column>
        <el-table-column header-align="center" label="操作" width="220" align="center" >
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="edit">Edit</el-button>
            <el-button type="text" size="small" @click="del">Del</el-button>
            <el-button type="text" size="small" @click="add">Add Below</el-button>
          </template>
        </el-table-column>
      </el-table>



    </div>


    <!-- 选择出发地弹窗 -->
    <el-dialog title="选择出发地" :visible.sync="dialogShow" width="800px" class="destination_dialog">
      

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="new_itinerary">确 定</el-button>
      </span>
    </el-dialog>


    

  </div>
</template>

<script>
import activityAside from '@/components/common/activityAside.vue';
import Validate from '@/assets/js/plugin/validate/';
  

export default {
  name: 'tpl1',
  components: {
    activityAside
  },
  data () {
    let urlQuery = this.$route.query;

    return {
      //页面配置
      dialogShow:false,

      coverPhotoUrl:'https://resource.localpanda.cn/activity/itineraries/40_U5837627.jpg',
      tableData:[
        /*{
          "id": 39,
          "activityId": 11015,
          "title": "Pick-up",
          "description": "After being picked up by your private car and an experienced driver, start the tour in a nice, private vehicle.",
          "ranking": 1,
          "photo": {
            "photoId": 505290,
            "url": "https://resource.localpanda.cn/testing/activity/itineraries/39.jpg"
          }
        },
        {
          "id": 40,
          "activityId": 11015,
          "title": "T-sqaure",
          "description": "The first stop of the tour will be Tiananmen Square. Throughout the history, Tiananmen Square has been the site of a number of important events.",
          "ranking": 1,
          "photo": {
            "photoId": 2254,
            "url": "https://resource.localpanda.cn/activity/itineraries/40_U5837627.jpg"
          }
        }*/
      ]
    }


  },
  computed:{
    
  },
  
  methods:{
    setCover(thisData){
      $.ajax({
        url: 'https://api.localpanda.com/cms/content/photo/update',
        type: 'GET',
        dataType: 'json', //如果跨域用jsonp
        contentType: 'application/json',
        data: JSON.stringify({
          "objectId": thisData.activityId,
          "objectType": "ACTIVITY_COVER",
          "url": thisData.photo.url
        }),
        success:function(data){
          
          console.log(data);
         
        },
        error:function(){
          
        }
      });
    },
    add(){
      
    },
    edit(){
      
    },
    del(){
      
    },
    addDestination(){

    },
    new_itinerary(){

    },
    submitForm(pageData){
      this.$refs[pageData].validate((valid) => {

        if (valid && this.fromValidate.validate()) {

          // $.ajax({
          //   url: submitUrl,
          //   type: this.pageId?'POST':'PUT',
          //   dataType: 'json', //如果跨域用jsonp
          //   contentType: 'application/json',
          //   data: JSON.stringify(newPostData),
          //   success:function(data){
              
          //     console.log(data);
              
          //   },
          //   error:function(){
              
          //   }
          // });	



        } else {
          console.log('error submit!!');
          return false;
        }



      });
    }
  },
  mounted(){
    var self = this;

    
    //请求编辑数据
    if(this.pageId){

      $.ajax({
        url: 'https://api.localpanda.com/cms/product/activity/'+this.pageId,
        type: 'GET',
        dataType: 'json', //如果跨域用jsonp
        contentType: 'application/json',
        success:function(data){
          
          console.log(data);
          self.pageData = data;
         
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
    .itinerary_list{
      .btn_view{
        margin-right: 20px;
        color: #409EFF;
        &:hover{
          color: #f60;
        }
      }  
      .el-button{
        padding: 9px 5px;
      }
    }
    
  }
  
</style>
