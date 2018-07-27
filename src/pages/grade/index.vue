<template>
  <div class="cms-page">
    <!-- 公共导航，activeTitle用来设置导航高亮位置,第几个导航，第几个索引 -->
    <cmsAside :activeTitle="'3-1'"></cmsAside>

    <div class="cms-main">
       <h3 class="text_c">点评信息管理</h3>
       <div class="page-header clearfix">
       		<div class="text_r">
	       		<a class="fr el-button el-button--primary mr20 zindex9" href="/grade/addreview/" >点评添加</a>
	       		<!--<a class="fr el-button el-button--primary mr20 zindex9"  href="/grade/checkpending/">待审核点评列表</a>-->
       		</div>
       </div>
      <!-- 筛选 -->
      <el-form @submit.native.prevent  :model="formData" class="mt30"  label-width="100px" >
			  <el-form-item label="产品ID:">
			 		<el-input class="w220" v-model="formData.activityId" @keyup.enter.native="sumbitFn"></el-input>
			  </el-form-item>
		  <!-- <el-form-item label="User name:">
		    <el-input class="w220" v-model="formData.userName"></el-input>
		  </el-form-item>
		  <el-form-item label="发布时间:">
		   		 <el-date-picker
			      v-model="formData.date"
			      format="yyyy-MM-dd HH:ss:mm " 
			      value-format="yyyy-MM-dd HH:ss:mm"
			      type="daterange"
			      range-separator="至"
			      start-placeholder="开始日期"
			      end-placeholder="结束日期">
			    </el-date-picker>
		  </el-form-item>
		  <el-form-item label="点评状态:">
		    	<el-select v-model="formData.status">
		    		<el-option label="不限" value="0"></el-option>
		    		<el-option label="待审核" value="0"></el-option>
		    		<el-option label="审核已通过" value="1"></el-option>
		    		<el-option label="审核未通过" value="2"></el-option>
		    	</el-select>
		  </el-form-item>
		   <el-form-item label="点评星级:">
		    	<el-select v-model="formData.score">
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
		  <el-form-item label="点评图片:">
		    	<el-select v-model="formData.hasPhoto">
		    		<el-option label="有图" value="true"></el-option>
		    		<el-option label="没图" value="false"></el-option>
		    	</el-select>
		  </el-form-item>
		  <el-form-item>
		  	  <el-radio-group v-model="formData.source">
			     <el-radio  >不限</el-radio>
  				 <el-radio label="1">仅搜自添加</el-radio>
  				 <el-radio label="2">仅搜游客点评</el-radio>
			  </el-radio-group> 
		  </el-form-item> -->
		 <el-form-item>
		    	<el-button @click="sumbitFn" type="primary">查询</el-button>
		 </el-form-item>
      </el-form> 
    
    <div class="hr"></div>
	<!-- 列表 -->
	<div class="keyword-table-box pb40" v-show="showlist">
		<h5 class="clearfix">活动产品列表 <span class="fr">共计{{tableData.length}}条</span></h5>
		<el-table :data="tableData"   border class="keyword-table mt30"  empty-text="没有匹配数据！！！" >
			 <el-table-column align="center" prop="id" label="点评 ID" width="70"></el-table-column>	
			 <el-table-column prop="content" label="内容" ></el-table-column>	
			 <el-table-column align="center" prop="activityId" label="产品ID" width="70"></el-table-column>	
			 <el-table-column align="center" prop="status" label="状态" width="100">
			 		<template slot-scope="scope" >
						<span>{{status[scope.row.status]}}</span>
					</template>	
			 </el-table-column>	
			 <el-table-column align="center" prop="userName" label="User name" width="100"></el-table-column>
			 <el-table-column align="center" prop="source" label="来源" width="100">
			 	<template slot-scope="scope" >
						<span>{{scope.row.source?source[scope.row.source-1]:'-'}}</span>
					</template>	
			 </el-table-column>
			 <el-table-column align="center" prop="createTime" label="创建时间" width="160"></el-table-column>
			<el-table-column align="center" label="操作" width="90">
				<template slot-scope="scope" class="text_c">
					<a class="btn_text "  :href="'/grade/addreview?id='+scope.row.id">明细</a>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination
		  background
		  layout="prev, pager, next"
		  :total="tableData.length"
		  @current-change="pageChange"
		   class="mt30">
		</el-pagination>
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
    	formData:{
    		activityId:null,
//  		userName:null,
//  		hasPhoto:null,
//  		source:null,
//  		score:null,
//  		hasPhoto:null,
//  		status:null,
    		pageNum:1,
    		pageSize:20,
    	},
    	status:["未审核","审核通过","审核不通过"],
    	source:["自添加","游客点评"],
    	tableData:[],
    	showlist:false
    };
  },
  mounted() {
    

  },
  methods: {
  	sumbitFn(){
  		console.log(111)
  		let postUrl='https://cms.localpanda.com/cms/user/comment/list',
  		self=this,
  		formData=this.formData,
  		contentType='application/json; charset=UTF-8';
  		
  		$.ajax({
  			url: postUrl,
			type: 'POST',
			dataType: 'json', //如果跨域用jsonp
			data: JSON.stringify(formData),
			contentType: contentType,
			success: function(data) {
					console.log(data)
					
				var resData = data;
			
				if(resData.length>0) {
					self.showlist=true
					self.tableData=resData
				} else {
					alert('没有相关点评!');
					this.showlist=false
				}
			},
			error: function() {
				alert('请求失败！');
			}
  	})
  	},
  	pageChange(val){
  		this.formData.pageNum=val;
  		this.sumbitFn()
  	}
  }
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.modal-body a{ color: #09c;}

</style>
