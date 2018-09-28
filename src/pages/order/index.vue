<template>
    <div class="cms-page">
         <cmsAside :activeTitle="'6-1'"></cmsAside>
         <div class="cms-main">
             <h3 class="text_c">订单查询</h3>
             <el-form :model="formData" label-width="120px">
                  <el-form-item  class="inline" label="订单ID:">
                     <el-input v-model="formData.orderId" class="w220"></el-input>
                 </el-form-item>
                 <el-form-item label="活动ID:" class="inline">
                     <el-input v-model="formData.activityId" class="w220"></el-input>
                 </el-form-item>
                
                <el-form-item label="订单状态:">
                   <el-checkbox-group v-model="formData.status">
                    <!-- <el-checkbox v-for="item in status" :key="item" :label="item">{{item}}</el-checkbox>  -->
                    <div class="checkboxItem">
                         <el-checkbox key="PAYMENT_PENDING" label="PAYMENT_PENDING">PAYMENT_PENDING (待支付)</el-checkbox>
                         <el-checkbox key="PAYMENT_SUCCESS" label="PAYMENT_SUCCESS">PAYMENT_SUCCESS (已支付待资审)</el-checkbox>
                    </div>
                    <div class="checkboxItem">
                         <el-checkbox key="CONFIRM_WAITING" label="CONFIRM_WAITING">CONFIRM_WAITING (资审中待确认)</el-checkbox>
                         <el-checkbox key="BOOKING_SUCCESS" label="BOOKING_SUCCESS">BOOKING_SUCCESS (已确认)</el-checkbox>
                    </div>
                    <div class="checkboxItem">
                         <el-checkbox key="COMPLETED" label="COMPLETED">COMPLETED (已出游)</el-checkbox>
                        <el-checkbox key="CANCELED" label="CANCELED">CANCELED (已取消)</el-checkbox>
                         
                    </div>
                    <div class="checkboxItem">
                        <el-checkbox key="REFUNDING" label="REFUNDING">REFUNDING (退款中)</el-checkbox>
                         <el-checkbox key="REFUNDED" label="REFUNDED">REFUNDED (已退款)</el-checkbox>
                        
                    </div>

                </el-checkbox-group>
                </el-form-item>
                 <el-form-item label="设备类型:" class="inline">
                     <el-select v-model="formData.deviceType">
                            <el-option value="PC" label="PC"></el-option>
                            <el-option value="MOBILE" label="MOBILE"></el-option>
                             <el-option value="IPAD" label="IPAD"></el-option>
                        </el-select>
                 </el-form-item>
                  <el-form-item label="邮箱:" class="inline">
                    <el-input v-model="formData.emailAddress" class="w320"></el-input>
                </el-form-item>
                <el-form-item label="出行日期:">
                  
                    <el-date-picker type="date" placeholder="出行起始日期" v-model="formData.travelStartDate" class="w220" format="yyyy-MM-dd" 
			        value-format="yyyy-MM-dd"></el-date-picker>
                    -
                    <el-date-picker type="date" placeholder="出行截止日期" v-model="formData.travelEndDate" class="w220" format="yyyy-MM-dd" 
			        value-format="yyyy-MM-dd"></el-date-picker>
                    
                </el-form-item>
                  <el-form-item label="创建日期:">
                  
                    <el-date-picker type="date" placeholder="订单创建起始日期" v-model="formData.startDate" @change="datefn(1)" class="w220" format="yyyy-MM-dd" 
			        value-format="yyyy-MM-dd"></el-date-picker>
                    -
                    <el-date-picker type="date" placeholder="订单创建截止日期" v-model="formData.endDate" @change="datefn(2)" class="w220" format="yyyy-MM-dd" 
			        value-format="yyyy-MM-dd"></el-date-picker>
                    
                </el-form-item>
                <el-form-item label="是否包含测试单: ">
                    <el-radio-group v-model="formData.includeTest">
					    <el-radio :label="true">是 </el-radio>
					    <el-radio :label="false">否</el-radio>
					  </el-radio-group>
                </el-form-item>
               
                 <el-form-item>
                        <el-button @click="sumbitFn" type="primary">查询</el-button>
                </el-form-item>
             </el-form>

          
           <div class="keyword-table-box pb40" v-show="showlist">
            <div class="hr"></div>
            <h5 class="clearfix" style="line-height:40px">订单列表 
                <a class="btn_text ml30" @click="downLoad">下载</a> 
            
                <span class="fr">
                     <span class="mr20">
                        <label>排序:</label>
                        <el-select v-model="formData.sort" @change="change">
                            <el-option value="CREATE_TIME" label="CREATE_TIME"></el-option>
                            <el-option value="START_DATE" label="START_DATE"></el-option>
                        </el-select>
                    </span>
                    共计{{records}}条
                </span>
            </h5>
            <el-table :data="tableData"   border class="keyword-table mt30" style="max-width:100%" empty-text="没有匹配数据！！！">
                
                <el-table-column  label="操作" width="140">
                    <template slot-scope="scope" class="pd30">
                        <a class="btn_text" :href="'/order/orderDetails?id='+scope.row.orderId">明细</a>
                         <a class="btn_text"  @click="btnFn(scope)" v-show="btnText(scope)" >{{btnText(scope)}}</a>
                       
                    </template>
                </el-table-column>
                 
                <el-table-column align="center" prop="orderId" label="Order ID" width="120"></el-table-column>	
                <el-table-column align="center" prop="status" label="Status" width="180"></el-table-column>	
                <el-table-column prop="activityId" label="Activity ID" width="100"></el-table-column>	
                <el-table-column align="left" label="Amount" width="140">
                     <template slot-scope="scope" class="text_c">
                       <span>{{scope.row.currency}} {{scope.row.symbol}} {{scope.row.amount}}</span>
                    </template>
                </el-table-column>	
               
                <el-table-column align="left"  label="Travelers" width="160">
                    <template slot-scope="scope" >
                        <span>{{scope.row.adultNum}} {{scope.row.adultNum==1?'adult':'adults'}}  {{scope.row.childrenNum?' , '+scope.row.childrenNum:''}} {{scope.row.childrenNum?(scope.row.childrenNum==1?"child":"children"):''}}</span>
                    </template>	 
                </el-table-column>
                <el-table-column align="center" prop="startDate" label="Travel Date" width="120"></el-table-column>
                <el-table-column align="center" prop="createTime" label="Create Time (Beijing Time)"  width="200"></el-table-column>
                <el-table-column align="center" prop="deviceType" label="Device" width="120"></el-table-column>
    
                <el-table-column align="center" prop="contactInfo.emailAddress" label="Email" width="350"></el-table-column>
                 <el-table-column align="center"  label="Offline" width="90">
                     <template slot-scope="scope" >
                        <span>{{scope.row.offline?'Y':' '}}</span>
                    </template>	 
                 </el-table-column>
                
            </el-table>
            <el-pagination
            background
            layout="prev, pager, next"
            :total="records"
            :page-size="20"
            :current-page="pageNum"
            @current-change="pageChange"
            class="mt30">
            </el-pagination>
        </div>
        
        <!-- <button @click="downLoad">xiazai</button> -->
        
         </div>
         <!-- <el-dialog title="线下搬单" :visible.sync="dialogFormVisible" :show-close="showclose">
            <el-form :model="form" :rules="rules" ref="ruleForm">
                <el-form-item label="支付平台" :label-width="formLabelWidth" prop="paymentPlatform">
                   <el-select v-model="form.paymentPlatform" placeholder="请选择支付平台">
                        <el-option label="BRAINTREE" value="BRAINTREE"></el-option>
                        <el-option label="STRIPE" value="STRIPE"></el-option>
                        <el-option label="WECHAT" value="WECHAT"></el-option>
                        <el-option label="ALIPAY" value="ALIPAY"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="支付序列号" :label-width="formLabelWidth" prop="paySerial">
                    <el-input class="w220" v-model="form.paySerial" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="falseFn('ruleForm')">取 消</el-button>
                <el-button type="primary" @click="formFn('ruleForm')">确 定</el-button>
            </div>
        </el-dialog> -->
        <div id="downNode"></div>
    </div>
