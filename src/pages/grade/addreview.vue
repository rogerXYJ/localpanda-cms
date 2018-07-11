<<template>
	<div class="cms-page">
		<!-- 公共导航，activeTitle用来设置导航高亮位置,第几个导航，第几个索引 -->
		<cmsAside :activeTitle="'3-1'"></cmsAside>

		<div class="cms-main">
			<h3 class="text_c">{{ruleForm.id?'编辑自添加点评':'自添加点评'}}</h3>
			<div class="page-header">
				<div class="text_r">
					<!--<a class="el-button el-button--primary zindex9" href="/grade/checkpending/">待审核点评列表</a>-->
					<a class="el-button el-button--primary zindex9" href="/grade/index/">返回点评列表</a>
				</div>
			</div>
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="mt40">
				<el-form-item label="关联产品: " prop="activityId">
					<el-input class="w220 mr30" v-model="ruleForm.activityId"></el-input>
					<span>请输入需要被添加点评的产品ID</span>
				</el-form-item>
				<div class="upload_box">
					<el-form-item label="点评正文: " prop="content">
						<el-col :span="10">
							<el-input type="textarea" rows="4" v-model="ruleForm.content"></el-input>
						</el-col>
					</el-form-item>

					<el-form-item label="点评星级: " prop="score">
						<el-select class="w220" v-model="ruleForm.score">
							<el-option label="不限" value="null"></el-option>
							<el-option label="五星" value="10"></el-option>
							<el-option label="四星半" value="9"></el-option>
							<el-option label="四星" value="8"></el-option>
							<el-option label="三星半" value="7"></el-option>
							<el-option label="三星" value="6"></el-option>
							<el-option label="二星半" value="5"></el-option>
							<el-option label="二星" value="4"></el-option>
							<el-option label="一星半" value="3"></el-option>
							<el-option label="一星" value="2"></el-option>
							<el-option label="半星" value="1"></el-option>
						</el-select>
					</el-form-item>
				</div>
				<el-form-item label="用户名称: " prop="userName">

					<el-input class="w220" v-model="ruleForm.userName"></el-input>

				</el-form-item>
				<el-form-item label="发布时间: " prop="createTime">
					<el-date-picker class="w220" type="datetime" placeholder="选择日期" format="yyyy-MM-dd HH:ss:mm " value-format="yyyy-MM-dd HH:ss:mm" v-model="ruleForm.createTime"></el-date-picker>
				</el-form-item>

				<el-form-item label="头像：">
					<el-col :span="4">
						<div class="avatar-uploader">
							<div class="el-upload el-upload--text">
								<img v-if="imageUrl " :src="imageUrl" class="avatar">
								<i v-else class="el-icon-plus avatar-uploader-icon"></i>
								<input id="headPicFile" type="file" @change="upload" />
							</div>
						</div>
					</el-col>
					<el-col :span="5">
						<input type="file" name="" id="" value="" @change="upload" />
					</el-col>
				</el-form-item>
				<div class="upload_box clearfix">
					<p class="ml20 wb90">图片：每个点评最多可以添加6张图片，您可以点击右侧"添加图片按钮"进行添加多张
						<span class="add fr" v-if="fileDatas.length<6">
							<el-button  type="text">添加图片</el-button>
						    <input type="file" @change="uploadImsList" multiple/>
						</span>
						<span v-else><el-button  class="fr" disabled type="text">添加图片</el-button></span>
					</p>

					<div class="hr"></div>
					<div class="uploadImgs clearfix">
						<div class="avatar-uploader">
							<div class=" el-upload--text ml30 fl" v-for="(i,index) in imageList">
								<div class='el-upload'>
									<img v-if="imageList.length>0" :src="i.url" class="avatar">
									<div v-else class="el-icon-plus avatar-uploader-icon"></div>
								</div>
								<div class="add">
									<span class="el-button el-button--primary el-button--mini">选择文件</span>
									<input type="file" name="" id="" value="" @change="uploadImg($event,index)" />
									<span @click="del(index)" class="el-button el-button--primary el-button--mini ml30">删除</span>
								</div>

							</div>

						</div>
					</div>
				</div>
				<el-form-item label="点评状态: " prop="status">

					<el-radio-group v-model="ruleForm.status">
						<el-radio :label="0">待审核</el-radio>
						<el-radio :label="1">审核通过</el-radio>

					</el-radio-group>

				</el-form-item>
				<el-form-item class="text_c mt30">
					<p class="red" v-if="err">有必填项未填写！！！</p>
					<el-button type="primary" @click="sumbitFrom('ruleForm')">提交</el-button>

				</el-form-item>

			</el-form>

		</div>
	</div>
	</template>

	<script>
		import cmsAside from "@/components/common/cmsAside.vue";

		export default {
			name: "addreview",
			components: {
				cmsAside,
			},
			data() {
				let checkCreateTime = (rule, value, callback) => {
					if(value === '') {
						return callback(new Error('请选择日期'));
					} else {
						callback()
					}
				}
				let id = this.$route.query.id
				return {
					ruleForm: {
						id: id,
						activityId: '', //关联产品ID
						content: '', //点评内容	
						score: '', //评分
						userName: '', //用户名称
						createTime: '', //发布时间

						status: 0, //点评审核状态
						source: 1
						//file:'',
					},
					rules: {
						activityId: {
							required: true,
							message: '产品ID不存在！！',
							trigger: 'blur'
						},
						content: {
							required: true,
							message: '请填写评论！！',
							trigger: 'blur'
						},
						score: {
							required: true,
							message: '请选择星级！！',
							trigger: 'change'
						},
						userName: {
							required: true,
							message: '请填写用户名称！！',
							trigger: 'blur'
						},
						createTime: {
							validator: checkCreateTime,
							message: '请选择日期',
							trigger: 'change'
						},
						status: {
							required: true,
							message: '请选择点评状态！！',
							trigger: 'change'
						}
					},
					imageUrl: '',
					imageList: [],
					fileData: '',
					addimage: true,
					fileDatas: [],
					contentType: 'application/json; charset=UTF-8',
					err: false,
					photoId:''
				}
			},
			mounted() {
				let self = this
				if(self.ruleForm.id) {
					let param = {
						id: self.ruleForm.id
					}

					$.ajax({
						url: 'https://api.localpanda.com/api/user/comment/detail/list',
						type: 'POST',
						dataType: 'json', //如果跨域用jsonp
						data: JSON.stringify(param),
						contentType: self.contentType,
						//processData: false,
						success: function(data) {
							var resData = data;

							if(resData.length > 0) {

								self.ruleForm = resData[0];
								if(resData[0].userCommentUrl) {
									self.imageList = resData[0].userCommentUrl;
									self.imageList = resData[0].userCommentPhoto.photoId;
								}

								if(resData[0].userPortraitUrl) {
									self.imageUrl = resData[0].userPortraitUrl
								}

							} else {
								alert('参数错误！');
							}
						},
						error: function() {
							alert('请求失败！');
						}
					});
				}

			},
			methods: {
				//上传头图
				uploadimg(id, file) {
					let postdata = {
						objectId: id,
						objectType: "COMMENT_PORTRAIT",
						files: file
					}
					let postUrl = ""
					if(this.ruleForm.id) {
						postUrl = "https://api.localpanda.com/api/content/photo/update"
					} else {
						postUrl = "https://api.localpanda.com/api/content/photo/commit"
					}
					let param = new FormData();
					for(let key in postdata) {
						param.append(key, postdata[key]) // 通过append向form对象添加数据
					}
					postdata = param;

					$.ajax({
						url: postUrl,
						type: 'POST',
						dataType: 'json', //如果跨域用jsonp
						data: param,
						contentType: false,
						processData: false,
						success: function(data) {
							var resData = data;
							if(resData.succeed) {

							} else {
								alert('参数错误！');
							}
						},
						error: function() {
							alert('请求失败！');
						}
					});

				},
				//上传多张图片
				uploadimgList(id, files) {
					let postdata = {
						objectId: id,
						objectType: "USER_COMMENT",
						files: files
					}
					let postUrl = "https://api.localpanda.com/api/content/photo/commit"

					let param = new FormData();
					//					for(var key in postdata){
					//						param.append(key,postdata[key])
					//					}

					param.append("objectId", postdata.objectId);
					param.append("objectType", postdata.objectType);
					postdata.files.forEach((item) => {
						param.append("files", item)
					})
					$.ajax({
						url: postUrl,
						type: 'POST',
						dataType: 'json', //如果跨域用jsonp
						data: param,
						contentType: false,
						processData: false,
						success: function(data) {
							var resData = data;
							if(resData.succeed) {

							} else {
								alert('参数错误！');
							}
						},
						error: function() {
							alert('请求失败！');
						}
					});

				},
				//提交
				sumbitFrom(formName) {
					let self = this
					self.$refs[formName].validate((valid) => {
						if(valid) {
							let formData = self.ruleForm;

							delete formData.userPortraitUrl;
							delete formData.userCommentUrl;

							//formData.createTime=formData.time+'00:00:00'
							//delete formData.time
							var postUrl = ""
							if(self.ruleForm.id) {
								postUrl = "https://api.localpanda.com/api/user/comment/update"

							} else {
								postUrl = "https://api.localpanda.com/api/user/comment/commit"
							}

							//         		let param = new FormData();
							//         		for(let key in formData){
							//		            param.append(key, formData[key])  // 通过append向form对象添加数据
							//		        }
							//         		formData = param;

							//return
							$.ajax({
								url: postUrl,
								type: 'POST',
								dataType: 'json', //如果跨域用jsonp
								data: JSON.stringify(formData),
								contentType: self.contentType,
								//processData: false,
								success: function(data) {
									var resData = data;
									let objectId = ""
									if(resData.succeed) {
										if(self.ruleForm.id) {
											objectId = self.ruleForm.id
										} else {
											objectId = data.response
										}

										if(self.fileData) {
											self.uploadimg(objectId, self.fileData)
										}

										if(self.fileDatas.length) {

											self.uploadimgList(objectId, self.fileDatas)
										}
										self.$alert('添加成功', '', {
											confirmButtonText: '确定',
											callback: action => {
												// location.href='/grade/index'
											}
										});

									} else {
										alert('参数错误！');
									}
								},
								error: function() {
									alert('请求失败！');
								}
							});

						} else {
							self.err = true
							return false;
						}
					});
				},
				del(index) {
					console.log(index)
					this.fileDatas.splice(index, 1)
					this.imageList.splice(index, 1)

				},
				//头图
				upload(e, index) {

					var file = e.target.files[0];
					const isJPG = file.type === 'image/jpeg';
					const isPNG = file.type === 'image/png';
					const isLt2K = file.size / 1024 < 200;
					if(!isJPG && !isPNG) {
						this.$message.error('上传头像图片格式不正确！');
					} else if(!isLt2K) {
						this.$message.error('上传头像图片大小不能超过 200KB!');
					} else {
						this.fileData = file
						var windowURL = window.URL || window.webkitURL;
						this.imageUrl = windowURL.createObjectURL(file);

					}

				},
				//多张图片
				uploadImsList(e) {
					let self = this
					var file = e.target.files;
					for(var i = 0; i < file.length; i++) {
						const isJPG = file[i].type === 'image/jpeg';
						const isPNG = file[i].type === 'image/png';
						const isLt2K = file[i].size / 1024 < 200;
						if(!isJPG && !isPNG) {
							self.$message.error('上传头像图片格式不正确！');
						} else if(!isLt2K) {
							self.$message.error('上传图片大小不能超过 200k!');
						} else {
							if(file.length > 6) {
								self.$message.error('最多可上传6张图片！');

							} else {
								self.fileDatas.push(file[i])
								var windowURL = window.URL || window.webkitURL;

								self.imageList.push({
									url: windowURL.createObjectURL(file[i])
								})
							}
						}
					}

				},
				//多图上传单个

				uploadImg(e, index) {
					var file = e.target.files[index];
					var self=this
					const isJPG = file.type === 'image/jpeg';
					const isPNG = file.type === 'image/png';
					const isLt2K = file.size / 1024  < 200;
					if(!isJPG && !isPNG) {
						self.$message.error('上传头像图片格式不正确！');
					} else if(!isLt2K) {
						self.$message.error('上传头像图片大小不能超过 200K!');
					} else {
						self.fileDatas[index] = file
						var windowURL = window.URL || window.webkitURL;
						this.imageList[index].url = windowURL.createObjectURL(file);
						if(self.ruleForm.id){
							let postdata = {
								objectId: self.ruleForm.id,
								objectType: "USER_COMMENT",
							
								files: file
							}
							let postUrl = "https://api.localpanda.com/api/content/photo/update"
							let param = new FormData();
							for(let key in postdata) {
								param.append(key, postdata[key]) // 通过append向form对象添加数据
							}
							postdata = param;
							$.ajax({
								url: postUrl,
								type: 'POST',
								dataType: 'json', //如果跨域用jsonp
								data: param,
								contentType: false,
								processData: false,
								success: function(data) {
									var resData = data;
									if(resData.succeed) {
										self.$message.error('图片更新成功!!');
									} else {
										alert('图片更新失败!!！');
									}
								},
								error: function() {
									alert('请求失败！');
								}
							});
						}
						
					}
				}
			},
			watch: {

			}
		};
	</script>

	<!-- Add "scoped" attribute to limit CSS to this component only -->
	<style lang="scss">
		.modal-body a {
			color: #09c;
		}
		
		.upload_box {
			padding: 20px 0 5px;
			background-color: #f2f2f2;
			margin-bottom: 30px;
		}
		
		.avatar-uploader .el-upload {
			border: 1px dashed #d9d9d9;
			border-radius: 6px;
			cursor: pointer;
			position: relative;
			overflow: hidden;
		}
		
		.avatar-uploader .el-upload:hover {
			border-color: #409EFF;
		}
		
		.avatar-uploader-icon {
			font-size: 28px;
			color: #8c939d;
			width: 178px;
			height: 178px;
			line-height: 178px!important;
			text-align: center;
		}
		
		.el-button--text {
			padding: 0;
		}
		
		.avatar {
			width: 178px;
			height: 178px;
			display: block;
		}
		
		#headPicFile {
			position: absolute;
			width: 100%;
			height: 100%;
			left: 0;
			top: 0;
			opacity: 0;
		}
		
		.add {
			position: relative;
			overflow: hidden;
			input {
				position: absolute;
				left: 0;
				top: 0;
				opacity: 0;
				width: 80px;
				height: 30px;
			}
		}
		
		.padding {
			padding: 6px 10px!important;
		}
		
		.uploadImgs {
			padding-bottom: 30px;
		}
	</style>