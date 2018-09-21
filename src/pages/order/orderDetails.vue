<template>
    <div class="cms-page">
         <cmsAside :activeTitle="'6-1'"></cmsAside>
        <div class="cms-main">
             <h3 class="text_c">订单详情</h3>
             <div class="text_r">
                <a class="el-button el-button--primary zindex9" href="/order/">返回订单查询</a>
            </div>
            <div class="mt20 fs16">
                <el-row>
                        <el-col :span="12">
                        
                        <div class="grid-content bg-purple fs16 mt20"><label> 订单ID: </label><b>{{details.orderId}}</b></div>
                        </el-col>
                        <el-col :span="12"><div class="grid-content bg-purple-light fs16 mt20"><label>产品ID: </label><b>{{details.activityId}}</b></div></el-col>
                </el-row>
                <el-row v-if="details.guideBasicInfo">
                        <el-col :span="12" v-if="details.guideBasicInfo"><div class="grid-content bg-purple fs16 mt20"><label>导游ID: </label><b>{{details.guideBasicInfo.guideId}}</b></div></el-col>
                        <el-col :span="12" v-if="details.guideBasicInfo"><div class="grid-content bg-purple-light fs16 mt20"><label> 导游姓名: </label><b>{{details.guideBasicInfo.enName}}</b></div></el-col>
                </el-row>
                 <!-- <el-row>
                        <el-col :span="24"><div class="grid-content bg-purple fs16 mt20"><label> 产品标题: </label><b>{{details.activityInfo?details.activityInfo.title:''}}</b></div></el-col>
                </el-row> -->
                <el-row>
                        <el-col :span="12"><div class="grid-content bg-purple fs16 mt20"><label>订单状态: </label><b>{{details.status}}</b></div></el-col>
                        <el-col :span="12" v-if="details.deviceType"><div class="grid-content bg-purple-light fs16 mt20"><label> 终端: </label><b>{{details.deviceType}}</b></div></el-col>
                </el-row>
                <el-row>
                        <el-col :span="12"><div class="grid-content bg-purple fs16 mt20"><label>总金额: </label><b>{{details.symbol}} {{details.amount}}</b></div></el-col>
                        <el-col :span="12"><div class="grid-content bg-purple-light fs16 mt20"><label> 平均价: </label><b>{{details.symbol}} {{details.averagePrice}}</b></div></el-col>
                </el-row>
                
                 <el-row>
                        <el-col :span="24" v-if="details.comments"><div class="grid-content bg-purple fs16 mt20"><label> Comments: </label><b>{{details.comments}}</b></div></el-col>
                </el-row>
                <el-row>
                        <el-col :span="12"><div class="grid-content bg-purple fs16 mt20"><label>成人数: </label><b>{{details.adultNum}}</b></div></el-col>
                        <el-col :span="12"><div class="grid-content bg-purple-light fs16 mt20"><label> 儿童数: </label><b>{{details.childrenNum}}</b></div></el-col>
                </el-row>
                <el-row>
                        <el-col :span="12"><div class="grid-content bg-purple fs16 mt20"><label>出行日期: </label><b>{{details.startDate}}</b></div></el-col>
                        <el-col :span="12"><div class="grid-content bg-purple-light fs16 mt20"><label> 订单创建时间(北京时间): </label><b>{{details.createTime}}</b></div></el-col>
                </el-row>
                 <el-row>
                        <el-col :span="24"><div class="grid-content bg-purple fs16 mt20"><label> 货币: </label><b>{{details.currency}}</b></div></el-col>
                </el-row>
                 <el-row>
                        <el-col :span="24"><div class="grid-content bg-purple fs16 mt20"><label> 产品标题: </label><a class="btn_text" :href="'https://www.localpanda.com/activity/details/'+details.activityId"><b>{{details.activityInfo?details.activityInfo.title:''}}</b></a></div></el-col>
                </el-row>
                 <el-row>
                        <el-col :span="24" v-if="details.comments"><div class="grid-content bg-purple fs16 mt20"><label> Comments: </label><b>{{details.comments}}</b></div></el-col>
                </el-row>
                <div class="hr"></div>
                <el-row>
                        <el-col :span="12"><div class="grid-content bg-purple fs16 mt20"><label>First Name: </label><b>{{contactInfo.firstName}}</b></div></el-col>
                        <el-col :span="12"><div class="grid-content bg-purple-light fs16 mt20"><label> Last Name: </label><b>{{contactInfo.lastName}}</b></div></el-col>
                </el-row>
                <el-row>
                        <el-col :span="12"><div class="grid-content bg-purple fs16 mt20"><label>Phone Number: </label><b>{{contactInfo.phoneNumber}}</b></div></el-col>
                        <el-col :span="12"><div class="grid-content bg-purple-light fs16 mt20"><label> Email Address: </label><b>{{contactInfo.emailAddress}}</b></div></el-col>
                </el-row>
                <el-row>
                        <el-col :span="12"><div class="grid-content bg-purple fs16 mt20"><label>UTC offset: </label><b>{{details.utcOffset}}</b></div></el-col>
                        <el-col :span="12" v-show="details.createTime"><div class="grid-content bg-purple-light fs16 mt20"><label> Current Local Time: </label><b>{{userLocalTime}}</b></div></el-col>
                </el-row>
            </div>
            <button v-if="btnText()"  class="el-button el-button--primary mt30" @click="btnFn">{{btnText()}}</button>
             <!-- <button  class="el-button el-button--primary mt30" >查看/添加备注</button> -->
        </div>
         <el-dialog title="线下搬单" :visible.sync="dialogFormVisible">
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
        </el-dialog>
        <!-- 备注 -->
          <!-- <el-dialog title="订单备注" :visible.sync="viewRemark">
            <el-tab><el-tab>
            <el-form :model="form" :rules="rules" ref="ruleForm">
                <el-form-item label="支付序列号" :label-width="formLabelWidth" prop="paySerial">
                    <el-input class="w220" v-model="form.paySerial" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="falseFn('ruleForm')">取 消</el-button>
                <el-button type="primary" @click="formFn('ruleForm')">确 定</el-button>
            </div>
        </el-dialog> -->
    </div>
