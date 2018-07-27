<template>
  <div class="cms-page">
    <!-- 侧边栏导航，activeTitle传入1-1的格式，即可展开并高亮对应的导航 -->
   <!-- <cmsAside :activeTitle="activeTitle"></cmsAside>-->
    <activityAside :activeTitle="'1-4'"></activityAside>

    <div class="cms-main">
      <h3 class="text_c">内容信息</h3>
	  <el-form :model="formData" class="mt40">
	  	<el-form-item  label="活动包含Inclusions: " label-width="200px">
	  		<div class="item fl wb90 pb30" v-for="(item,index) in formData.Inclusions">
	  			<el-input class="wb60" v-model="item.title"></el-input>
	  			<el-button type="success" class="ml20" v-if="!item.newItem" @click="updata(formData.Inclusions,index)">Update</el-button>
	  			<el-button type="primary" class="ml20" @click="commit(formData.Inclusions,index,'ITEMS_INCLUDED')" v-else>Commit</el-button>
	  			<el-button type="danger" v-if="index>0" @click="del(formData.Inclusions,index)">Del</el-button>
	  			<el-input class="mt20 wb60" type="textarea" :rows="8" v-model="item.content"></el-input>
	  		</div>
	  		<div class="text_c wb60">
	  			<el-button type="primary" @click="add(formData.Inclusions)" plain class="mt30">Add</el-button>
	  		</div>
	  	</el-form-item>
	  	<el-form-item  label="活动不包含Exclusions:" label-width="200px">
	  		<div class="item fl wb90 pb30" v-for="(item,index) in formData.Exclusions">
	  			<el-input class="wb60" v-model="item.title"></el-input>
	  			<el-button type="success" class="ml20" v-if="!item.newItem" @click="updata(formData.Exclusions,index)">Update</el-button>
	  			<el-button type="primary" class="ml20" @click="commit(formData.Exclusions,index,'ITEMS_EXCLUDED')" v-else>Commit</el-button>
	  			<el-button type="danger" v-if="index>0" @click="del(formData.Exclusions,index)">Del</el-button>
	  			<el-input class="mt20 wb60" type="textarea" :rows="8" v-model="item.content"></el-input>
	  		</div>
	  		<div class="text_c wb60">
	  			<el-button type="primary" plain class="mt30" @click="add(formData.Exclusions)">Add</el-button>
	  		</div>
	  	</el-form-item>
	  	<el-form-item  label="注意事项Additional Info: " label-width="200px">
	  		<div class="item fl wb90 pb30" v-for="(item,index) in formData.AdditionalInfo">
	  			<el-input class="wb60" v-model="item.title"></el-input>
	  			<el-button type="success" class="ml20" v-if="!item.newItem&&item.title&&item.content" @click="updata(formData.AdditionalInfo,index)">Updata</el-button>
	  			<el-button type="primary" class="ml20" @click="commit(formData.AdditionalInfo,index,'NOTICE')" v-else>Commit</el-button>
	  			<el-button type="danger" v-if="index>0" @click="del(formData.AdditionalInfo,index)">Del</el-button>
	  			<el-input class="mt20 wb60" type="textarea" :rows="8" v-model="item.content"></el-input>
	  		</div>
	  		<div class="text_c wb60">
	  			<el-button type="primary" plain class="mt30" @click="add(formData.AdditionalInfo)">Add</el-button>
	  		</div>
	  	</el-form-item>
	  </el-form>
    </div>

  </div>
</template>

<script>
import activityAside from '@/components/common/activityAside.vue';
  

