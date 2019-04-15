<template>
    <div class='personlist'>
        <div class="person_top">
            <img src="@/assets/img/common/head.png" alt="">
            <p>{{userInfo.phone}}</p>
        </div>
        <ul class="person-ul" @click='choooseitem($event)'>
            <li class="person-ul-li">
                <img src="@/assets/img/common/zhgl.png" alt="">
                账户管理
            </li>
            <li>
                <span :class='active=="person"?"active":""' id='person'>个人中心</span>
            </li>
            <li>
                <span :class='active=="shop"?"active":""' id='shop'>绑定店铺</span>
            </li>
            <li>
                <span :class='active=="info"?"active":""' id='info'>信息管理</span>
            </li>
            <li class="person-ul-li">
                <img src="@/assets/img/common/cwgl.png" alt="">
                财务管理
            </li>
            <li>
                <span :class='active=="recharge-center" || active=="recharge-yajin" ? "active" : ""' id='recharge-center'>充值中心</span>
            </li>
            <li>
                <span :class='active=="recharge-zjdetail"?"active":""' id='recharge-zjdetail'> 资金明细</span>
            </li>
            <li>
                <span :class='active=="recharge-czdetail"?"active":""' id='recharge-czdetail'> 充值明细</span>
            </li>
            <li>
                <span :class='active=="recharge-getvip"?"active":""' id='recharge-getvip'> 充值会员</span>
            </li>
            <li>
              <span>
                <!-- <span :class='active=="bindBank"?"active":""' id='bindBank'>绑定</span>&nbsp;|&nbsp; -->
                <span :class='active=="getDeposit"?"active":""' id='getDeposit'>押金提现</span>
              </span>
            </li>
            <li>
              <span :class='active=="accountManage"?"active":""' id='accountManage'>提现账号管理</span>
            </li>
            <!--<li>-->
              <!--<span :class='active=="bankpay"?"active":""' id='bankpay'>线下转账记录</span>-->
            <!--</li>-->
            <li class="person-ul-li">
                <img src="@/assets/img/common/rwgl.png" alt="">
                管理任务
            </li>
            <li>
                <span :class='active=="task"?"active":""' id='task'> 发布任务</span>
            </li>
            <li>
                <span :class='active=="my-task"?"active":""' id='my-task'> 我的任务</span>
            </li>
            <li>
                <span :class='active=="kuaidimanage"?"active":""' id='kuaidimanage'> 快递管理</span>
            </li>
            <!-- <li>
                <span :class='active=="ask-task"?"active":""' id='ask-task'> 发布问大家任务</span>
            </li> -->
            <li>
              <span :class='active=="blacklist"?"active":""' id='blacklist'> 黑名单</span>
            </li>
            <li class='appeal-li'>
                <button class='appeal' id='appeal'>订单申诉</button>
            </li>
            <li class="person-ul-ewm">
                <div>
                    <img style="width: 200px;" src="@/assets/img/common/qr_code_index.jpg" alt="">
                    <p>添加运营小二微信 </p>
                    <p>免费诊断店铺情况 </p>
                    <p>提供推广优化建议 </p>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
  name: 'PersonList',
  data () {
    return {
    }
  },
  computed: {
    active () {
      //获取当前被选中的功能模块
      return this.$attrs.active
    },
    // 获取当前登录信息
    userInfo () {
      return this.$store.state.userInfo
    }
  },
  mounted () {
  },
  methods: {
    choooseitem (event) {
      let id = event.target.id
      if (id == 'person' || id == 'shop' || id == 'info') {
        this.$router.push(`/personal?active=${id}`)
      } else if (id == 'recharge-center' || id == 'recharge-zjdetail' || id == 'recharge-czdetail' || id == 'recharge-getvip') {
        this.$router.push(`/recharge?active=${id}`)
      } else if (id == 'task') {
        this.$router.push(`/task`)
      } else if (id == 'my-task') {
        this.$router.push(`/mytask`)
      } else if (id == 'ask-task') {
        this.$router.push(`/asktask`)
      } else if (id == 'appeal') {
        this.$router.push(`/orderappeal`)
      } else if (id == 'blacklist') {
        this.$router.push(`/blacklist`)
      } else if (id == 'kuaidimanage') {
        this.$router.push(`/kuaidimanage`)
      }else if(id == 'bindBank'){
        this.$router.push(`/bindBank`)
      }else if(id == 'getDeposit'){
        this.$router.push(`/getDeposit`)
      }else if(id == 'accountManage'){
        this.$router.push(`/accountManage`)
      }
    }
  }
}
</script>
<style>
@import '../../assets/css/public/personalist.css';
</style>
