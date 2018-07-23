<template>
	<div class="cms-page">
		<!-- 侧边栏导航，activeTitle传入1-1的格式，即可展开并高亮对应的导航 -->
		<cmsAside :activeTitle="activeTitle"></cmsAside>

		<div class="cms-main">
			<h3 class="text_c">配置价格</h3>
			<el-form :model="formData" :rules="rules" ref="formData">
				<el-form-item>
					<span>当前货币单位：{{currency}}</span>
					<a class="el-button el-button--primary fr" :href="'/activity/price?activityId='+activityId">返回价格信息维护</a>
				</el-form-item>
				<div class="hr"></div>
				<div class="setPice">
					<div v-for="(item,index) in formData.records">
						<el-row :gutter="24">
							<el-col :span="10">
								<el-form-item label="Number of People：" prop="capacity">
									<el-input class="wb60" v-model="item.capacity"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="10">
								<el-form-item label="Total Price：" prop="price">
									<el-input class="wb60" v-model="item.price"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="4">
								<el-form-item>
									<el-button type="danger" v-if="index>0" @click="del(formData.records,index)">Del</el-button>
									<el-button type="primary" v-if="index==0" @click="add(formData.records)">Add</el-button>
									<el-button type="success" v-if="item.id" @click="upData(formData.records,index)">Updata</el-button>
								</el-form-item>
							</el-col>
						</el-row>
					</div>
				
						<el-form-item class="text_c mt100" v-if="showBtn">
							<el-button type="primary" class="w120" @click="commit('formData')">提交</el-button>
						</el-form-item>
				
				</div>
				
			</el-form>
		</div>
	
	</div>
</template>

<script>
	import cmsAside from '@/components/common/cmsAside.vue';

	export default {
		name: 'cms-setPrice',
		components: {
			cmsAside
		},
		data() {
			let id = this.$route.query.activityId,
				currency = this.$route.query.currency;

			return {
				activeTitle: '4-4',
				activityId: id,
				currency: currency,
				showBtn:false,
				formData: {
					records: [
						{
							activityId:id,
							capacity:'',
							price:'',
							newItem:true,
							
						}
					],
				},
				rules:{
//					capacity:{required: true, message: '请填写人数！！！',trigger: 'blur'},
//					price:{required: true, message: '请填写价格！！！',trigger: 'blur'}
				}
			}

		},

		mounted() {
			this.getData()
		},
		methods: {
			getData() {
				let that=this
				let records=new Array();
				$.ajax({
					url: "https://api.localpanda.com/cms/product/activity/"+that.activityId+"/price/detail/list",
					dataType: 'json',
					method: 'GET',
					success: function(data) {
							if(data&&data.length>0){
								//console.log(self.formData)
								that.formData.records=data
								
							}
							for(var i=0;i<that.formData.records.length;i++){
								if(that.formData.records[i].newItem){
									that.showBtn=true
								}
							}
					},
					error: function(data) {

					}

				})
			},
			add(arr){
					arr.push({
							activityId:this.activityId,
							capacity:'',
							price:'',
							newItem:true,
					})
					this.showBtn=true
			},
			del(arr,index){
					let self=this
  			if(!arr[index].newItem&&arr[index].capacity&&arr[index].price){
  				self.$confirm('请确定是否进行删除？', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning', 
	       }).then(()=>{
	       		$.ajax({
		  				method: 'DELETE',
		  				url:"https://api.localpanda.com/cms/product/activity/"+self.activityId+"/price/detail/"+arr[index].id,
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
		  					alert("参数错误！！")
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
			upData(arr,index){
					let self=this
					let postData={
						id:arr[index].id,
						capacity:arr[index].capacity,
						price:arr[index].price,
						activityId:arr[index].activityId
					}
					$.ajax({
						method: 'POST',
	  				url:"https://api.localpanda.com/cms/product/activity/price/detail",
	  				dataType:'json',
	  				data:JSON.stringify(postData),
	  				contentType:'application/json',
	  				success:function(data){
	  						if(data.succeed){
	  								self.$alert('您已提交成功！', {
							          confirmButtonText: '确定',
							          callback: action => {
							            self.getData()
							          }
							       });
	  						}
	  				},
	  				error:function(data){
	  					
	  				}
					})
			},
			commit(formName){
					let self=this
					let hasAdd=false;
					var arr=[]
					for(var i=0;i<self.formData.records.length;i++){
						if(self.formData.records[i].newItem){
							arr.push(self.formData.records[i])
							hasAdd=true
						}
					}
					self.$refs[formName].validate((valid) =>{
						if(valid){
							if(hasAdd){
								let postData={
									records:arr
								}
								$.ajax({
				  				method: 'PUT',
				  				url:"https://api.localpanda.com/cms/product/activity/price/detail",
				  				dataType:'json',
				  				data:JSON.stringify(postData),
				  				contentType:'application/json',
				  				success:function(data){
				  					if(data.succeed){
				  						self.$alert('您已提交成功！', {
							          confirmButtonText: '确定',
							          callback: action => {
							            self.getData()
							          }
							       });
				  					}
				  					 
				  				},
				  				error:function(data){
				  					
				  				}
				  				
				  			});
							}
								
						}
					})
			}
		},
		watch: {

		},
		head() {
			return {
				title: this.title
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
	.box {
		padding: 20px;
		background: #f2f2f2;
	}
	


</style>