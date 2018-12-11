<template>
    <div class="cms-page">
         <cmsAside :activeTitle="'6-1'"></cmsAside>
        <div class="cms-main">
             <h3 class="text_c">订单详情</h3>
             
             <div class="text_r">
                
                <a class="el-button el-button--primary zindex9 text_r" href="/order/">返回订单查询</a>
            </div>
            
            <div class="mt20 fs16">
               
                <el-row class="mt20">
                  <el-col :span="12">
                  
                  <div class="grid-content bg-purple fs16 pd20"><label> 订单ID: </label><b>{{details.orderId}}</b></div>
                  </el-col>
                  <el-col :span="12"><div class="grid-content bg-purple-light fs16 pd20"><label>产品ID: </label><b>{{details.activityId}}</b></div></el-col>
                </el-row>
                <el-row>
                  <el-col :span="24"><div class="grid-content bg-purple fs16 pd20"><label> 产品标题: </label><a class="btn_text" target="_blank" :href="'https://www.localpanda.com/activity/details/'+details.activityId"><b>{{details.activityInfo?details.activityInfo.title:''}}</b></a></div></el-col>
                </el-row>
                
                 <!-- <el-row>
                        <el-col :span="24"><div class="grid-content bg-purple fs16 mt20"><label> 产品标题: </label><b>{{details.activityInfo?details.activityInfo.title:''}}</b></div></el-col>
                </el-row> -->
                <el-row>
                        <el-col :span="12"><div class="grid-content bg-purple fs16 pd20"><label>订单状态: </label><b>{{details.status}}</b></div></el-col>
                        <el-col :span="12" v-if="details.deviceType"><div class="grid-content bg-purple-light fs16 pd20"><label> 终端: </label><b>{{details.deviceType}}</b></div></el-col>
                </el-row>
                <el-row>
                        <el-col :span="12"><div class="grid-content bg-purple fs16 pd20"><label>总金额: </label><b>{{details.currency}} {{details.symbol}} {{details.amount}}</b></div></el-col>
                        <el-col :span="12"><div class="grid-content bg-purple fs16 pd20"><label>人数: </label><b>Adult(s) x {{details.adultNum}}</b>，<b v-if="details.childrenNum">Child(ren) x {{details.childrenNum}}</b></div></el-col>
                        <!-- <el-col :span="12"><div class="grid-content bg-purple-light fs16 pd20"><label> 平均价: </label><b>{{details.symbol}} {{details.averagePrice}}</b></div></el-col> -->
                </el-row>
                
                 <el-row>
                        <el-col :span="24" v-if="details.comments"><div class="grid-content bg-purple fs16 pd20"><label> Comments: </label><b>{{details.comments}}</b></div></el-col>
                </el-row>
                <el-row>
                        
                  <el-col :span="12"><div class="grid-content bg-purple fs16 pd20"><label>出行日期: </label><b>{{details.startDate}}</b></div></el-col>
                  <el-col :span="12"><div class="grid-content bg-purple-light fs16 pd20"><label> 订单创建时间(北京时间): </label><b>{{details.createTime}}</b></div></el-col>
                </el-row>
                <el-row v-if="details.guideBasicInfo">
                  <el-col :span="12" v-if="details.guideBasicInfo"><div class="grid-content bg-purple fs16 pd20"><label>导游ID: </label><b>{{details.guideBasicInfo.guideId}}</b></div></el-col>
                  <el-col :span="12" v-if="details.guideBasicInfo"><div class="grid-content bg-purple-light fs16 pd20"><label> 导游姓名: </label><b>{{details.guideBasicInfo.enName}}</b></div></el-col>
                </el-row>
                <el-row>
                  <el-col :span="24" v-if="details.paymentInfo&&details.paymentInfo.status=='PARTIALLY_REFUNDED'"><div class="grid-content bg-purple fs16 pd20"><label> 部分退款金额: </label><b>{{details.paymentInfo.refundAmount}}</b></div></el-col>
                </el-row>
                 <el-row>
                        <!-- <el-col :span="details.paymentInfo&&details.paymentInfo.status=='PARTIALLY_REFUNDED'?12:24"><div class="grid-content bg-purple fs16 pd20"><label> 货币: </label><b>{{details.currency}}</b></div></el-col> -->
                        <!-- <el-col :span="24" v-if="details.paymentInfo&&details.paymentInfo.status=='PARTIALLY_REFUNDED'"><div class="grid-content bg-purple fs16 pd20"><label> 部分退款金额: </label><b>{{details.paymentInfo.refundAmount}}</b></div></el-col> -->
                </el-row>
                
                 <el-row>
                        <el-col :span="24" v-if="details.comments"><div class="grid-content bg-purple fs16 pd20"><label> Comments: </label><b>{{details.comments}}</b></div></el-col>
                </el-row>
                <div class="hr"></div>
                <el-row>
                        <el-col :span="12"><div class="grid-content bg-purple fs16 pd20"><label>First Name: </label><b>{{contactInfo.firstName}}</b></div></el-col>
                        <el-col :span="12"><div class="grid-content bg-purple-light fs16 pd20"><label> Last Name: </label><b>{{contactInfo.lastName}}</b></div></el-col>
                </el-row>
                <el-row>
                        <el-col :span="12"><div class="grid-content bg-purple fs16 pd20"><label>Phone Number: </label><b>{{contactInfo.phoneNumber}}</b></div></el-col>
                        <el-col :span="12"><div class="grid-content bg-purple-light fs16 pd20"><label> Email Address: </label><b>{{contactInfo.emailAddress}}</b></div></el-col>
                </el-row>
                <el-row>
                        <el-col :span="12"><div class="grid-content bg-purple fs16 pd20"><label>UTC offset: </label><b>{{details.utcOffset}}</b></div></el-col>
                        <el-col :span="12" v-show="details.createTime"><div class="grid-content bg-purple-light fs16 pd20"><label> Current Local Time: </label><b>{{userLocalTime}}</b></div></el-col>
                </el-row>


                <div class="hr" v-if="details.contactInfo && details.contactInfo.pickup"></div>

                <!-- Pick-up Info -->
                <div v-if="details.contactInfo && details.contactInfo.pickup">
                  <h4>Pick-up Info</h4>
                  <el-row>
                    <el-col :span="24"><div class="grid-content bg-purple fs16 pd20"><label>Pick-up Location: </label><b>{{details.contactInfo.pickup['Pick-up Location']}}</b></div></el-col>
                  </el-row>
                  <div v-if="details.contactInfo.pickup['Pick-up Location']=='Hotel'">
                    <el-row>
                      <el-col :span="24"><div class="grid-content bg-purple-light fs16 pd20"><label> Pick-up Time: </label><b>{{details.contactInfo.pickup['Pick-up Time']}}</b></div></el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="24"><div class="grid-content bg-purple-light fs16 pd20"><label> Hotel Name & Address: </label><b>{{details.contactInfo.pickup['Hotel Name & Address']}}</b></div></el-col>
                    </el-row>
                  </div>
                  <div v-else-if="details.contactInfo.pickup['Pick-up Location']=='Airport'">
                    <el-row>
                      <el-col :span="12"><div class="grid-content bg-purple fs16 pd20"><label>Flight Number: </label><b>{{details.contactInfo.pickup['Flight Number']}}</b></div></el-col>
                      <el-col :span="12"><div class="grid-content bg-purple-light fs16 pd20"><label> Arrival Time: </label><b>{{details.contactInfo.pickup['Arrival Time']}}</b></div></el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="24"><div class="grid-content bg-purple-light fs16 pd20"><label> Airport: </label><b>{{details.contactInfo.pickup['Airport']}}</b></div></el-col>
                    </el-row>
                  </div>
                  <div v-else-if="details.contactInfo.pickup['Pick-up Location']=='Cruise Port'">
                    <el-row>
                      <el-col :span="12"><div class="grid-content bg-purple fs16 pd20"><label>Cruise Number: </label><b>{{details.contactInfo.pickup['Cruise Number']}}</b></div></el-col>
                      <el-col :span="12"><div class="grid-content bg-purple-light fs16 pd20"><label> Arrival Time: </label><b>{{details.contactInfo.pickup['Arrival Time']}}</b></div></el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="24"><div class="grid-content bg-purple-light fs16 pd20"><label> Cruise Port: </label><b>{{details.contactInfo.pickup['Cruise Port']}}</b></div></el-col>
                    </el-row>
                  </div>
                  <div v-else-if="details.contactInfo.pickup['Pick-up Location']=='Railway Station'">
                    <el-row>
                      <el-col :span="12"><div class="grid-content bg-purple fs16 pd20"><label>Train Number: </label><b>{{details.contactInfo.pickup['Train Number']}}</b></div></el-col>
                      <el-col :span="12"><div class="grid-content bg-purple-light fs16 pd20"><label> Arrival Time: </label><b>{{details.contactInfo.pickup['Arrival Time']}}</b></div></el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="24"><div class="grid-content bg-purple-light fs16 pd20"><label> Railway Station: </label><b>{{details.contactInfo.pickup['Railway Station']}}</b></div></el-col>
                    </el-row>
                  </div>
                  <div v-else-if="details.contactInfo.pickup['Pick-up Location']=='Address or Intersection'">
                    <el-row>
                      <el-col :span="24"><div class="grid-content bg-purple-light fs16 pd20"><label> Pick-up Time: </label><b>{{details.contactInfo.pickup['Pick-up Time']}}</b></div></el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="24"><div class="grid-content bg-purple-light fs16 pd20"><label> Address or Intersection: </label><b>{{details.contactInfo.pickup['Address or Intersection']}}</b></div></el-col>
                    </el-row>
                  </div>
                </div>

                <div class="hr" v-if="details.contactInfo && details.contactInfo.phoneDelivery"></div>
                
                <div v-if="details.contactInfo && details.contactInfo.phoneDelivery">
                    <h4>Panda Phone Info</h4>
                    <el-row>
                      <el-col :span="24"><div class="grid-content bg-purple fs16 pd20"><label>Delivery Time ( Beijing Time ): </label><b>{{details.contactInfo.phoneDelivery['Delivery Date ( Beijing Time )'] +' '+ details.contactInfo.phoneDelivery['Delivery Time ( Beijing Time )']}}</b></div></el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="24"><div class="grid-content bg-purple fs16 pd20"><label>Panda Phone Delivery Address ( Hotel Only ): </label><b>{{details.contactInfo.phoneDelivery['Panda Phone Delivery Address ( Hotel Only )']}}</b></div></el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="24"><div class="grid-content bg-purple fs16 pd20"><label>押金方式: </label><b>{{details.phoneDepositPayOnline?'Online':'Offline'}}</b></div></el-col>
                    </el-row>
                </div>

                <div class="hr" v-if="details.contactInfo && details.contactInfo.passport"></div>

                <!-- Passport Info -->
                <div v-if="details.contactInfo && details.contactInfo.passport">
                  <h4>Passport Info</h4>
                  <div class="mt15" v-for="(items,index) in details.contactInfo.passport" :key="index">
                    <el-row>
                      <el-col :span="24">
                        <div class="grid-content bg-purple fs16 pd20">
                          <b class="c_999">Traveler{{index+1}}</b>
                        </div>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="12">
                        <div class="grid-content bg-purple fs16 pd20">
                          <label>First Name: </label>
                          <b>{{items['First Name']}}</b>
                        </div>
                      </el-col>
                      <el-col :span="12">
                        <div class="grid-content bg-purple fs16 pd20">
                          <label>Last Name: </label>
                          <b>{{items['Last Name']}}</b>
                        </div>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="12">
                        <div class="grid-content bg-purple fs16 pd20">
                          <label>Passport Number: </label>
                          <b>{{items['Passport Number']}}</b>
                        </div>
                      </el-col>
                      <el-col :span="12">
                        <div class="grid-content bg-purple fs16 pd20">
                          <label>Birthday: </label>
                          <b>{{items['Birthday']}}</b>
                        </div>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="12">
                        <div class="grid-content bg-purple fs16 pd20">
                          <label>Gender: </label>
                          <b>{{items['Gender']}}</b>
                        </div>
                      </el-col>
                      <el-col :span="12">
                        <div class="grid-content bg-purple fs16 pd20">
                          <label>Nationality: </label>
                          <b>{{items['Nationality']}}</b>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </div>
                

            </div>
            <button v-if="btnText()"  class="el-button el-button--primary mt30" @click="btnFn">{{btnText()}}</button>
            <button  class="el-button el-button--primary mt30" @click="remark">查看/添加备注</button>
            <button  class="el-button el-button--primary mt30" v-if="(details.status=='PAYMENT_SUCCESS'||details.status=='CONFIRM_WAITING'||details.status=='BOOKING_SUCCESS')&&(details.paymentInfo&&details.paymentInfo.status!='PARTIALLY_REFUNDED')" @click="refund">全额退款</button>
            <button  class="el-button el-button--primary mt30" @click="refundStatus=true"  v-if="(details.status=='PAYMENT_SUCCESS'||details.status=='CONFIRM_WAITING'||details.status=='BOOKING_SUCCESS'||details.status=='COMPLETED')&&(details.paymentInfo&&details.paymentInfo.status!='PARTIALLY_REFUNDED')">部分退款</button>


            <a :href="'/order/orderCost?id='+id" class="el-button el-button--primary mt30">计调信息</a>
            
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
          <el-dialog title="订单备注"   :visible.sync="viewRemark" :before-close="handleClose">
              <el-table v-show="tabdata.length>0" :data="tabdata" style="width: 100%" height="250">
                   <el-table-column
                   
                    prop="orderId"
                    label="orderId"
                     style="width:25%">
                   </el-table-column>
                     <el-table-column
                    prop="createTime"
                    label="createTime"
                    style="width:25%">
                     </el-table-column>
                     <el-table-column
                    prop="operator"
                    label="operator"
                    style="width:15%">
                     </el-table-column>
                    <el-table-column
                    prop="comments"
                    label="comments"
                    style="width:35%">
                     </el-table-column>
              </el-table>
            <el-form class="mt20" :model="viewRemarkData" :rules="rules1" ref="viewRemarkData">
                <el-form-item label="操作人" :label-width="'80px'">
                    <el-input class="w220" v-model="viewRemarkData.operator" disabled autocomplete="off"></el-input>
                </el-form-item>
                 <el-form-item label="备注" :label-width="'80px'" prop="comments">
                    <el-input  type="textarea" v-model="viewRemarkData.comments" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item class="text_c">
                    <el-button type="primary " @click="viewRemarkFn('viewRemarkData')">提交</el-button>
                </el-form-item>
            </el-form>
           
        </el-dialog>
        <!-- 部分退款 -->
        <el-dialog title="部分退款" :visible.sync="refundStatus" :before-close="Close">
            <el-form :model="refundForm" ref="refundForm">
                 <el-form-item label="退款金额" :label-width="'80px'" prop="refundAmount" 
                 :rules="{
                     required: true, message: '请输入金额', trigger: 'blur'
                    }">
                    <el-input v-model="refundForm.refundAmount" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item class="text_r">
                    <el-button type="primary " @click="rebates">退款</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
