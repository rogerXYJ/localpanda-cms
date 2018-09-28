<template>
  <div class="cms-page">
    <!-- 侧边栏导航，activeTitle传入1-1的格式，即可展开并高亮对应的导航 -->
    <activityAside :activeTitle="'1-5'"></activityAside>

    <div class="cms-main">
      <h3 class="text_c">价格信息</h3>
	  <el-form :model="formData" :rules="rules" ref="formData"  class="mt40 paddingL40">
	  	<el-form-item label="货币类型 (Currency):" prop="currency">
	  		 <el-select v-model="formData.currency" placeholder="请选择币种">
		      <el-option label="USD" value="USD"></el-option>
		      <el-option label="CNY" value="CNY"></el-option>
		      <el-option label="EUR" value="EUR"></el-option>
		      <el-option label="GBP" value="GBP"></el-option>
		     	<el-option label="AUD" value="AUD"></el-option>
		      <el-option label="CAD" value="CAD"></el-option>
		      <el-option label="JPY" value="JPY"></el-option>
		    </el-select>
			<el-button v-if="formData.unifiedPricing" type="primary" class="fr" disabled>价格设置</el-button>
			 <a v-else class="el-button el-button--primary fr" :href="'/activity/setPrice?id='+id+'&currency='+formData.currency">价格设置</a>
		    <!--<el-button type="primary" class="fr"></el-button>-->
	  	</el-form-item>
	  	<div class="box">
	  		 	<label style="display:inline-block; width: 140px;padding-right:15px;text-align: right;box-sizing: border-box;">退改规则:</label>
	  		 	<el-form-item label="是否支持全额退款:" label-width="140px" >
		  		 	<el-radio-group v-model="formData.fullRefund" prop="fullRefund" @change="reset('formData')">
					    <el-radio :label="true">是 </el-radio>
					    <el-radio :label="false">否</el-radio>
					  </el-radio-group>
		  		</el-form-item>
			    <el-form-item label="时间:" class="mt20" label-width="140px" prop="refundTimeLimit" v-if="formData.fullRefund">
		  		 	<el-input class="w220" v-model="formData.refundTimeLimit" onkeyup="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}" onafterpaste="if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}" @input="changeRefundTimeLimit"></el-input> /天
		  		 	<span v-show="changeDate" class="red ml30">退款时效有变动，请注意与细则说明保持同步！</span>
		  		</el-form-item>
	  			<el-form-item label="细则说明:" label-width="140px" prop="refundInstructions">
	  				<el-button type="primary" v-if="formData.fullRefund" class="display" @click="replaceCont">自动套用模板</el-button>
		  		 	<el-input class="wb60 mt20" v-model="formData.refundInstructions" type="textarea" :rows="7"></el-input>
		  		</el-form-item>
	  	</div>
	  	<el-row :gutter="20">
		  <el-col :span="8">
		  	<el-form-item label="儿童年龄 (Child Standard):" class="mt20" label-width="200px" prop="childStandard">
	  			<el-input class="w120" v-model="formData.childStandard"></el-input>
	  		</el-form-item>
		  </el-col>
		  <el-col :span="8">
		  	<el-form-item label="儿童差价 (Child Discount)：" label-width="200px" class="mt20">
		  		<el-input class="w120" v-model="formData.childDiscount"></el-input>
		  	</el-form-item>
		  </el-col>
		</el-row>
		
		<el-row :gutter="20">
		  <el-col :span="8">
		  	<el-form-item label="原始价格 (Original Price)：" label-width="200px" class="mt40" v-if="formData.originalPrice">
		  		<!-- <el-input class="w120"  v-model="formData.originalPrice" ></el-input> -->
				  <el-input class="w120" v-model="formData.originalPrice"></el-input>
		  		
		  	</el-form-item>
		  </el-col>
		  <el-col :span="8">
		  	<el-form-item :label=" formData.unifiedPricing?'统一价格: ':'最低价格Bottom Price：'" label-width="200px" prop="bottomPrice" class="mt40" v-if="formData.unifiedPricing||formData.bottomPrice">
		  		<!--<span>{{formData.bottomPrice}}</span>-->
		  		<el-input class="w120" v-if="formData.unifiedPricing" v-model="formData.bottomPrice"></el-input>
				  <el-input class="w120" v-else v-model="formData.bottomPrice" :disabled="true"></el-input>
		  	</el-form-item>
		  </el-col>
		</el-row>
	  	<el-row :gutter="20">
		  <el-col :span="8">
		  	<el-form-item label=" 最小成团人数minimum:" label-width="200px" class="mt20" prop="minParticipants">
		  			<el-input class="w120" v-model="formData.minParticipants"></el-input>
		  	</el-form-item>
		  </el-col>
		  <el-col :span="8">
		  	<el-form-item label="最大接待人数maximum:" label-width="200px" class="mt20" v-if="formData.unifiedPricing"  prop="minParticipants">
		  		<!--<span>{{formData.maxParticipants}}</span>-->
		  		<el-input class="w120" v-model="formData.maxParticipants"></el-input>
		  	</el-form-item>
		  </el-col>
		</el-row>
		<!-- <el-row :gutter="20" v-if="formData.available">
		  <el-col :span="8">
		  	<el-form-item label="统一价格: "  label-width="200px" class="mt20" prop="bottomPrice">
		  			<el-input class="w120" v-model="formData.bottomPrice"></el-input>
		  	</el-form-item>
		  </el-col>
		</el-row> -->
				<!--<el-form-item label="出发时间 departure time:" class="mt20">
					  <el-radio-group v-model="radio">
					    <el-radio :label="0">Fixed 固定时间</el-radio>
					    <el-radio :label="1">Flexible 时段</el-radio>
					  </el-radio-group>
		  	</el-form-item>
		  	<el-form-item   v-if="radio==0">
						<div v-for="(item,index) in departureTime" class="mt20">
			  			<span class="ml115">时间{{index+1}}:</span>
			  			
			  			<input class="el-input__inner w220 js_validate" vType="time" type="text" vTip="请正确填写时间格式如9:00!!" v-model="departureTime[index]" />
			  			<el-button type="primary" v-if="index==0" class="ml20 w70" @click="addTime(departureTime)">Add</el-button>
			  			<el-button type="danger" v-if="index>0" :class="index>0?'ml20 w70':''" @click="delTime(departureTime,index)">Del</el-button>
		  			</div>
		  	</el-form-item>
		  	<el-form-item class="mt20" v-if="radio==1">
		  			<span class="ml115">时段:</span>
					   <el-input class="w220 ml10"></el-input>
					   	至
		  			 <el-input class="w220"></el-input>
		  	</el-form-item>-->
		<el-form-item label="是否统一定价" prop="unifiedPricing">
			<el-radio-group v-model="formData.unifiedPricing">
				<el-radio :label="true">是 </el-radio>
				<el-radio :label="false">否</el-radio>
			</el-radio-group>
		</el-form-item>
	  	<el-form-item label="费用说明Additional instructions：">
	  		<el-input type="textarea" v-model="formData.priceInstructions" :rows="7"></el-input>
	  	</el-form-item>
	  	<el-form-item class="text_c mt40">
	  		<el-button type="primary" @click="sumbit('formData')">提交</el-button>
	  	</el-form-item>
	  </el-form>
    </div>

  </div>
