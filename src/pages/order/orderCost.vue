<template>
  <div class="cms-page">
    <cmsAside :activeTitle="'6-2'"></cmsAside>
      <div class="cms-main orderCost">
        <h3 class="text_c">计调信息明细</h3>
        
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column  label="类型" width="160">
            <template slot-scope="scope">
              <el-select class="w140" v-model="scope.row.objectType" placeholder="请选择类型">
                <el-option
                  v-for="item in typeArr"
                  :key="item.typeStr"
                  :label="item.typeStr"
                  :value="item.objectType">
                </el-option>
              </el-select>
            </template>
          </el-table-column>


          <el-table-column  label="起始日期" width="170" v-if="durationUnit=='DAYS'">
            <template slot-scope="scope">
              <el-date-picker  class="w140"
                v-model="scope.row.startDate" 
                :default-value="scope.row.startDate"
                type="date" 
                value-format="yyyy-MM-dd"
                placeholder="起始日期">
              </el-date-picker>
            </template>
          </el-table-column>
          <el-table-column  label="截止日期" width="170" v-if="durationUnit=='DAYS'">
            <template slot-scope="scope">
              <el-date-picker class="w140"
                v-model="scope.row.endDate"
                type="date" 
                value-format="yyyy-MM-dd"
                placeholder="截止日期">
              </el-date-picker>
            </template>
          </el-table-column>


          <el-table-column width="200" :render-header="getAllPrice">
            <template slot-scope="scope">
              　¥　<el-input class="w120" v-model="scope.row.amount" placeholder="请输入价格"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="message" label="备注信息">
            <template slot-scope="scope">
              <el-input type="textarea" v-model="scope.row.message" :rows="2" placeholder="请输入备注信息"></el-input>
            </template>
          </el-table-column>
          <el-table-column  label="操作" width="180">
            <template slot-scope="scope">
              <div class="btn_box">
                <el-button @click="saveData(scope.row,scope.$index)" type="primary" size="small" v-if="!scope.row.id">保存</el-button>
                <el-button @click="saveData(scope.row,scope.$index)" type="primary" size="small" plain v-else>更新</el-button>
                <el-button @click="delData(scope.row,scope.$index)" type="danger" size="small" plain>删除</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="add_type" :class="{'add_type_b':this.tableData.length}">
          <el-button @click="addList" type="primary" icon="el-icon-plus" plain>添加计调信息</el-button>
        </div>

      </div>
  </div>
</template>
<script>
import cmsAside from "@/components/common/cmsAside.vue";
export default {
  name: "orderCost",
  data() {
    let id = this.$route.query.id;
    return {
      orderId: id,
      durationUnit: '',
      startDate:'',
      typeArr:[
        {'objectType':'GUIDE', 'typeStr': '导游'},
        {'objectType':'DRIVER', 'typeStr': '司机'},
        {'objectType':'TICKET', 'typeStr': '门票'},
        {'objectType':'CATERING', 'typeStr': '餐饮'},
        {'objectType':'MEAL_SUBSIDY', 'typeStr': '司机导游餐补'},
        {'objectType':'TRAIN', 'typeStr': '火车票'},
        {'objectType':'FLIGHT', 'typeStr': '机票'},
        {'objectType':'HOTEL', 'typeStr': '酒店'},
        {'objectType':'OTHER', 'typeStr': '其他'}
      ],
      tableData:[
        // {
        //   "orderId": 231454654,
        //   "amount": '100.50',
        //   "message": "asdasdasddadasdasdasdasdsa",
        //   "objectType": "GUIDE", //[ GUIDE, DRIVER, TICKET, CATERING, MEAL_SUBSIDY ]
        // }
      ]
    };
  },
  components: {
    cmsAside
  },
  methods: {
    getAllPrice(){
      var tableData = this.tableData;
      var priceAll = 0;
      for(var i=0;i<tableData.length;i++){
        var thisData = tableData[i];
        if(thisData.id){
          priceAll += thisData.amount*1;
        }
      }
      return '成本（ 总：¥'+priceAll+' ）';
    },
    addList(){
      // var dayArr = this.startDate.split('-');
      // console.log(new Date(parseInt(dayArr[0]),parseInt(dayArr[1])-1,parseInt(dayArr[2])));
      this.tableData.push({
        "id":'',
        "orderId": this.orderId,
        "amount": '',
        "message": "",
        "startDate": this.startDate,
        "endTime":'',
        "objectType": "", //[ GUIDE, DRIVER, TICKET, CATERING, MEAL_SUBSIDY ]
      });
    },
    addOperator(obj,type,index) {
      let self = this;

      if(!obj.objectType){
        self.$message({message: "类型未选择！",type: "error"});
        return;
      }
      // else if(!obj.amount){
      //   self.$message({message: "价格信息未填写！",type: "error"});
      //   return;
      // }else if(!/^\d+(?=\.{0,1}\d+$|$)/.test(obj.amount)){
      //   self.$message({message: "价格只能填写数字和小数点！",type: "error"});
      //   return;
      // }

      $.ajax({
        url: "https://cms.localpanda.com/cms/order/operator",
        type: type,
        dataType: "json",
        data: JSON.stringify(obj),
        contentType: "application/json",
        success: function(data) {
          if (data.succeed) {
            self.$message({
              message: "新增成功！",
              type: "success"
            });

            if(!self.tableData[index].id){
              self.tableData[index].id = data.response;
            }
            
          } else {
            self.$message({
              message: "新增失败！",
              type: "error"
            });
          }
        },
        error: function(data) {
          self.$message({
            message: "请求失败！",
            type: "error"
          });
        }
      });
    },
    saveData(data,index){
      if(data.id){
        this.addOperator(data,'POST',index);
      }else{
        this.addOperator(data,'PUT',index);
      }
    },
    delData(data,index){
      let self = this;
      if(data.id){
        $.ajax({
          url: "/cms/order/operator/"+data.id,
          type: "DELETE",
          dataType: "json",
          success: function(data) {
            if(data.succeed){
              self.$message({
                message: "删除成功！",
                type: "success"
              });
              self.tableData.splice(index,1);
            }else{
              self.$message({
                message: "删除失败！",
                type: "error"
              });
            }
          },
          error: function(data) {
            self.$message({
              message: "请求失败！",
              type: "error"
            });
          }
        });
      }else{
        this.tableData.splice(index,1);
      }
    },
    getData() {
      let self = this;
      $.ajax({
        url: "https://cms.localpanda.com/cms/order/"+this.orderId+"/operator/list",
        type: "GET",
        dataType: "json",
        success: function(data) {
          console.log(data);
          self.tableData = data;
        },
        error: function(data) {
          self.$message({
            message: "请求失败！",
            type: "error"
          });
        }
      });

      $.ajax({
        url: "https://cms.localpanda.com/cms/order/" + self.orderId + "/activity",
        type: "GET",
        dataType: "json",
        success: function(data) {
          console.log(data);
          self.startDate = data.startDate;
          self.durationUnit = data.activityInfo.durationUnit;
        },
        error: function(data) {
          self.$message({
            message: "请求失败！",
            type: "error"
          });
        }
      });
    },
  },
  mounted() {
    let that = this;
    this.getData();
  }
};
</script>
<style lang="scss" scoped>
.orderCost{
  .btn_box{
    text-align: center;
  }
  .add_type{
    text-align: center;
    position: relative;
    top: -50px;
  }
  .add_type_b{
    position: relative;
    top: 0;
    width: 100%;
    padding: 10px;
    border: 1px solid #ebeef5;
    border-top: none;
    box-sizing: border-box;
  }
}
</style>