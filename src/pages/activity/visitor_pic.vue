<template>
  <div class="cms-page">
    <!-- 侧边栏导航，activeTitle传入1-1的格式，即可展开并高亮对应的导航 -->
    <activityAside :activeTitle="'1-7'"></activityAside>

    <div class="cms-main">

      <h3 class="text_c">游客图片管理 -- 功能暂时不做</h3>
      

      <!-- <el-form label-width="150px">
        <el-form-item label="产品图片：">
          <el-button type="primary" @click="showDialogTip = false">添加图片<input class="upload_input" type="file" @change="imgChange"></el-button>
        </el-form-item>

        
        

      </el-form>

      <ul class="img_list">
        <li v-for="(items,index) in imgList" :key="index">
          <img :src="items.src" width="100%" alt="">
          <div class="img_list_info">
            <div class="list_top">
              <el-button class="fr" type="text" size="small" @click="del(items,index)">删除</el-button>
              <el-button type="text" size="small" v-if="!items.file">设为封面</el-button>
            </div>
            <div class="ranking mt15">权重：
              <el-select v-model="items.ranking" style="width:110px;" size="small">
                <el-option :label="item" :value="item" v-for="item in 7" :key="item">{{item}}</el-option>
              </el-select>
            </div>
            <div class="list_bot mt30" v-if="items.file">
              <el-button type="primary" size="small" :loading="items.loading">开始上传</el-button>
            </div>
            <div class="list_bot mt30" v-else>
              <el-button type="primary" size="small" plain>重新上传<input class="upload_input" type="file" @change="newChange"></el-button>
              <el-button type="primary" size="small" :loading="items.loading">更新</el-button>
            </div>
          </div>
        </li>
      </ul> -->
      

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

      imgList:[
        {
          ranking:7,
          isCover:false,
          objectId:1544544,
          src:'https://resource.localpanda.cn/testing/activity/itineraries/500236.jpg',
          loading:false
        }
      ]
    }


  },
  computed:{
    
  },
  
  methods:{
    imgChange(e){
      var thisFile = e.target.files.item(0);

      alert('游客照片功能，暂时不做！');
      return;
      this.imgList.push({
        ranking: 7,
        isCover: false,
        objectId: 1544544,
        src: window.URL.createObjectURL(thisFile),
        file: thisFile
      });
    },
    del(data,index){
      if(data.file){
        this.imgList.splice(index,1);
      }else{

      }
      
    },

    newChange(){
      console.log(222);
    },


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
            self.dialogTxt('设置成功！');
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
        files : this.file
      };
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
<style lang="scss">
  
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
        img{
          float: left;
          width: 200px;
          height: 140px;
          border: 1px solid #ddd;
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
          }
        }
      }
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
  .upload_input{
    position: absolute;
    left: 0;
    top: 0;
    height: 40px;
    line-height: 40px;
    display: block;
    opacity: 0;
  }
  
</style>