</template>
<script>
import cmsAside from "@/components/common/cmsAside.vue";
export default {
    name:'orderDetails',
    data(){
        let id=this.$route.query.id
        return {
            id:id,
            details:'',
            contactInfo:'',
            dialogFormVisible:false,
            viewRemark:false,
            userLocalTime:'',
            form:{
                paymentPlatform:'',
                paySerial:'',
                orderId:''
            },
            
            formLabelWidth:"120px",
            rules:{
               paymentPlatform:{required:true, message: '请输入支付平台', trigger: 'blur' },
               paySerial:{required:true,message: '请输入支付序列号', trigger: 'blur'}
            }
        }
    },
    components:{
       cmsAside 
    },
    methods:{
        getData(){
            let self=this;
            $.ajax({
                url:'https://cms.localpanda.com/cms/order/'+self.id+'/activity',
                type:'GET',
                dataType: 'json',
                success:function(data){
                    self.details=data
                    self.contactInfo=data.contactInfo
                    self.userLocalTime=data.userLocalTime
                },
                error:function(data){
                    self.$alert('请求失败')
                }
            })
        },
        falseFn(formName){
            this.dialogFormVisible=false
             this.$refs[formName].resetFields();
        },
        currentLocalTime(){
             
        },
        btnFn(scope){
            var self=this,
            status;
            


            if(self.details.status=="PAYMENT_SUCCESS"){
                status="CONFIRM_WAITING"
            }else if(self.details.status=="CONFIRM_WAITING"){
                 status="BOOKING_SUCCESS"  
            }else{
                self.dialogFormVisible=true
                self.id=scope.row.orderId
            }

           var  obj={
                orderId:self.details.orderId,
                status:status
            }
            if(self.details.status!="PAYMENT_PENDING"){
                self.ajax(obj)
            }
           
          
           
        
        },
         formFn(formName){
            let self=this,
            form=self.form;
            self.form.orderId=self.id
            let postUrl="https://cms.localpanda.com/cms/order/activity/offline/confirm?orderId="+form.orderId+'&paymentPlatform='+form.paymentPlatform+'&paySerial='+form.paySerial,
             contentType='application/json; charset=UTF-8';
             
             console.log(form)
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    $.ajax({
                        url:postUrl,
                        type:'POST',
                        dataType: 'json', //如果跨域用jsonp
                        // data: JSON.stringify(form),
                        contentType: contentType,
                        success:function(data){
                            if(data.succeed){
                                 self.dialogFormVisible=false
                                self.$message({
                                    message: '搬单成功！！！',
                                    type: 'success'
                                    });
                                 //location.href="/order/"
                                 self.getData()

                            }else{
                                 self.dialogFormVisible=false
                                 self.$alert("搬单失败!!")
                            }
                           
                        },
                        error:function(data){
                             self.dialogFormVisible=false
                            self.$alert("搬单失败") 
                        }

                    })
                } else {
                    alert('error submit!!');
                    
                }
            });

        },
        btnText(){
            if(this.details.status=="PAYMENT_SUCCESS"){
                return '支付确认'
            }else if(this.details.status=="CONFIRM_WAITING"){
                return '资审确认'
            }else if(this.details.status=="PAYMENT_PENDING") {
                return '线下支付搬单'
            }else{
                return false
            }

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
                    }else{
                        self.$alert('更改失败', {
                            confirmButtonText: '确定',
                            callback: action => {
                                
                                }
                            });
                    }
                },
                error(data){

                }
               
           }) 
        },
    },
    mounted(){
        let that=this
        this.getData()
        
       
    },
}
</script>
