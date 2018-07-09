<template>
  <div class="cms-page">
    <!-- 公共导航，activeTitle用来设置导航高亮位置,第几个导航，第几个索引 -->
    <cmsAside :activeTitle="'3-1'"></cmsAside>

    <div class="cms-main">
       <h3 class="text_c">审核游客点评</h3>
        <div class="page-header">
       		<div class="text_r">
	       		<a class="el-button el-button--primary zindex9"  href="/grade/checkpending/">待审核点评列表</a>
       		</div>
       	</div> 
    		<div class="mt20">
    			<el-row>
						  <el-col :span="12">
						  	
						  	<div class="grid-content bg-purple fs14 mt20"><label><b class="red">*</b> 点评ID: </label>111</div>
						  </el-col>
						  <el-col :span="12"><div class="grid-content bg-purple-light fs14 mt20"><label><b class="red">*</b> 关联产品: </label>222</div></el-col>
					</el-row>
					<el-row>
						  <el-col :span="24"><div class="grid-content bg-purple fs14 mt20"><label><b class="red">*</b> 产品名称: </label>Ancient and Modern: The Two Sides of Shanghai</div></el-col>
					</el-row>
					<el-row>
						  <el-col :span="12"><div class="grid-content bg-purple fs16 mt20"><label><b class="red">*</b> 用户名称: </label>333</div></el-col>
						  <el-col :span="12"><div class="grid-content bg-purple-light fs14 mt20"><label><b class="red">*</b> 发布时间: </label>444</div></el-col>
					</el-row>
					<div class="hr"></div>
					<label class="fs14"><b class="red">*</b> 点评正文</label>
					<p class="fs14 mt20">Eat your way around Beijing's old 'hutong' alleyways and courtyards on a 4-hour small-group tour. Explore by private tuk tuk and enjoy up to five food stops at tucked-away restaurants and homes you wouldn't find by yourself. Taste staples like Beijing wraps, flame-grilled meats, and noodles, learn about local cuisine over unlimited beers and sodas, and enjoy a last beer stop at an Arrow Brewing Factory bar. Come hungry: your tastings amount to dinner.</p>
    			<el-row>
						  <el-col :span="24">
						  	<div class="grid-content bg-purple fs14 mt20">
						  		<label><b class="red">*</b> 点评星级: </label>
						  		<el-rate class="inline_block"
									  v-model="value"
									  disabled
									  text-color="#ff9900"
									>
									</el-rate>
						  	</div>
						  </el-col>
					</el-row>
					
    		</div>
    	
				
		
		
		
   </div>

  </div>
</template>

<script>
import cmsAside from "@/components/common/cmsAside.vue";


export default {
  name: "grade",
  components: {
    cmsAside,
  },
  data() {
    return {
    	value:5
    }
  },
  mounted() {
    

  },
  methods: {}
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.modal-body a{ color: #09c;}

</style>
