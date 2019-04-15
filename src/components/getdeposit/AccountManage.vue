<template>
  <div class='orderappeal'>
    <Header :active=5></Header>
    <div class='box con-box w1200'>
      <PersonList :active="chooseitem"></PersonList>
       <el-col :span="20">
         <div class="order_appeal" v-if="this.bankList.length!=1">
           <div class="order_appeal_box">
             <img src="@/assets/img/orderappeal/appeal.png" alt="">
             <router-link to="/bindbank" style="width: 110px;">+绑定银行卡</router-link>
           </div>
         </div>
         <!-- 提现账号管理列表 -->
         <div class="order_appeal" style="padding-bottom: 0;" :class="this.bankList.length!=1?'margin-top':''">
           <div class="add_appeal_title" style="margin-bottom: 0;">
             <p style="font-size: 18px; color: #333;">提现/退款账号管理</p>
           </div>
         </div>
         <div class="appeal_list">
           <ul>
             <li v-for="(item, index) in bankList" :key="index">
               <el-table :data="Array(item)" border :header-cell-style="{'text-align':'center','font-weight':'normal','background':'#f5f5f5'}" :cell-style="{'text-align':'center','color':'#333'}">
                 <el-table-column prop="username" label="姓名"></el-table-column>
                 <el-table-column prop="bankname" label="开户行">
                   <template slot-scope="scope">
                     <img v-if="scope.row.bankname!=(195||194||193||176)" :src="scope.row.bankname|bankIMGFilter" width="180" height="36">
                     <span v-else>{{scope.row.bankname|bankIMGFilter}}</span>
                   </template>
                 </el-table-column>
                 <el-table-column prop="cardnum" label="账号">
                   <tempalte slot-scope="scope">
                     <span>{{scope.row.cardnum|cardnumFilter}}</span>
                   </tempalte>
                 </el-table-column>
                 <el-table-column prop="bankaddr" label="开户所在地"></el-table-column>
                 <el-table-column prop="state" label="状态">
                   <template slot-scope="scope">
                     <span v-if="scope.row.state == 2" class="color-3565dc">绑定成功</span>
                   </template>
                 </el-table-column>
               </el-table>
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

export default {
  name: 'bankpay',
  data () {
    return {
      msg: '提现账号管理',
      bankList: [] //提现账号数据
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
        return 'accountManage'
      } else {
        return active
      }
    }
  },
  async mounted(){
    this.getBankList()
  },
  methods: {
    async getBankList () {
      //获取提现账号数据
      let data = await this.ajax({
        url: `SellerCenterInterface/tiedcardlist?tk=${sessionStorage.token}`,
      })
      if (!data) return false
      this.bankList = data.data
      if (this.bankList.length != 0) {
        //追加绑定成功状态
        this.$set(this.bankList[0], `state`, '2')
      }
    }

  },
  filters: {
    bankIMGFilter (str) {
      switch (str) {
        case 176:
          return '广州市农村信用合作社'
        case 193:
          return '农村商业银行'
        case 194:
          return '城市商业银行'
        case 195:
          return '农村信用合作社'
        default:
          return `static/img/${str}.png`
      }
    },
    cardnumFilter (str) {
      return str.replace(/^(\d{4})\d*(\d{4})$/, '$1 **** **** $2')
    }
  }
}
</script>

<style scoped>
@import '../../assets/css/orderappeal/orderappeal.css';
.add_appeal_title {
  height: 24px;
  font-size: 18px;
  border-left: 4px solid #e73c3a;
  padding-left: 20px;
  margin-bottom: 10px;
}
.color-3565dc {
  color: #3565dc;
}
.margin-top {
  margin-top: 8px;
}
</style>
