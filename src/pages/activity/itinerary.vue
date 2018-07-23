<template>
  <div class="cms-page">
    <!-- 侧边栏导航，activeTitle传入1-1的格式，即可展开并高亮对应的导航 -->
    <activityAside :activeTitle="'1-3'"></activityAside>

    <div class="cms-main">

      <h3 class="text_c">行程信息</h3>

      

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
            <a class="btn_view" target="_blank" :href="scope.row.photo && scope.row.photo.url">View</a>
            <span class="fs12 c_999 ml5" v-if="scope.row.photo && scope.row.photo.url">Banner photo</span>
            <el-button type="text" size="small" v-else @click="setCover(scope.row)">Set as Cover</el-button>
          </template>
        </el-table-column>
        <el-table-column header-align="center" label="操作" width="220" align="center" >
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="editItinerary(scope.row)">Edit</el-button>
            <el-button type="text" size="small" @click="del">Del</el-button>
            <el-button type="text" size="small" @click="addItinerary(scope.$index)">Add Below</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="add_itinerary" v-if="!tableData.length">
        <el-button type="primary" @click="addItinerary(1)">添加行程</el-button>
      </div>



    </div>


    <!-- 添加行程弹窗 -->
    <el-dialog :title="dialogType=='add'?'添加行程':'修改行程'" :visible.sync="dialogShow" width="800px" class="destination_dialog">
      
      <el-form :model="dialogData" :rules="rules" ref="dialogData" label-width="100px">
        <el-form-item label="标题：" prop="title">
          <el-input v-model="dialogData.title"></el-input>
        </el-form-item>
        <el-form-item label="描述：">
          <el-input type="textarea" v-model="dialogData.description"></el-input>
          <p class="c_999">注：对应内容前台若需换行，请在描述中用“回车”</p>
        </el-form-item>

        <el-form-item label="图片：">
          <a class="btn_upload">
            <el-button size="small" type="primary">上传图片</el-button>
            <input id="upload" @change="uploadChange" accept="image/*" type="file">
          </a>
          <span class="vat">{{file.name}}</span>
          <el-button class="vat mt10 ml10" type="text" size="small" @click="file=''" v-if="file">取消</el-button>
          <div v-if="dialogData.photo">
            <img :src="dialogData.photo.url" width="300" alt="">
          </div>
        </el-form-item>
        
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="new_itinerary">确 定</el-button>
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
    let activityId = this.$route.query.id;

    return {

      showDialogTip : false,
      dialogTipTxt : '',


      //页面配置
      dialogShow:true,
      dialogType: 'add',
      dialogData: {
        activityId: activityId,
        title:'',
        description:'',
        ranking: 1
      },

      //校验规则
      rules: {
        title:[
          { required: true, message: '请输入title', trigger: 'blur' }
        ]
      },

      activityId: activityId,

      // addData:{
      //   activityId: activityId,
      //   title:'',
      //   description:'',
      //   ranking: 1
      // },

      // editData: '',

      file: '',
      //{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}
      // addImgData:{
      //   objectId: '',
      //   objectType: 'ACTIVITY_ITINERARY'
      // },

      objectId:'',

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
        }*/
      ]
    }


  },
  computed:{
    
  },
  
  methods:{
    isCover(data){
      if(data.photo){
        if(data.photo.url == coverPhotoUrl){
          return true;
        }else{
          return false;
        };
      }
      return false;
    },
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
    addItinerary(index){
      
      this.dialogShow = true;
      this.dialogType = 'add';
      this.dialogData = {
        activityId: this.activityId,
        title:'',
        description:'',
        ranking: index
      };

    },
    editItinerary(data){
      this.dialogShow = true;
      this.dialogType = 'edit';
      
      this.dialogData = {
        id: data.id,
        activityId: data.activityId,
        title: data.title,
        description: data.description,
        ranking: data.ranking
      };

      this.objectId = data.photo?data.photo.photoId:'';

    },
    del(){
      
    },
    new_itinerary(){
      var self = this;
      this.$refs['dialogData'].validate((valid) => {

        if (valid) {

          var postData = JSON.stringify(this.dialogData),
            ajaxType = 'PUT';
          if(this.dialogType == 'edit'){
            ajaxType = 'POST';
          }
          $.ajax({
            url: 'https://api.localpanda.com/cms/product/activity/itinerary',
            type: ajaxType,
            dataType: 'json', //如果跨域用jsonp
            contentType: 'application/json',
            data: postData,
            success:function(data){
              
              if(data.succeed){
                var objectId = data.response;
                if(self.dialogType == 'edit' && !this.objectId){
                  objectId = self.dialogData.id;
                }
                self.uploadImg(objectId);
              }
            
            },
            error:function(){
              
            }
          });	
        } else {
          return false;
        }
      });

    },
    uploadChange(e){
      this.file = e.target.files.item(0);
    },
    uploadImg(objectId){
      var self = this;
      //没有图片不上传
      if(!this.file){return false;}

      var formData = {
        objectId : objectId,
        objectType : 'ACTIVITY_ITINERARY',
        file : this.file
      };
      let param = new FormData()  // 创建form对象
      for(let key in formData){
        param.append(key, formData[key])  // 通过append向form对象添加数据
      }
      //编辑和新增
      $.ajax({
        url: 'https://api.localpanda.com/cms/public/photo/'+(self.objectId ? 'update' : 'commit'),
        type: 'POST',
        dataType: 'json', //如果跨域用jsonp
        contentType: false,
        data: param,
        processData: false,
        success:function(data){
          
          if(data.succeed){
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

    dialogTxt(txt){
      this.showDialogTip = true;
      this.dialogTipTxt = txt;
    },

  },
  mounted(){
    var self = this;

    //请求编辑数据
    if(this.activityId){

      $.ajax({
        url: 'https://api.localpanda.com/cms/product/activity/'+this.activityId+'/itinerary/list',
        type: 'GET',
        dataType: 'json', //如果跨域用jsonp
        contentType: 'application/json',
        success:function(data){
          
          console.log(data);
          var list = data.activityItineraryList;
          if(list.length){
            self.tableData = list;
          }
         
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
    .add_itinerary{
      margin-top: -50px;
      text-align: center;
      position: relative;
      z-index: 3;
    }
    
    
  }

  .btn_upload{
    position: relative;
    display: inline-block;
    overflow: hidden;
    input{
      position: absolute;
      left: 0;
      top: 0;
      height: 40px;
      line-height: 40px;
      display: block;
      opacity: 0;
    }
  }
  .vat{
    vertical-align: top;
  }
  
</style>
