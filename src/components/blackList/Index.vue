<template>
  <div class='orderappeal'>
    <Header :active=5></Header>
    <div class='box con-box w1200'>
      <PersonList :active="chooseitem"></PersonList>
       <el-col :span="20">
         <!-- 黑名单 -->
         <div class="order_appeal">
           <div class="order_appeal_box">
             <img src="@/assets/img/blacklist/appeal.png" alt="">
             <router-link to="/blackappeal">+黑名单</router-link>
           </div>
         </div>
         <!-- 黑名单列表 -->
         <div class="appeal_list" style="margin-top: 8px;">
          <ul>
            <li v-for="(item, index) in dataList" :key="index">
              <el-table :data="Array(item)" border :header-cell-style="{'text-align':'center','font-weight':'normal','background':'#f5f5f5'}" :cell-style="{'text-align':'center','color':'#333'}">
                <el-table-column prop="createdate" label="拉黑时间"></el-table-column>
                <el-table-column prop="buyer_account" label="用户买号"></el-table-column>
                <el-table-column prop="orderid" label="订单号"></el-table-column>
                <el-table-column prop="type" label="拉黑原因">
                  <template slot-scope="scope">
                    <span v-if="scope.row.type=='其他'">{{scope.row.reason}}</span>
                    <span v-else>{{scope.row.type}}</span>
                  </template>
                </el-table-column>
                <el-table-column label="图片" prop="img">
                  <template slot-scope="scope">
                    <img :src="scope.row.img" width="106" height="80" @click="showIMG(scope.row.img)" style="cursor: pointer;">
                  </template>
                </el-table-column>
                <el-table-column prop="state" label="操作">
                  <template slot-scope="scope">
                    <span class="color-e45858" @click="submit(item.id)" style="cursor: pointer;">解封</span>
                  </template>
                </el-table-column>
              </el-table>
            </li>
            <li v-if="blackList.length>0">
              <el-pagination
                @current-change="currentChange"
                :current-page="nowpage"
                :page-size="pageSize"
                :total="blackList.length">
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
  name: 'backlist',
  data () {
    return {
      msg: '黑名单列表',
      dataList: [],
      blackList: [],
      nowpage: 1, //当前页
      pageSize: 4 //每页显示条数
    }
  },
  components: {
    Header,
    PersonList
  },
  computed: {
    //处理跳转路由时需要点亮的item
    chooseitem () {
      let active = this.$route.query.active
      if (active == undefined) {
        return 'blacklist'
      } else {
        return active
      }
    }
  },
  async mounted(){
    this.getBlackList()
  },
  methods: {
    //点击查看图片
    showIMG(url){
      MessageBox.alert(`<img src='${url}' width='100%' >`,'',{
        dangerouslyUseHTMLString:true,
        showClose: false
      })
    },
    async getBlackList () {
      //获取黑名单数据
      let data = await this.ajax({
        url: `SellerCenterInterface/getBlackList?tk=${sessionStorage.token}`,
      })
      if(!data) return false

      this.blackList = data.data
      //默认显示第一页数据
      this.currentChange(1)
    },
    async submit(id) {
      //解封
      let data = await this.ajax({
        url: `SellerCenterInterface/unblocking?tk=${sessionStorage.token}`,
        data: {"id": id},
        withCredentials: true
      })

      if(!data) return false
      MessageBox.alert(data.msg,{
        lockScroll: false,
        confirmButtonText: '确定',
        callback: ()=>{
          this.getBlackList()
        }
      })
    },
    currentChange(page){
      this.nowpage = page
      var start = (page-1) * this.pageSize;
      var end = start + this.pageSize;
      this.dataList = this.blackList.slice(start, end)
    }
  }
}
</script>

<style scoped>
@import '../../assets/css/orderappeal/orderappeal.css';
</style>
