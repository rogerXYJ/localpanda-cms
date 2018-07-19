<template>
  <div class="cms-page">
    <!-- 侧边栏导航，activeTitle传入1-1的格式，即可展开并高亮对应的导航 -->
    <cmsAside :activeTitle="activeTitle"></cmsAside>

    <div class="cms-main">
      <h3 class="text_c">配置价格</h3>
	  
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