export default {
  name: 'cms-content',
  components: {
    activityAside
  },
  data () {
  	let id=this.$route.query.id;
    return{
    	//ITEMS_INCLUDED,ITEMS_EXCLUDED,NOTICE
    	activeTitle: '4-3',
    	activityId:id,
    	formData:{
    		Inclusions:[
    		{
    			titile:'',
    			content:''
    			
    		}],
    		Exclusions:[
    		{
    			title:'',
    			content:''
    		}
    		],
    		AdditionalInfo:[
    			{
    				title:'',
    				content:''
    			}
    		]
    		
    	}
    }
	
 },
  
  mounted(){
  		this.getdata()
  },
  methods:{
  	getdata(){
  		let self=this
   		$.ajax({
   			//https://cms.localpanda.com/cms/product/activity/{activityId}/{objectType}/content/list
   			url:"https://cms.localpanda.com/cms/product/activity/"+self.activityId+"/ITEMS_INCLUDED/content/list",
   			 dataType: 'json',
   			 method: 'GET',
   			 success:function(data){
   			 	console.log(data)
   			 	self.formData.Inclusions=data
   			 	if(self.formData.Inclusions.length<1){
   			 			self.formData.Inclusions.push({
   			 				title:'',
   			 				content:'',
   			 				newItem:true,
   			 			})
   			 	}
   			 },
   			 error:function(data){
   			 		
   			 }
   		})
   		$.ajax({
   			url:"https://cms.localpanda.com/cms/product/activity/"+self.activityId+"/ITEMS_EXCLUDED/content/list",
   			 dataType: 'json',
   			 method: 'GET',
   			 success:function(data){
   			 	console.log(data)
   			 	self.formData.Exclusions=data
   			 	if(self.formData.Exclusions.length<1){
   			 		self.formData.Exclusions.push({
   			 				title:'',
   			 				content:'',
   			 				newItem:true,
   			 				
   			 		})
   			 	}
   			 },
   			 error:function(data){
   			 		
   			 }
   		})
   		$.ajax({
   			url:"https://cms.localpanda.com/cms/product/activity/"+self.activityId+"/NOTICE/content/list",
   			 dataType: 'json',
   			 method: 'GET',
   			 success:function(data){
   			 	console.log(data)
   			 	self.formData.AdditionalInfo=data
   			 	if(self.formData.AdditionalInfo.length<1){
   			 		self.formData.AdditionalInfo.push({
   			 				title:'',
   			 				content:'',
   			 				newItem:true,
   			 		})
   			 	}
   			 },
   			 error:function(data){
   			 		
   			 }
   		})
  	},
  	add(arr){
  			let self=this
  			arr.push({
  				title:'',
  				content:'',
  				newItem:true,
  			})
  			
  		},
  		del(arr,index){
  			let self=this
  			if(!arr[index].newItem&&arr[index].title&&arr[index].content){
  				self.$confirm('请确定是否进行删除？', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning', 
	       }).then(()=>{
	       		$.ajax({
		  				method: 'DELETE',
		  				url:"https://cms.localpanda.com/cms/product/activity/content/"+arr[index].id,
		  				dataType:'json',
		  				success:function(data){
		  					console.log(data)
		  					if(data.succeed){
		  						arr=arr.splice(index,1)
		  						 self.$message({
					            type: 'success',
					            message: '删除成功!'
					          });
		  					}else{
		  						self.$message({
				             type: 'info',
				            	message: '删除失败!'
				          });
		  					}
		  					
		  				},
		  				error:function(data){
		  					
		  				}
		  				
		  			});
	       	
	       }).catch(() => {
          self.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
  			
  		}else{
  				arr=arr.splice(index,1)
  		}
  			
  			
  			
  		},
  		updata(arr,index){
  				let self=this
  				let formData={
  					id:arr[index].id,
  					title:arr[index].title,
  					content:arr[index].content
  				}
  				$.ajax({
  				method: 'POST',
	  				url:"https://cms.localpanda.com/cms/product/activity/content",
	  				dataType:'json',
	  				data:JSON.stringify(formData),
	  				contentType:'application/json',
	  				success:function(data){
	  					 self.$alert('您已更新成功！', {
				          confirmButtonText: '确定',
				          callback: action => {
				            self.getdata()
				          }
				       });
	  				},
	  				error:function(data){
	  						
	  				}
	  				
	  			});
	
  		},
  		commit(arr,index,type){
  			let self=this;
  			let formData={
  				activityId:self.activityId,
  				objectType:type,
  				title:arr[index].title,
  				content:arr[index].content
  			}
  			$.ajax({
  				method: 'PUT',
  				url:"https://cms.localpanda.com/cms/product/activity/content",
  				dataType:'json',
  				data:JSON.stringify(formData),
  				contentType:'application/json',
  				success:function(data){
  					 self.$alert('您已提交成功！', {
			          confirmButtonText: '确定',
			          callback: action => {
			            self.getdata()
			          }
			       });
  				},
  				error:function(data){
  					
  				}
  				
  			});
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
 
  
</style>
