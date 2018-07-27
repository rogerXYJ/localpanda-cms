<template>
  <div class="cms-page">
    <!-- 公共导航，activeTitle用来设置导航高亮位置,第几个导航，第几个索引 -->
    <cmsAside :activeTitle="'3-1'"></cmsAside>

    <div class="cms-main">
       <h3 class="text_c">待审核点评列表</h3>
        <div class="page-header">
       		<div class="text_r">
	       		<a class=" el-button el-button--primary  zindex9"  href="/grade/index/">返回点评管理</a>
       		</div>
       	</div> 
    
	<!-- 列表 -->
		
		<el-table :data="tableData"   border class="keyword-table mt30"  empty-text="没有匹配数据！！！">
			 <el-table-column align="center" prop="id" label="点评 ID" width="70"></el-table-column>	
			 <el-table-column prop="content" label="内容" ></el-table-column>	
			 <el-table-column align="center" prop="activityId" label="产品ID" width="70"></el-table-column>	
			 <el-table-column align="center" prop="status" label="状态" width="100"></el-table-column>	
			 <el-table-column align="center" prop="userName" label="User name" width="120"></el-table-column>
			 <el-table-column align="center" prop="source" label="来源" width="70"></el-table-column>
			 <el-table-column align="center" prop="createTime" label="创建时间" width="160"></el-table-column>
			<el-table-column align="center" label="操作" width="90">
				<template slot-scope="scope" class="text_c">
					<a class="btn_text "  href="/grade/visitorsgrade">操作</a>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination
		  background
		  layout="prev, pager, next"
		  :total="tableData.length"
		   class="mt30">
		</el-pagination>
		
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
    	tableData:[{
    		id:'001',
    		content:"Food was outstanding and the show was",
    		productId:"11037",
    		status:'已审核',
    		userName:'Gladys',
    		from:'自添加',
    		time:"2018-06-20 12:00"
    	}]
    };
  },
  mounted() {
    let postData={
  		status:0
  	},
  	postUrl='https://cms.localpanda.com/cms/user/comment/list',
 	self=this,
 	contentType='application/json; charset=UTF-8';
  	$.ajax({
  		url: postUrl,
			type: 'POST',
			dataType: 'json', //如果跨域用jsonp
			data: JSON.stringify(postData),
			contentType: contentType,
			success: function(data) {
				var resData = data;
				console.log(data)
				if(resData.length>0) {
					self.tableData=data
				} else {
					alert('参数错误！');
					
				}
			},
			error: function() {
				alert('请求失败！');
			}
  	})


  },
  methods: {
  }	
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.modal-body a{ color: #09c;}

</style>
