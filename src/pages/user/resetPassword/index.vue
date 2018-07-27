<template>
  <div class="cms-page">
    <cmsAside :activeTitle="'5-1'"></cmsAside>
		
		<div class="box">
			<h3>重置密码</h3>
			<el-form :model="formData" class="mt40" status-icon ref="formData" :rules="rules" label-width="80px">
			
				 <el-form-item label="新密码" prop="password">
				    <el-input type="password" v-model="formData.password" placeholder="密码长度为6~20个字符" auto-complete="off"></el-input>
				  </el-form-item>
				  <el-form-item label="确认密码" prop="checkPassword">
				    <el-input type="password" v-model="formData.checkPassword" placeholder="密码长度为6~20个字符" auto-complete="off"></el-input>
				  </el-form-item>
				  <div class="text_c">
				  	<el-button type="primary" @click="sumbitFn('formData')">提交</el-button>
				  </div>
			</el-form>
		</div>
  
  </div>
</template>

<script>
import cmsAside from '@/components/common/cmsAside.vue';
export default {
  name: 'resetPassword',
  components: {
    cmsAside
  },
  data () {
  	 var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入您的新密码'));
        } else if(value.length<6||value.length>20){
        	callback(new Error('密码长度为6~20个字符'));
        }else {
          if (this.formData.checkPassword !== '') {
            this.$refs.formData.validateField('checkPassword');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入您的新密码'));
        }else if(value.length<6||value.length>20){
        		callback(new Error('密码长度为6~20个字符'));
        } else if (value !== this.formData.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
    return {
      formData:{
      	password:'',
      	checkPassword:'',
      },
      rules: {
          password: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPassword: [
            { validator: validatePass2, trigger: 'blur' }
          ],
        }
      }
    
  },
  head(){
    return {
     	
    }
  },
  mounted(){

  },
  methods:{
    	sumbitFn(formName){
    		let self=this
	    	this.$refs[formName].validate((valid) => {
	          if (valid) {
	          	let userName = 	window.localStorage.getItem("userName")
	          	let postData={
	          		userName: userName,
	          		password: self.formData.checkPassword
	          	}
	            $.ajax({
	            	url:'https://cms.localpanda.com/cms/account',
	            	type: 'POST',
			        contentType: 'application/json',
			        data:JSON.stringify(postData),
			        success:function(data){
			        	if(data.succeed){
			        		self.$alert('密码修改成功！', {
					          confirmButtonText: '确定',
					          callback: action => {
					           	 location.href="/"
					          }
					        });
			        	}else{
									self.$alert('密码修改失败！', {
					          confirmButtonText: '确定'
					        });
								}
			        },
			        error:function(data){
			        	self.$alert('密码修改失败！', {
					          confirmButtonText: '确定'
					        });
			        }
	            })
	          } else {
	            console.log('error submit!!');
	            return false;
	          }
	        });
    	},
  }
}

</script>

<style lang="css">
  
</style>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .box{
  		padding: 40px;
  		margin: 200px auto 0;
  		width: 350px;
  		background: #f2f2f2;
  		h3{
  			text-align: center;
  		};
  		.margin0{
  			margin-left: 0!important;
  		}
  			
  }
  
</style>
