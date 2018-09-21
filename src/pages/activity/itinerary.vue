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
        <el-table-column header-align="center" label="图片" width="400"  align="center">
          <template slot-scope="scope">
            <a class="btn_view" target="_blank" :href="scope.row.photo && scope.row.photo.url" v-if="scope.row.photo">View</a>

            
            
            <span class="fs12 c_999 ml5 mr10" v-if="scope.row.photo && scope.row.photo.url==coverPhotoUrl">Cover photo</span>
            <el-button type="text" size="small" v-else-if="scope.row.photo" @click="setCover(scope.row)">Set as Cover</el-button>
            <span v-else>-</span>

            
            <span class="fs12 c_999 mr10" v-if="scope.row.photo && isBanner(scope.row.photo.url)">Banner photo</span>
            <el-button class="" type="text" size="small" v-else-if="scope.row.photo" @click="setBanner(scope.row)">Set as Banner</el-button>

           <el-button class="" v-if="scope.row.photo&&scope.row.photo.url!=coverPhotoUrl" @click="delPhoto(scope)" type="text" size="small" >Del</el-button>
            

          </template>
        </el-table-column>
        <el-table-column header-align="center" label="操作" width="220" align="center" >
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="editItinerary(scope.row,scope.$index)">Edit</el-button>
            <el-button type="text" size="small" @click="del(scope)">Del</el-button>
            <el-button type="text" size="small" @click="addItinerary(scope.$index+1,scope.row.ranking)">Add Below</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="add_itinerary" v-if="!hasItinerary">
        <el-button type="primary" @click="addItinerary(1,1)">添加行程</el-button>
      </div>
      <div class="load_table" v-if="tabLoading">加载中...</div>



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
          <div v-else><img :src="fileImg" width="300" alt=""></div>
        </el-form-item>
        
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="new_itinerary">确 定</el-button>
      </span>
    </el-dialog>


    <!-- 文字提示 -->
    <el-dialog title="温馨提示" :visible.sync="showDialogTip" width="500px" class="bind_dialog">
      <p v-html="dialogTipTxt"></p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="showDialogTip = false">确 定</el-button>
      </span>
    </el-dialog>

    

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
    let activityId = this.$route.query.id;

    return {
      
      hasItinerary: true,
      tabLoading:true,
      
      showDialogTip : false,
      dialogTipTxt : '',


      //页面配置
      dialogShow:false,
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

      file: '',
      fileImg:'',

      objectId:'',

      coverPhotoUrl:'',
      tableData:[],

      posting:false,

      imgList:[]
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
    isBanner(url){
      
      for(var i=0;i<this.imgList.length;i++){
        var thisData = this.imgList[i];
        if(url == thisData.url){
          return true;
        }
      }
      
      return false;
    },
    setCover(thisData){
      var self = this;

      var formData = {
        "objectId": thisData.activityId,
        "objectType": "ACTIVITY_COVER",
        "url": thisData.photo.url
      };
      let param = new FormData()  // 创建form对象
      for(let key in formData){
        param.append(key, formData[key])  // 通过append向form对象添加数据
      }

      $.ajax({
        url: 'https://cms.localpanda.com/cms/public/photo/update',
        type: 'POST',
        dataType: 'json', //如果跨域用jsonp
        contentType: 'application/json',
        contentType: false,
        data: param,
        processData: false,
        success:function(data){
          
          if(data.succeed){
            self.$message({
              type: 'success',
              message: '设置成功！'
            });
            //self.dialogTxt('设置成功！');
            self.coverPhotoUrl = thisData.photo.url;
          }else{
            self.dialogTxt('设置失败，请重试!!');
          }
         
        },
        error:function(){
          self.dialogTxt('设置失败，请重试!!');
        }
      });
    },
    setBanner(thisData){
      var self = this;

      
          

      var formData = {
        "objectId": thisData.activityId,
        "objectType": "ACTIVITY_BANNER",
        "url": thisData.photo.url
      };
      let param = new FormData()  // 创建form对象
      for(let key in formData){
        param.append(key, formData[key])  // 通过append向form对象添加数据
      }

      $.ajax({
        url: 'https://cms.localpanda.com/cms/public/photo/commit',
        type: 'POST',
        dataType: 'json', //如果跨域用jsonp
        contentType: 'application/json',
        contentType: false,
        data: param,
        processData: false,
        success:function(data){
          
          if(data.succeed){
            self.$message({
              type: 'success',
              message: '设置成功！'
            });

            self.imgList.push({
              url: formData.url
            });


            //获取已有图片
            // $.ajax({
            //   url: 'https://cms.localpanda.com/cms/public/photo/'+self.activityId+'/ACTIVITY_BANNER',
            //   type: 'GET',
            //   dataType: 'json', //如果跨域用jsonp
            //   success:function(data2){
                
            //     if(data2.length){
            //       self.imgList = data2;
            //     }
                
            //   },
            //   error:function(){
            //     self.dialogTxt('数据获取失败，请刷新页面!');
            //   }
            // });	


          }else{
            self.$message({
              type: 'error',
              message: '设置失败，请重试！'
            });
          }
        
        },
        error:function(){
          self.$message({
            type: 'error',
            message: '设置失败，请重试！'
          });
        }
      });


          
    },
    addItinerary(index,ranking){

      this.file = '';
      this.fileImg = '';
      
      
      this.dialogShow = true;
      this.dialogType = 'add';
      this.dialogData = {
        activityId: this.activityId,
        title:'',
        description:'',
        ranking: ranking
      };
      this.editIndex = index;

      setTimeout(function(){
        document.getElementById('upload').value = '';
      },100);
    },
    editItinerary(data,index){
      this.file = '';
      this.fileImg = '';


      this.dialogShow = true;
      this.dialogType = 'edit';
      this.editIndex = index;

      
      
      this.dialogData = JSON.parse(JSON.stringify(data));

      this.objectId = data.photo?data.photo.photoId:'';


      setTimeout(function(){
        document.getElementById('upload').value = '';
      },100);

      

    },
    
    delPhoto(thisData){
    console.log(thisData)
      var self=this;
      self.$alert("你确定要删除  行程"+(thisData.$index+1)+"的图片吗？",'温馨提示',{
        confirmButtonText: '确定'}).then(()=>{
          $.ajax({
          url: 'https://cms.localpanda.com/cms/public/photo/delete/'+thisData.row.photo.photoId,
          type: 'DELETE',
          dataType: 'json', //如果跨域用jsonp
          success:function(data){
            
            if(data.succeed){
              self.$message({
                type: 'success',
                message: '删除成功！'
              });
              self.imgList.splice(thisData.$index,1);
              location.reload()
            }else{
              self.dialogTxt(data.errorMessage);
            }

          },
          error:function(){
            self.dialogTxt('删除失败，请重新尝试!');
          }
          })
        });	
    },
    del(thisData){
      var self = this;

      

      this.$alert("你确定要删除 行程"+(thisData.$index+1)+" 吗？", '温馨提示', {
        confirmButtonText: '确定'
      }).then(() => {
        $.ajax({
          url: 'https://cms.localpanda.com/cms/product/activity/itinerary/'+thisData.row.id,
          type: 'DELETE',
          dataType: 'json', //如果跨域用jsonp
          contentType: 'application/json',
          success:function(data){
            
            if(data.succeed){
              self.$message({
                type: 'success',
                message: '删除成功!'
              });
              //self.dialogTxt('删除成功！');
              
              self.tableData.splice(thisData.$index,1);
              if(!self.tableData.length){
                self.hasItinerary = false;
              }
            }else{
              self.dialogTxt('删除失败，请刷新页面后重试!');
            }
          
          },
          error:function(){
            self.dialogTxt('删除失败，请刷新页面后重试!');
          }
        });
      });

      
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

          if(self.posting){
            return;
          }

          

          self.posting = true;
          $.ajax({
            url: 'https://cms.localpanda.com/cms/product/activity/itinerary',
            type: ajaxType,
            dataType: 'json', //如果跨域用jsonp
            contentType: 'application/json',
            data: postData,
            success:function(data){
              
              if(data.succeed){
                var objectId = data.response;
                if(self.dialogType == 'edit' && !this.objectId){

                  self.tableData[self.editIndex] = self.dialogData;
                  self.tableData.push('');
                  self.tableData.length = self.tableData.length-1;
                  
                  objectId = self.dialogData.id;
                  
                  
                }else if(!this.objectId){
                  self.tableData.splice(self.editIndex,0,self.dialogData);
                  if(!self.file){
                    location.reload();
                  }
                  
                  //self.tableData.push(self.dialogData);
                }
                self.uploadImg(objectId,self.dialogData);

                self.hasItinerary = true;
              }else{
                self.dialogTxt('<span class="red">失败!</span>');
              }
              
              setTimeout(function(){
                self.posting = false;
              },500);
            
            },
            error:function(){
              self.dialogTxt('<span class="red">失败!</span>');
              self.posting = false;
            }
          });	
        } else {
          return false;
        }
      });

    },
    uploadChange(e){
      this.file = e.target.files.item(0);
      this.fileImg = window.URL.createObjectURL(this.file);
    },
    uploadImg(objectId,dialogData){
      var self = this;
      //没有图片不上传
      if(!this.file){
        //提示
        if(self.dialogType == 'edit'){
          self.$message({
            type: 'success',
            message: '修改成功!'
          });
          //self.dialogTxt('<span class="green">修改成功！</span>');
        }else{
          self.$message({
            type: 'success',
            message: '新增成功！'
          });
          //self.dialogTxt('<span class="green">新增成功！</span>');
        }
        
        self.dialogShow = false;
        return false;
      }
      


      var formData = {
        objectId : objectId,
        objectType : 'ACTIVITY_ITINERARY',
        file : this.file
      };

      
      if(!self.objectId){
        formData.files = this.file;
      }
      
      let param = new FormData()  // 创建form对象
      for(let key in formData){
        param.append(key, formData[key])  // 通过append向form对象添加数据
      }
      //编辑和新增
      $.ajax({
        url: 'https://cms.localpanda.com/cms/public/photo/'+(self.objectId ? 'update' : 'commit'),
        type: 'POST',
        dataType: 'json', //如果跨域用jsonp
        contentType: false,
        data: param,
        processData: false,
        success:function(data){
          
          if(data.succeed){
            //self.dialogTxt('修改成功！');
            self.$message({
              type: 'success',
              message: '修改成功!'
            });
            self.dialogShow = false;
            //self.tableData.splice(self.editIndex,0,dialogData);
            location.reload();
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

      


      //获取已有图片
      $.ajax({
        url: 'https://cms.localpanda.com/cms/public/photo/'+this.activityId+'/ACTIVITY_BANNER',
        type: 'GET',
        dataType: 'json', //如果跨域用jsonp
        success:function(data2){
          
          
            self.imgList = data2;


            $.ajax({
              url: 'https://cms.localpanda.com/cms/product/activity/'+self.activityId+'/itinerary/list',
              type: 'GET',
              dataType: 'json', //如果跨域用jsonp
              contentType: 'application/json',
              success:function(data){
                
                console.log(data);
                var list = data.activityItineraryList;
                if(list.length){
                  self.tableData = list;
                  self.hasItinerary = true;
                  self.coverPhotoUrl = data.coverPhotoUrl?data.coverPhotoUrl:'';
                }else{
                  self.hasItinerary = false;
                }

                self.tabLoading = false;
                
              },
              error:function(){
                self.hasItinerary = false;
                self.tabLoading = false;
              }
            });	
          
        },
        error:function(){
          self.dialogTxt('数据获取失败，请刷新页面!');
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
      title: '产品行程信息'
    }
  }
}

</script>




<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  
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
    .add_itinerary,.load_table{
      margin-top: -50px;
      text-align: center;
      position: relative;
      z-index: 3;
    }
    .load_table{
      width: 50%;
      margin: -50px auto 0;
      background-color: #fff;
      font-size: 14px;
      color: #333;
      height: 40px;
      line-height: 40px;
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
      z-index: 9;
    }
  }
  .vat{
    vertical-align: top;
  }
  
</style>
