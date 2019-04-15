<template>
    <div class='recharge'>
        <Header :active=2></Header>
        <div class='box con-box w1200'>
            <PersonList :active='chooseitem'></PersonList>
            <el-col :span="20" class="content">
                <el-tabs type="border-card"  :value="chooseitem">

                  <el-tab-pane :name='tabsName[0]'>
                    <span slot="label" @click='tabchange(tabsName[0])'>
                      <img src="@/assets/img/recharge/tabs_img_1.png" alt="">
                      <p>金币充值</p>
                      <div class="active_line"></div>
                    </span>
                    <!-- 金币充值 -->
                    <GoldRecharge v-if="chooseitem==tabsName[0]"></GoldRecharge>
                  </el-tab-pane>

                  <el-tab-pane :name='tabsName[1]'>
                    <span slot="label" @click='tabchange(tabsName[1])'>
                      <img src="@/assets/img/recharge/tabs_img_2.png" alt="">
                      <p>押金充值</p>
                      <div class="active_line"></div>
                    </span>
                  <!-- 押金充值 -->
                  <DepositRecharge v-if="chooseitem==tabsName[1]"></DepositRecharge>
                  </el-tab-pane>

                  <el-tab-pane :name='tabsName[2]'>
                    <span slot="label" @click='tabchange(tabsName[2])'>
                      <img src="@/assets/img/recharge/tabs_img_3.png" alt="">
                      <p>会员充值</p>
                      <div class="active_line"></div>
                    </span>
                  <!-- 会员充值 -->
                  <MemberRecharge v-if="chooseitem==tabsName[2]"></MemberRecharge>
                  </el-tab-pane>

                  <el-tab-pane :name='tabsName[3]'>
                    <span slot="label" @click='tabchange(tabsName[3])'>
                      <img src="@/assets/img/recharge/tabs_img_4.png" alt="">
                      <p>充值明细</p>
                      <div class="active_line"></div>
                    </span>
                  <!-- 充值明细 -->
                  <RechargeDetail v-if="chooseitem==tabsName[3]"></RechargeDetail>
                  </el-tab-pane>

                  <el-tab-pane :name='tabsName[4]'>
                    <span slot="label" @click='tabchange(tabsName[4])'>
                      <img src="@/assets/img/recharge/tabs_img_5.png" alt="">
                      <p>资金明细</p>
                      <div class="active_line"></div>
                    </span>
                  <!-- 资金明细 -->
                  <FinancialDetail v-if="chooseitem==tabsName[4]"></FinancialDetail>
                  </el-tab-pane>

                </el-tabs>
            </el-col>
        </div>
    </div>
</template>
<script>
// 公共头
import Header from '@/components/public/Header'
// 左侧侧边栏
import PersonList from '@/components/public/PersonList'
// 金币充值
import GoldRecharge from './GoldRecharge'
// 押金充值
import DepositRecharge from './DepositRecharge'
// 会员充值
import MemberRecharge from './MemberRecharge'
// 充值明细
import RechargeDetail from './RechargeDetail'
// 资金明细
import FinancialDetail from './FinancialDetail'

export default {
  name: 'Recharge',
  data () {
    return {
      tabsName: ['recharge-center', 'recharge-yajin', 'recharge-getvip', 'recharge-czdetail', 'recharge-zjdetail']
    }
  },
  mounted () {

  },
  computed: {
    // 处理跳转路由时需要点亮的item
    chooseitem () {
      let active = this.$route.query.active
      if (active == undefined) {
        return 'recharge-center'
      } else {
        return active
      }
    }
  },
  components: {
    Header,
    PersonList,
    GoldRecharge,
    DepositRecharge,
    MemberRecharge,
    RechargeDetail,
    FinancialDetail
  },
  methods: {
    tabchange (name) {
      this.$router.push(`/recharge?active=${name}`)
    }
  }
}
</script>
<style scoped>
.recharge {
  background: #F0F0F0;
}
.box{
    display: flex;
    justify-content: center;
}
/* 充值中心标签页导航样式 */
.content {
  margin-left: 15px;
}
/* 装饰图样式 */
.content img {
  display: block;
  margin: 10px auto 0;
}
/* 标题文字样式 */
.content p {
  font-size: 16px;
  color: #3a3b3f;
  text-align: center;
}
/* 选中下划线样式 */
.active_line {
  display: none;
  width: 30%;
  border-bottom: 2px solid #f86903;
  margin: 2px auto 0;
}
/* 标签页导航选中时显示下划线 */
.is-active .active_line {
  display: block;
}

</style>