</template>
<script>
import cmsAside from "@/components/common/cmsAside.vue";
export default {
    name:"orderQuery",
    components:{
        cmsAside
    },
    data(){
        return {
            status:['PAYMENT_PENDING', 'PAYMENT_SUCCESS', 'CONFIRM_WAITING', 'BOOKING_SUCCESS', 'COMPLETED', 'REFUNDING', 'REFUNDED', 'CANCELED'],
            formData:{
               activityId:null,
               status:[],
               travelStartDate:null,
               travelEndDate:null,
               startDate:null,
               endDate:null,
               orderId:null,
               emailAddress:null,
               sort:'CREATE_TIME',
               deviceType:null,
               includeTest:false,
               
            },
            pageNum:1,
            pageSize:20,
            tableData:[],
            records:0,
            showlist:false,
            //dialogFormVisible:false,
            showclose:false,
           
            // form:{
            //     paymentPlatform:'',
            //     paySerial:'',
            //     orderId:''
            // },
            // id:'',
            // formLabelWidth:"120px",
            // rules:{
            //    paymentPlatform:{required:true, message: '请输入支付平台', trigger: 'blur' },
            //    paySerial:{required:true,message: '请输入支付序列号', trigger: 'blur'}
            // }
           
        }
    },
    mounted(){

    },
    methods:{
    downLoad(){
            var self=this;
            console.log(self.formData.startDate)
            var domDown=document.getElementById("downNode");
            var html='<form method="POST" target="_blank" action="https://cms.localpanda.com/cms/order/activity/download">' +
                (self.formData.activityId?'<input name="activityId" type="hidden"  value="'+ self.formData.activityId +'">':'')+
                 (self.formData.emailAddress?'<input name="emailAddress" type="hidden" value="'+self.formData.emailAddress+'">':'')+
                 (self.formData.status&&self.formData.status.length>0?'<input name="status" type="hidden" value="'+self.formData.status+'">':'')+
                  (self.formData.startDate?'<input name="startDate" type="hidden" value="'+self.formData.startDate+'">':'')+
                  (self.formData.endDate?'<input name="endDate" type="hidden" value="'+self.formData.endDate+'">':'')+
                  (self.formData.travelStartDate?'<input name="travelStartDate" type="hidden" value="'+self.formData.travelStartDate+'">':'')+
                   (self.formData.travelEndDate? '<input name="travelEndDate" type="hidden" value="'+self.formData.travelEndDate+'">':'')+
                   (self.formData.deviceType? '<input name="deviceType" type="hidden" value="'+self.formData.deviceType+'">':'')+
                   ('<input name="includeTest" type="hidden" value="'+self.formData.includeTest+'">')+
                   ('<input name="sort" type="hidden" value="'+self.formData.sort+'">')+
					'</form>';
            domDown.innerHTML =html;
            
            var form=domDown.querySelector('form');
          
            form.submit()






            // var obj={
            //     activityId:'11037'
            // }
            // var formData=self.formData
            // $.ajax({
            //     url:'https://cms.localpanda.com/cms/order/activity/download',
            //     method:'POST',
            //     dataType: 'json',
            //     data:JSON.stringify(formData),
            //     contentType: 'application/json; charset=UTF-8',
            //     success:function(data){
            //         console.log(data)
            //         //self.href=data
            //     }

            // })
              
        },
        datefn(id){
            if(id==1){
                this.formData.startDate+=" 00:00:00"
            }else{
                this.formData.endDate+=" 23:59:59"
            }
        },
        btnFn(scope){
            var self=this,
            status;
            


            if(scope.row.status=="PAYMENT_SUCCESS"){
                status="CONFIRM_WAITING"
            }else if(scope.row.status=="CONFIRM_WAITING"){
                 status="BOOKING_SUCCESS"  
            }

           var  obj={
                orderId:scope.row.orderId,
                status:status
            }
             self.ajax(obj)
            // if(scope.row.status!="PAYMENT_PENDING"){
               
            // }
           
          
           
        
        },
        ajax(obj){

           var contentType='application/json; charset=UTF-8',
           self=this,
            postUrl="https://cms.localpanda.com/cms/order/activity/status";
           $.ajax({
               url:postUrl,
               type:"POST",
                dataType: 'json', //如果跨域用jsonp
                data: JSON.stringify(obj),
                contentType: contentType,
                success:function(data){
                    if(data.succeed){
                         self.$alert('更改成功！！', {
                            confirmButtonText: '确定',
                            callback: action => {
                                location.reload()
                            }
                            });
                    }
                },
                error(data){

                }
               
           }) 
        },
        btnText(scope){
            if(scope.row.status=="PAYMENT_SUCCESS"){
                return '资源确认'
            }else if(scope.row.status=="CONFIRM_WAITING"){
                return '资审确认'
            }else{
                return false
            }

        },
        // falseFn(formName){
        //     this.dialogFormVisible=false
        //      this.$refs[formName].resetFields();
        // },
        // formFn(formName){
        //     let self=this,
        //     form=self.form;
        //     self.form.orderId=self.id
            
        //     let postUrl="https://cms.localpanda.com/cms/order/activity/offline/confirm?orderId="+form.orderId+'&paymentPlatform='+form.paymentPlatform+'&paySerial='+form.paymentPlatform,
        //      contentType='application/json; charset=UTF-8';
             
            
        //   this.$refs[formName].validate((valid) => {
        //         if (valid) {
        //             $.ajax({
        //                 url:postUrl,
        //                 type:'POST',
        //                 dataType: 'json', //如果跨域用jsonp
        //                 //data: JSON.stringify(form),
        //                 contentType: contentType,
        //                 success:function(data){
        //                     if(data.succeed){
        //                          self.dialogFormVisible=false
        //                          self.$alert("已完成线下搬单！！")
        //                          location.reload()
        //                     }else{
        //                          self.dialogFormVisible=false
        //                          self.$alert("搬单失败")
        //                     }
                           
                           
                           
        //                 },
        //                 error:function(data){
        //                     self.dialogFormVisible=false
        //                     self.$alert("搬单失败") 
        //                 }

        //             })
        //         } else {
        //             alert('请填写正确信息~！');
                    
        //         }
        //     });

        // },

        //排序
        change(){
           this.sumbitFn()
        },
        sumbitFn(){
            this.pageNum=1
             const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            let postUrl='https://cms.localpanda.com/cms/order/activity/list',
            self=this,
            formData=this.formData,
            contentType='application/json; charset=UTF-8';
            formData.pageNum=self.pageNum;
            formData.pageSize=self.pageSize;
             console.log(formData)
            $.ajax({
                url: postUrl,
                type: 'POST',
                dataType: 'json', //如果跨域用jsonp
                data: JSON.stringify(formData),
                contentType: contentType,
                success:function(data){
                    if(data.entities.length>0){
                         loading.close();
                       
                        self.tableData=data.entities
                        self.records=data.records
                        self.showlist=true
                    }else{
                         
                        self.$message.error('没有找到相关的订单！！');
                        loading.close();
                        self.showlist=false
                    }
                    
                },
                error:function(data){
                      loading.close();
                    alert('请求失败！');
                }
            })

        },
        pageChange(val){
            
            let self=this
            self.pageNum=val
             const loading = this.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            let postUrl='https://cms.localpanda.com/cms/order/activity/list',
            formData=this.formData,
            contentType='application/json; charset=UTF-8';
            formData.pageNum=self.pageNum;
            formData.pageSize=self.pageSize
            $.ajax({
                url: postUrl,
                type: 'POST',
                dataType: 'json', //如果跨域用jsonp
                data: JSON.stringify(formData),
                contentType: contentType,
                success:function(data){
                    if(data.entities.length>0){
                         loading.close();
                       
                        self.tableData=data.entities
                        self.records=data.records
                        self.showlist=true
                    }else{
                         
                        self.$message.error('没有找到相关的订单！！');
                        loading.close();
                        self.showlist=false
                    }
                    
                },
                error:function(data){
                      loading.close();
                    alert('请求失败！');
                }
            })
        }
    },
    watch:{
        //     'formData.startDate':{
        //         handler(val,oldVal){
        //             if(val){
        //                 val=val+' 00:00:00'
        //             }
               
        //       },
        //       deep: true
        // },
        // 'formData.endDate':{
        //     handler(val,oldVal){
        //         if(val){
        //             val=val+' 23:59:59'
        //         }
        //     }
        // }
    }
}
</script>
<style lang="scss" scoped>
.el-form-item{
    margin-bottom:12px!important;
    
}
.w320{
    width: 320px!important;
}
.w1000{
    width: 1000px!important;
}
.inline{
    display: inline-block!important;
}
.el-checkbox{
    width: 250px;
}
</style>

