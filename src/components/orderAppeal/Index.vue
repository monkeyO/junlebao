<template>
  <div class='orderappeal'>
    <Header :active=5></Header>
    <div class='box con-box w1200'>
      <PersonList></PersonList>
       <el-col :span="20">
         <!-- 订单申诉 -->
         <div class="order_appeal">
           <div class="order_appeal_box">
             <img src="@/assets/img/orderappeal/appeal.png" alt="">
             <router-link to="/addappeal">+订单申诉</router-link>
           </div>
         </div>
         <!-- 温馨提示 -->
         <div class="warm_prompt">
           温馨提示：若有问题，请联系在线客服QQ:8888888（09：00-21：00）处理完成的单子客服将留言至您的QQ，请注意查收
         </div>
         <!-- 申诉列表 -->
         <div class="appeal_list">
          <ul>
            <li v-for="(item, index) in dataList" :key="index">
              <div class="list_item_title">
                <!--<span class="tb"></span>-->
                <span class="shopname">{{item.shopname}}</span>
                <span class="orderno">任务编号：{{item.taskno}}</span>
                <span class="pull-right" style="margin-left: 10px;">订单编号：{{item.payorderno}}</span>
                <span class="pull-right">子任务编号：{{item.sub_taskno}}</span>
              </div>
              <el-table :data="Array(item)" border :header-cell-style="{'text-align':'center','font-weight':'normal'}" :cell-style="{'text-align':'center','color':'#333'}">
                <el-table-column prop="buyer_wangwang" label="买手旺旺号"></el-table-column>
                <el-table-column prop="type" label="申诉类型展示"></el-table-column>
                <el-table-column prop="reason" label="申诉理由"></el-table-column>
                <el-table-column label="凭证截图" prop="img1, img2" width="313">
                  <template slot-scope="scope">
                    <img :src="scope.row.img1" width="106" height="80" @click="showIMG(scope.row.img1)" style="cursor: pointer;" v-if="scope.row.img1" :class="scope.row.img1 && scope.row.img2?'margin_space':''">
                    <img :src="scope.row.img2" width="106" height="80" @click="showIMG(scope.row.img2)" style="cursor: pointer;" v-if="scope.row.img2">
                  </template>
                </el-table-column>
                <el-table-column prop="state" label="状态">
                  <template slot-scope="scope">
                    <span v-if="scope.row.state == 0" class="color-e45858">待处理</span>
                    <span v-if="scope.row.state == 1" class="color-e45858">处理中</span>
                    <span v-if="scope.row.state == 2">完成</span>
                  </template>
                </el-table-column>
              </el-table>
            </li>
            <li v-if="complainList.length>0">
              <el-pagination
                @current-change="currentChange"
                :current-page="nowpage"
                :page-size="pageSize"
                :total="complainList.length">
              </el-pagination>
            </li>
          </ul>
         </div>
       </el-col>
    </div>
  </div>
</template>

<script>
import Header from '@/components/public/Header'
import PersonList from '@/components/public/PersonList'
import {MessageBox} from 'element-ui'

export default {
  name: 'orderAppeal',
  data () {
    return {
      msg: '申诉列表',
      dataList: [],
      complainList: [],
      nowpage: 1, //当前页
      pageSize: 3 //每页显示条数
    }
  },
  components: {
    Header,
    PersonList
  },
  async mounted(){
    //获取订单申诉数据
    let data = await this.ajax({
      url: `SellerCenterInterface/complainList?tk=${sessionStorage.token}`,
    })
    if(!data) return false

    this.complainList = data.data
    //默认显示第一页数据
    this.currentChange(1)
  },
  methods: {
    //点击查看图片
    showIMG(url){
      MessageBox.alert(`<img src='${url}' width='100%' >`,'',{
        dangerouslyUseHTMLString:true,
        showClose: false
      })
    },
    currentChange(page){
      this.nowpage = page
      var start = (page-1) * this.pageSize;
      var end = start + this.pageSize;
      this.dataList = this.complainList.slice(start, end)
    }
  }
}
</script>

<style scoped>
@import '../../assets/css/orderappeal/orderappeal.css';
</style>