</template>

<script>
import activityAside from "@/components/common/activityAside.vue";
import Validate from "@/panda/validate/";
export default {
  name: "cms-price",
  components: {
    activityAside
  },
  data() {
    var id = this.$route.query.id;
    return {
      activeTitle: "4-4",
      id: id,
      radio: 0,
      departureTime: [""],
      isType: false,
      changeDate: false,
      initialrefund: false,
      initialrefundInstructions: "",
      formData: {
        activityId: id,
        currency: "CNY", //币种
        refundTimeLimit: "", //退改时间
        refundInstructions: "", //退改细则
        childStandard: "", //儿童年龄
        childDiscount: null, //儿童差价
        originalPrice: "", //原始价格
        priceInstructions: "", //费用说明
        minParticipants: "", //最小成团人数
        maxParticipants: "",
        //departureTime:[''],//出发时间
        startTime: null, //出发时间区间
        endTime: null, //出发时间区间
        fullRefund: true,
        unifiedPricing: false,
        bottomPrice: ""
        // costPrice:null
      },
      rules: {
        currency: {
          required: true,
          message: "请选择币种！！！",
          trigger: "change"
        },
        refundTimeLimit: {
          required: true,
          message: "请填写退改时间！！！",
          trigger: "blur"
        },
        refundInstructions: {
          required: true,
          message: "请填写退改细则说明！！！",
          trigger: "blur"
        },
        childStandard: {
          required: true,
          message: "请填写儿童年龄！！！",
          trigger: "blur"
        },
        //originalPrice:{required: true, message: '请填写原始价格！！！',trigger: 'blur'},
        minParticipants: {
          required: true,
          message: "请填写最小成团人数！！！",
          trigger: "blur"
        },
        maxParticipants: {
          required: true,
          message: "请填写最小成团人数！！！",
          trigger: "blur"
        },
        fullRefund: {
          required: true,
          message: "请选择是否全部退款！！！",
          trigger: "change"
        },
        unifiedPricing: {
          required: true,
          message: "请选择是否统一定价！！！",
          trigger: "change"
        },
        bottomPrice: {
          required: true,
          message: "请填写统一价格！！！",
          trigger: "blur"
        }
      }
    };
  },
  mounted() {
    this.getData();
    // 		this.fromValidate = new Validate({
    //		      inputClassName:'js_validate', //需要校验的input的className
    //		      errorClassName:'valError'  //报错时，会自动在input上添加的className
    //		    });
    //
  },
  methods: {
    getData() {
      let self = this;
      $.ajax({
        url:
          "https://cms.localpanda.com/cms/product/activity/" +
          self.formData.activityId +
          "/price",
        dataType: "json",
        method: "GET",
        success: function(data) {
          self.formData = data;
          this.changeDate = false;
          self.initialrefund = data.fullRefund;
          self.initialrefundInstructions = data.refundInstructions;
          if (data) {
            self.isType = true;
          }

          //						if(data.departureTime){
          //							self.departureTime=data.departureTime
          //						}
          if (data.refundTimeLimit == 0) {
            self.formData.refundTimeLimit = "";
          }
        },
        error: function(data) {}
      });
    },
    reset(formName) {
      this.$refs[formName].resetFields();
    },
    changeRefundTimeLimit(e) {
		console.log(e)
      if (e) {
        this.changeDate = true;
      } else {
        this.changeDate = false;
      }
    },
    replaceCont() {
      let time = "";
      let refundTimeLimit = this.formData.refundTimeLimit;
      if (!refundTimeLimit) {
        return;
      }
      if (refundTimeLimit <= 2) {
        time = refundTimeLimit * 24 + " hours";
      } else {
        time = refundTimeLimit + " Days";
      }
      this.formData.refundInstructions =
        "You can reschedule or cancel your trip at zero cost up to " +
        time +
        " before your travel date.";
    },
    //		addTime(arr){
    //			arr.push('')
    //			setTimeout(()=>{
    //				this.fromValidate.init()
    //			},200)
    //		},
    //		delTime(arr,index){
    //			arr.splice(index,1)
	//		},
	

	ajaxFn(){
		let self=this,
	    type = self.isType ? "POST" : "PUT",
	    message = self.isType ? "您已更新成功！" : "您已创建成功！";
		$.ajax({
			url: "https://cms.localpanda.com/cms/product/activity/price",
			method: type,
			dataType: "json",
			data: JSON.stringify(self.formData),
			contentType: "application/json",
			success: function(data) {
			if (data.succeed) {
				self.$alert(message, {
				confirmButtonText: "确定",
				callback: action => {
					self.getData();
				}
				});
			} else {
					self.$alert("填写不正确，请重新填写！！", {
					confirmButtonText: "确定"
					});
				}
			},
			error: function(data) {
			alert("请求失败");
			}
		});
	},
    sumbit(formName) {
      let self = this;
      let departureTime = [];
      if (self.formData.unifiedPricing) {
        self.formData.available = 1;
        self.formData.originalPrice = (
          self.formData.bottomPrice * 1.15
        ).toFixed(2);
      } else {
		   if(!self.isType){
			    self.formData.available = 0;
				self.formData.bottomPrice = 0;
				self.formData.maxParticipants = 0;
		   }
       
      }
	
      self.$refs[formName].validate(valid => {
        if (valid) {
          let self = this;
          //self.formData.departureTime=self.departureTime
          //							self.departureTime.forEach(item=>{
          //								if(item!=''){
          //									departureTime.push(item)
          //								}
          //							});
          //							self.formData.departureTime=departureTime
          self.formData.activityId = self.id;
          if (!self.formData.fullRefund) {
            self.formData.refundTimeLimit = 0;
          }
          if (self.isType) {
			  if(self.formData.unifiedPricing){
				  if( self.formData.maxParticipants < self.formData.minParticipants){
					self.$alert("最大成团人数不能小于最小成团人数！", {
						confirmButtonText: "确定",
						callback: action => {}
					}); 
				}else if (self.formData.maxParticipants - self.formData.minParticipants >30) {
						self.$alert("最大成团人数和最小成团人数相差不能超过30人！", {
							confirmButtonText: "确定",
							callback: action => {}
						});
				} else {
						self.ajaxFn()
					}
				}else{
						self.ajaxFn()
				} 
          } else {
			  	self.ajaxFn()
          }
        } else {
          alert("有必填项未填写或者填写有误！！！");
        }
      });
    }
  },

  watch: {
    "formData.fullRefund": function(val) {
      this.formData.refundInstructions = "";
      if (val) {
        if (this.initialrefund) {
          this.formData.refundInstructions = this.initialrefundInstructions;
        }
      } else {
        if (!this.initialrefund) {
          this.formData.refundInstructions = this.initialrefundInstructions;
        }
      }
	}
  },
  head() {
    return {
      title: this.title
    };
  }
};
</script>




<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.box {
  padding: 20px;
  background: #f2f2f2;
}
.ml60 {
  margin-left: 60px;
}
.ml115 {
  margin-left: 115px;
}
.display {
  display: block !important;
}
.paddingL40 {
  padding-left: 40px !important;
}
.valError {
  border: 1px solid red !important;
}
.vTip {
  color: red !important;
  padding-left: 115px;
}
</style>
