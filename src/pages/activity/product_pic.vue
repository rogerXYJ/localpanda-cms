<template>
  <div class="cms-page">
    <!-- 侧边栏导航，activeTitle传入1-1的格式，即可展开并高亮对应的导航 -->
    <activityAside :activeTitle="'1-6'"></activityAside>

    <div class="cms-main">

      <h3 class="text_c">产品图片管理</h3>
      

      <el-form label-width="150px">
        <el-form-item label="产品图片：">
          <span class="el-button el-button--primary" @click="showDialogTip = false">添加新图片<input class="upload_input" type="file" @change="imgChange" title=""></span>
        </el-form-item>

        
        

      </el-form>

      <ul class="img_list">
        <li v-for="(items,index) in imgList" :key="index">
          <div class="img_list_img" :style="'background-image: url('+items.url+')'"></div>
          <div class="img_list_info">
            <div class="list_top">
              <el-button class="fr" type="text" size="small" @click="del(items,index)">删除</el-button>
              <el-button type="text" size="small" v-if="!items.file && !isCover(items)" @click="setCover(items)">设为封面</el-button>
              <span v-if="!items.file && isCover(items)" class="cover_txt mt5 fl">封面图</span>
            </div>
            <div class="ranking mt15" v-if="!items.file">权重：
              <el-select v-model="items.ranking" style="width:110px;" size="small">
                <el-option :label="item" :value="item" v-for="item in 7" :key="item">{{item}}</el-option>
              </el-select>
            </div>
            <div class="list_bot mt30" v-if="!items.photoId">
              <span class="el-button el-button--primary el-button--small" @click="uploading(items)" :loading="items.loading" title="">开始上传</span>
            </div>
            <div class="list_bot mt30" v-else>
              <span class="el-button el-button--primary el-button--small is-plain">重新上传<input class="upload_input" type="file" @change="newChange(items,index,$event)" title=""></span>
              <el-button type="primary" size="small" @click="uploading(items)" :loading="items.loading">更新</el-button>
            </div>
          </div>
        </li>
      </ul>
      

    </div>




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
  

