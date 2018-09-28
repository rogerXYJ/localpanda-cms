<template>
	<div class="cms-page">
		<!-- 侧边栏导航，activeTitle传入1-1的格式，即可展开并高亮对应的导航 -->
		<activityAside :activeTitle="'1-5'"></activityAside>

		<div class="cms-main">
			<h3 class="text_c">配置价格</h3>
			 
			<el-form :model="formData" ref="formData" class="paddingL40">
				<el-form-item>
					<span>当前货币单位：{{currency}}</span>
					<a class="el-button el-button--primary fr" :href="'/activity/price?id='+activityId">返回价格信息维护</a>
				</el-form-item>
				
				<div class="hr"></div>
				<div>
					<span class="red">* 为避免价格公式及价格明细中总价与人均价的计算结果有偏差,现在系统要求价格必须能够整除当前人数(整除包括两位小数).
如3人价格为100是不允许的,但99.99或100.02是可以的.</span>
					<div class="setPice" v-for="(item,index) in formData.records">
						<div class="clearfix">
							<el-form-item label="Number of People：" required :key="item.key" class="fl">
								<!--<el-input class="wb60" v-model="item.capacity"></el-input>-->
								<!-- <input class="el-input__inner w120 js_validate" v-if="item.id" vType="text" type="text" vTip="请选择人数!!!" v-model="item.capacity" /> -->
								<input class="el-input__inner w120 disabled"  type="text" disabled  v-model="item.capacity"/>
							</el-form-item>
						
						
							<el-form-item label="Total Price：" required :key="item.key" class="fl ml30">
								<!--<el-input class="wb60 js_validate" v-model="item.price" ></el-input>-->
								<input class="el-input__inner w120 js_validate" vType="text" type="text" vTip="请选择价格!!!" v-model="item.price" />
							</el-form-item>
							<el-form-item label="Cost Price" :key="item.key" class="fl ml30">
								<!--<el-input class="wb60 js_validate" v-model="item.price" ></el-input>-->
								<input class="el-input__inner w120"  v-model="item.costPrice" />
							</el-form-item>
						
						
							<el-form-item class="fl padding40 ml30">
								<el-button type="primary" class="w70" v-if="index==formData.records.length-1" @click="add(formData.records)">Add</el-button>
								<el-button type="danger" class="w70" v-if="index==formData.records.length-1&&index>0" @click="del(formData.records,index)">Del</el-button>
								
								<el-button type="success" v-if="item.id" @click="upData(formData.records,index)">Update</el-button>
							</el-form-item>
						</div>
					</div>
				</div>
				<el-form-item class=" mt100" v-if="showBtn">
					<el-button type="primary" class="w120" @click="commit('formData')">提交</el-button>
				</el-form-item>
			</el-form>
		</div>
	
	</div>
</template>

<script>
	import activityAside from '@/components/common/activityAside.vue';
	import Validate from '@/panda/validate/';
	export default {
		name: 'cms-setPrice',
		components: {
			activityAside,
			Validate
		},
		data() {
			let id = this.$route.query.id,
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
							costPrice:null,
							newItem:true,
							
						}
					],
				},

			}

		},
		created(){
			this.getPriceDetails()
		},
		mounted() {
		   this.getData();
		   this.fromValidate = new Validate({
		      inputClassName:'js_validate', //需要校验的input的className
		      errorClassName:'valError'  //报错时，会自动在input上添加的className
		    });
		},
		methods: {
		getPriceDetails(){
  			let self=this
  			$.ajax({
	   			url:"https://cms.localpanda.com/cms/product/activity/"+self.activityId+"/price",
	   			 dataType: 'json',
	   			 method: 'GET',
	   			 success:function(data){
	   			 	if(data&&data.minParticipants){
						self.formData.records[0].capacity=data.minParticipants
					}else{
						self.$alert('请先填写最小成团人数', {
							confirmButtonText: '确定',
							callback: action => {
							  location.href='/activity/price?id='+self.activityId
							}
						});
					}
	   			 },
	   			 error:function(data){
	   			 	self.$alert('请先填写最小成团人数', {
						confirmButtonText: '确定',
						callback: action => {
							location.href='/activity/price?id='+self.activityId
						}
					});
	   			 }
	   		})
		  },
		  //推荐价格
		// recommendPrice(){




		// },
		getData() {
				let that=this
				let records=new Array();
				$.ajax({
					url: "https://cms.localpanda.com/cms/product/activity/"+that.activityId+"/price/detail/list",
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
			add(arr,e){
				console.log()
				arr.push({
						activityId:this.activityId,
						capacity:arr[arr.length-1].capacity+1,
						price:'',
						costPrice:null,
						newItem:true,
				})
				
				this.showBtn=true
				setTimeout(()=>{
					this.fromValidate.init()
				},200)
				
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
		  				url:"https://cms.localpanda.com/cms/product/activity/"+self.activityId+"/price/detail/"+arr[index].id,
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
		  			arr.forEach(item=>{
		  				if(!item.newItem){
		  					self.showBtn=false
		  				}
		  			})
	       			console.log(self.showBtn)
	       }).catch(() => {
          self.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
  			
  		}else{
  				arr=arr.splice(index,1)
  				console.log(arr)
  				arr.forEach(item=>{
  					console.log(item)
	  				if(!item.newItem){
	  					self.showBtn=false
	  				}
	  			})
  				console.log(self.showBtn)
  		}
			},
			upData(arr,index){
					let self=this
					let postData={
						id:arr[index].id,
						capacity:arr[index].capacity,
						price:arr[index].price,
						costPrice:arr[index].costPrice?arr[index].costPrice:null,
						activityId:arr[index].activityId
					}
					$.ajax({
						method: 'POST',
	  				url:"https://cms.localpanda.com/cms/product/activity/price/detail",
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
	  						}else{
								  self.$alert(data.errorMessage, {
							          confirmButtonText: '确定',
							          callback: action => {
							            
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
						if(valid&&this.fromValidate.validate()){
							if(hasAdd){
								let postData={
									records:arr
								}
								$.ajax({
				  				method: 'PUT',
				  				url:"https://cms.localpanda.com/cms/product/activity/price/detail",
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
				  				}else{
									self.$alert(data.errorMessage, {
							          confirmButtonText: '确定',
							          callback: action => {
							            
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
<style lang="scss" scoped>
	.cms-main{
		overflow-x: hidden!important;
	}
	.box {
		padding: 20px;
		background: #f2f2f2;
	}
	.valError{
		border: 1px solid red!important;	
	}
	.vTip{
		color: red!important;
	}
	.w70{
		width: 70px!important;
	}
	.paddingL40{
	  	padding-left: 40px!important;
	  }
	 .padding40{
	  	padding-top: 40px;
	  }
	  .disabled{
		   border: 1px solid #DDD;
			background-color: #F5F5F5;
			color:#ACA899;
	  }
</style>