<template>

    <div class="cms-page">

            <cmsAside></cmsAside>

            <div class="cms-main">
                
                <h3 class="text_c fs40">Add new article</h3>
                <el-form label-width="80px" class="addarticle-form">
                    <el-form-item label="title" required>
                        <el-input v-model="title"></el-input>
                    </el-form-item>
                    <el-form-item label="keywords">
                        <el-input v-model="keywords"></el-input>
                    </el-form-item>
                    <el-form-item label="description">
                        <el-input v-model="description"></el-input>
                    </el-form-item>
                    <el-form-item label="content" required>
                        <!-- <UE :defaultContent="defaultContent" :config="ueConfig" :id="ue1" ref="ue"></UE> -->
                        <!-- <UE :config="ueConfig" :id="ueName1" ref="ue"></UE> -->
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">提交</el-button>
                    </el-form-item>
                </el-form>
                
            </div>
    </div>



</template>

<script>

import cmsAside from '@/components/public/cmsAside.vue';


export default {
  name: 'addArticle',
  components: {
      cmsAside
  },
  data () {
    return {
      title : '',
      keywords: '',
      description: '',
      content : ''
    }
  },
  mounted(){
    
  },
    methods:{
        onSubmit(){
            
        }
    }
}



</script>

<style lang="scss">
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">


.cms-aside{ float: left; width: 200px; margin-left: -220px;}
.cms-page{ padding-left: 220px;}
.cms-main{ width: 100%;}
.addarticle-form .el-input{ width: 90%; }


</style>