export default {
  name: 'product_pic',
  components: {
    activityAside
  },
  data () {
    let activityId = this.$route.query.id;

    return {
      
      
      showDialogTip : false,
      dialogTipTxt : '',

      activityId: activityId,

      file: '',

      coverPhotoUrl:'',
      imgList:[
        // {
        //   ranking:7,
        //   isCover:false,
        //   objectId:1544544,
        //   src:'https://resource.localpanda.cn/testing/activity/itineraries/500236.jpg',
        //   loading:false
        // }
      ]
    }


  },
  computed:{
    
  },
  
  methods:{
    imgChange(e){
      var thisFile = e.target.files.item(0);

      this.imgList.push({
        display: 1,
        ranking: 7,
        objectId: this.activityId,
        url: window.URL.createObjectURL(thisFile),
        file: thisFile
      });
    },
    del(data,index){

      var self = this;
      
      if(data.photoId){

        if(!confirm("你确定要从服务器删除此图片吗？")){
          return;
        }
        
        $.ajax({
          url: 'https://cms.localpanda.com/cms/public/photo/delete/'+data.photoId,
          type: 'DELETE',
          dataType: 'json', //如果跨域用jsonp
          success:function(data){
            
            if(data.succeed){
              self.$message({
                type: 'success',
                message: '删除成功！'
              });
              self.imgList.splice(index,1);
            }else{
              self.dialogTxt(data.errorMessage);
            }

          },
          error:function(){
            self.dialogTxt('删除失败，请重新尝试!');
          }
        });	
      }else{
        this.imgList.splice(index,1);
      }
      
    },

    newChange(items,index,e){
      var thisFile = e.target.files.item(0);

      //设置显示数据
      this.imgList[index].file = thisFile;
      this.imgList[index].url = window.URL.createObjectURL(thisFile);

    },

    //上传和更新
    uploading(fileData){

      var self = this;
      //没有图片不上传

      if(!fileData.file && !fileData.photoId){
         self.dialogTxt('先选择图片，再尝试更新图片信息!');
        return false;
      }

      //新上传
      var formData = {
        objectId : this.activityId,
        objectType : 'ACTIVITY_BANNER',
        files : fileData.file,
        ranking: 7
      };
      
      //更新图片
      if(fileData.photoId){
        formData = {
          objectId: this.activityId,
          objectType : 'ACTIVITY_BANNER',
          photoId : fileData.photoId,
          ranking: fileData.ranking
        };
        if(fileData.file){
          formData.file = fileData.file;
        }
      }

      console.log(formData);

      
      let param = new FormData()  // 创建form对象
      for(let key in formData){
        param.append(key, formData[key])  // 通过append向form对象添加数据
      }
      //编辑和新增
      $.ajax({
        url: 'https://cms.localpanda.com/cms/public/photo/'+(fileData.photoId ? 'update' : 'commit'),
        type: 'POST',
        dataType: 'json', //如果跨域用jsonp
        contentType: false,
        data: param,
        processData: false,
        success:function(data){
          
          if(data.succeed){
            
            if(!fileData.photoId){
              self.$message({
                type: 'success',
                message: '修改成功！'
              });
              location.reload();
            }else{
              self.$message({
                type: 'success',
                message: '修改成功！'
              });
            }
            
          }else{
            self.dialogTxt(data.errorMessage);
          }
        },
        error:function(){
          self.dialogTxt('更新失败，参数错误或网络异常!');
        }
      });	


    },


    isCover(data){
      if(data.url == this.coverPhotoUrl){
        return true;
      }else{
        return false;
      };
    },
    setCover(thisData){
      var self = this;


      var formData = {
        "objectId": this.activityId,
        "objectType": "ACTIVITY_COVER",
        "url": thisData.url
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
            self.coverPhotoUrl = thisData.url;
          }else{
            self.dialogTxt('设置失败，请重试!!');
          }
         
        },
        error:function(){
          self.dialogTxt('设置失败，请重试!!');
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

    //获取已有图片
    $.ajax({
      url: 'https://cms.localpanda.com/cms/public/photo/'+this.activityId+'/ACTIVITY_BANNER',
      type: 'GET',
      dataType: 'json', //如果跨域用jsonp
      success:function(data){
        
        if(data.length){
          self.imgList = data;
        }
        
      },
      error:function(){
        self.dialogTxt('数据获取失败，请刷新页面!');
      }
    });	

    //获取封面图片
    $.ajax({
      url: 'https://cms.localpanda.com/cms/public/photo/'+this.activityId+'/ACTIVITY_COVER',
      type: 'GET',
      dataType: 'json', //如果跨域用jsonp
      success:function(data){
        
        console.log(data);
        if(data.length){
          self.coverPhotoUrl = data[0].url;
        }
        
      },
      error:function(){
        self.dialogTxt('数据获取失败，请刷新页面!');
      }
    });	

  },
  watch:{
    
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
    .img_list{
      padding-left: 65px;
      margin-top: 10px;
      li{
        float: left;
        margin-right: 30px;
        margin-top: 30px;
        width: 370px;
        height: 145px;
        overflow: hidden;
        .img_list_img{
          float: left;
          width: 200px;
          border: 1px solid #ddd;
          height: 143px;
          overflow: hidden;
          background-size: cover;
        }
        .img_list_info{
          float: left;
          padding-left: 15px;
        }
        .list_top{
          overflow: hidden;
          .el-button{
            margin-left: 0;
            vertical-align: top;
          }
          .fr{
            color: red;
            &:hover{
              text-decoration: underline;
            }
          }
        }
        .list_bot{
          .el-button{
            position: relative;
            overflow: hidden;
            vertical-align: top;
          }
        }
      }
    }

    .cover_txt{
      background-color: #f90;
      padding: 0 10px;
      color: #fff;
      border-radius: 5px;
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
  .upload_input{
    position: absolute;
    left: 0;
    top: 0;
    height: 40px;
    line-height: 40px;
    display: block;
    opacity: 0;
    z-index: 9;
  }
  
</style>
