<template>
  <div class="cms-page">
    <cmsAside :activeTitle="'5-2'"></cmsAside>
		
		<div class="box">
			<h3 class="text-center">重置密码</h3>
			<el-form :model="formData" status-icon ref="formData" :rules="rules" label-width="80px">
			
				 <el-form-item label="密码" prop="password">
				    <el-input type="password" v-model="formData.password" auto-complete="off"></el-input>
				  </el-form-item>
				  <el-form-item label="确认密码" prop="checkPassword">
				    <el-input type="password" v-model="formData.checkPassword" auto-complete="off"></el-input>
				  </el-form-item>
				  <el-form-item class="text_c">
				  	<el-button type="primary" @click="sumbitFn('formData')">提交</el-button>
				  </el-form-item>
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
          callback(new Error('请输入密码'));
        } else {
          if (this.formData.checkPassword !== '') {
            this.$refs.formData.validateField('checkPassword');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
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
	          	let data = 	JSON.parse(window.localStorage.getItem("data"))
	          	let postData={
	          		id:data.id,
	          		userName:data.userName,
	          		password:self.formData.checkPassword,
	          		valid:data.valid
	          	}
	            $.ajax({
	            	url:'https://api.localpanda.com/cms/account',
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
			        	}
			        },
			        error:function(data){
			        	
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
  		margin: 200px auto 0;
  		width: 350px;
  		h3{
  			padding-left: 70px;
  			text-align: center;
  		};
  			
  }
  
</style>