import cmsAside from "@/components/common/cmsAside.vue";
export default {
  name: "orderDetails",
  data() {
    let id = this.$route.query.id;
    return {
      id: id,
      details: "",
      contactInfo: "",
      dialogFormVisible: false,
      viewRemark: false,
      userLocalTime: "",
      form: {
        paymentPlatform: "",
        paySerial: "",
        orderId: ""
      },
      viewRemarkData: {
        //备注说明
        operator: localStorage.getItem("user"),
        comments: ""
      },
      formLabelWidth: "120px",
      refundForm: {
        //部分退款
        refundAmount: ""
      },
      refundStatus: false,
      rules: {
        paymentPlatform: {
          required: true,
          message: "请输入支付平台",
          trigger: "blur"
        },
        paySerial: {
          required: true,
          message: "请输入支付序列号",
          trigger: "blur"
        }
      },
      rules1: {
        operator: {
          required: true,
          message: "请输入操作人姓名",
          trigger: "blur"
        },
        comments: { required: true, message: "请输入备注说明", trigger: "blur" }
      },
      tabdata: [],
      submiting: false
    };
  },
  components: {
    cmsAside
  },
  methods: {
    refund() {
      let self = this,
        obj = {
          businessType: "ACTIVITY",
          orderId: self.details.orderId,
          refundAmount: self.refundForm.refundAmount
        };
      if (!self.refundForm.refundAmount) {
        delete obj.refundAmount;
        self
          .$confirm("请确定是否全额退款？", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
          .then(() => {
            self.ajaxFn(obj);
          });
      } else {
        self.ajaxFn(obj);
      }
    },
    ajaxFn(obj) {
      let self = this;
      $.ajax({
        url: "https://cms.localpanda.com/cms/payment/refund",
        type: "POST",
        dataType: "json",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=UTF-8",
        success: function(data) {
          if (data.succeed) {
            self.$message({
              message: "退款成功！！！",
              type: "success"
            });
            self.getData();
            self.refundStatus = false;
          } else {
            self.$message({
              message: "退款失败！！！",
              type: "error"
            });
          }
        },
        error: function(data) {
          self.$alert("请求失败");
        }
      });
    },
    rebates() {
      if (this.refundForm.refundAmount) {
        this.refund();
      }
    },
    getData() {
      let self = this;
      $.ajax({
        url: "https://cms.localpanda.com/cms/order/" + self.id + "/activity",
        type: "GET",
        dataType: "json",
        success: function(data) {
          if(data.contactInfo.pickup){
            data.contactInfo.pickup = JSON.parse(data.contactInfo.pickup);
          }
          if(data.contactInfo.phoneDelivery){
            data.contactInfo.phoneDelivery = JSON.parse(data.contactInfo.phoneDelivery);
          }
          if(data.contactInfo.passport){
            data.contactInfo.passport = JSON.parse(data.contactInfo.passport);
          }

          self.details = data;
          self.contactInfo = data.contactInfo;
          self.userLocalTime = data.userLocalTime;

          console.log(self.details);
        },
        error: function(data) {
          self.$alert("请求失败");
        }
      });
    },
    falseFn(formName) {
      this.dialogFormVisible = false;
      this.$refs[formName].resetFields();
    },
    currentLocalTime() {},
    remark() {
      this.viewRemark = true;
      this.getViewRemark();
    },
    btnFn(scope) {
      var self = this,
        status;

      if (self.details.status == "PAYMENT_SUCCESS") {
        status = "CONFIRM_WAITING";
      } else if (self.details.status == "CONFIRM_WAITING") {
        status = "BOOKING_SUCCESS";
      } else {
        self.dialogFormVisible = true;
        self.id = scope.row.orderId;
      }

      var obj = {
        orderId: self.details.orderId,
        status: status
      };
      if (self.details.status != "PAYMENT_PENDING") {
        self.ajax(obj);
      }
    },
    handleClose() {
      this.$refs["viewRemarkData"].resetFields();
      this.viewRemark = false;
    },
    Close() {
      this.$refs["refundForm"].resetFields();
      this.refundStatus = false;
    },
    formFn(formName) {
      let self = this,
        form = self.form;
      self.form.orderId = self.id;
      let postUrl =
          "https://cms.localpanda.com/cms/order/activity/offline/confirm?orderId=" +
          form.orderId +
          "&paymentPlatform=" +
          form.paymentPlatform +
          "&paySerial=" +
          form.paySerial,
        contentType = "application/json; charset=UTF-8";

      this.$refs[formName].validate(valid => {
        if (valid) {
          $.ajax({
            url: postUrl,
            type: "POST",
            dataType: "json", //如果跨域用jsonp
            // data: JSON.stringify(form),
            contentType: contentType,
            success: function(data) {
              if (data.succeed) {
                self.dialogFormVisible = false;
                self.$message({
                  message: "搬单成功！！！",
                  type: "success"
                });
                //location.href="/order/"
                self.getData();
              } else {
                self.dialogFormVisible = false;
                self.$alert("搬单失败!!");
              }
              47;
            },
            error: function(data) {
              self.dialogFormVisible = false;
              self.$alert("搬单失败");
            }
          });
        } else {
          alert("error submit!!");
        }
      });
    },
    getViewRemark() {
      let self = this,
        postUrl =
          "https://cms.localpanda.com/cms/order/activity/" +
          self.details.orderId +
          "/comment";
      $.ajax({
        url: postUrl,
        type: "GET",
        success: function(data) {
          self.tabdata = data;
        },
        error(data) {}
      });
    },
    viewRemarkFn(formName) {
      let self = this,
        form = this.viewRemarkData,
        postUrl = "https://cms.localpanda.com/cms/order/activity/comment",
        contentType = "application/json; charset=UTF-8";
      form.createTime = self.details.createTime;
      form.orderId = self.details.orderId;
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (self.submiting) {
            return false;
          }
          self.submiting = true;
          $.ajax({
            url: postUrl,
            type: "PUT",
            dataType: "json", //如果跨域用jsonp
            data: JSON.stringify(form),
            contentType: contentType,
            success: function(data) {
              if (data.succeed) {
                self.$message({
                  message: "提交成功！！！",
                  type: "success"
                });
                self.getViewRemark();
                self.$refs[formName].resetFields();
              } else {
                self.$alert("提交失败!!!");
              }

              self.submiting = false;
            },
            error: function(data) {
              self.submiting = false;
            }
          });
        }
      });
    },
    btnText() {
      if (this.details.status == "PAYMENT_SUCCESS") {
        return "支付确认";
      } else if (this.details.status == "CONFIRM_WAITING") {
        return "资审确认";
      } else if (this.details.status == "PAYMENT_PENDING") {
        return "线下支付搬单";
      } else {
        return false;
      }
    },
    ajax(obj) {
      var contentType = "application/json; charset=UTF-8",
        self = this,
        postUrl = "https://cms.localpanda.com/cms/order/activity/status";
      $.ajax({
        url: postUrl,
        type: "POST",
        dataType: "json", //如果跨域用jsonp
        data: JSON.stringify(obj),
        contentType: contentType,
        success: function(data) {
          if (data.succeed) {
            self.$alert("更改成功！！", {
              confirmButtonText: "确定",
              callback: action => {
                location.reload();
              }
            });
          } else {
            self.$alert("更改失败", {
              confirmButtonText: "确定",
              callback: action => {}
            });
          }
        },
        error(data) {}
      });
    }
  },
  mounted() {
    let that = this;
    this.getData();
  }
};
</script>
<style lang="scss" scoped>
.el-col {
  border: 1px solid #ccc;
}
.pd20 {
  padding: 10px 20px !important;
}
</style>