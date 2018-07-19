<template>
  <div class="cms-page">
    <!-- 侧边栏导航，activeTitle传入1-1的格式，即可展开并高亮对应的导航 -->
    <cmsAside :activeTitle="activeTitle"></cmsAside>

    <div class="cms-main">
      <h3 class="text_c">价格信息</h3>
	  <el-form :model="formData" class="mt40">
	  	<el-form-item label="货币类型Currency:">
	  		 <el-select v-model="formData.currency" placeholder="请选择币种">
		      <el-option label="USD" value="USD"></el-option>
		      <el-option label="CNY" value="CNY"></el-option>
		    </el-select>
		    <a class="el-button el-button--primary fr" href="/activity/setPrice/">价格设置</a>
		    <!--<el-button type="primary" class="fr"></el-button>-->
	  	</el-form-item>
	  	<div class="box">
	  		 	<label style="display:inline-block; width: 100px;text-align: right;">退改规则:</label>
			    <el-form-item label="时间:" class="mt20" label-width="100px">
		  		 	<el-input class="w220"></el-input> /天
		  		</el-form-item>
	  			<el-form-item label="细则说明:" label-width="100px">
		  		 	<el-input class="wb60" type="textarea" :rows="7"></el-input>
		  		</el-form-item>
	  	</div>
	  	<el-row :gutter="20">
		  <el-col :span="6">
		  	<el-form-item label="儿童年龄Child standard:" class="mt20">
	  			<el-input class="w220"></el-input>
	  		</el-form-item>
		  </el-col>
		  <el-col :span="6">
		  	<el-form-item label="儿童差价Child discount：" class="mt20">
		  		<el-input class="w220"></el-input>
		  	</el-form-item>
		  </el-col>
		</el-row>
		
		<el-row :gutter="20">
		  <el-col :span="6">
		  	<el-form-item label="原始价格Original Price：" class="mt40">
		  		
		  		<el-input class="w220"></el-input>
		  		
		  	</el-form-item>
		  </el-col>
		  <el-col :span="6">
		  	<el-form-item label="最低价格Bottom Price：" class="mt40">
		  		<span>xxx</span>
		  	</el-form-item>
		  </el-col>
		</el-row>
	  	<el-row :gutter="20">
		  <el-col :span="6">
		  	<el-form-item label=" 最小成团人数minimum:" class="mt20">
		  		
		  		<span>xxx</span>
		  		
		  	</el-form-item>
		  </el-col>
		  <el-col :span="6">
		  	<el-form-item label="最大接待人数maximum:" class="mt20">
		  		<span>xxx</span>
		  	</el-form-item>
		  </el-col>
		</el-row>
	  	<el-form-item label="费用说明Additional instructions：">
	  		<el-input type="textarea" :rows="7"></el-input>
	  	</el-form-item>
	  	<el-form-item class="text_c mt40">
	  		<el-button type="primary">提交</el-button>
	  	</el-form-item>
	  </el-form>
    </div>

  </div>
</template>

<script>
import cmsAside from '@/components/common/cmsAside.vue';
  

export default {
  name: 'cms-price',
  components: {
    cmsAside
  },
  data () {
    return{
    	activeTitle: '4-4',
    	formData:{
    		currency:'',
    		
    	}
    }
	
 },
  
  mounted(){
// 		$.ajax({
// 			url:"https://api.localpanda.com/cms/product/activity/content/11015/ITEMS_INCLUDED",
// 			 dataType: 'json',
// 			 method: 'GET',
// 			 success:function(data){
// 			 	console.log(data)
// 			 	formData.Inclusions=data
// 			 },
// 			 error:function(data){
// 			 	
// 			 }
// 			
// 			
// 		})
  },
  methods:{
  		
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
	.box{
		padding: 20px;
		background: #f2f2f2;
	}
  
</style>
