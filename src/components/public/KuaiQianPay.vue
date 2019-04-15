<template>
    <div class="kuai_qian_pay">
      <Header :active=5></Header>
      <div class='box w1200'>
        <div class="content">
          <span class="kuaiqianpay_icon"></span>
          <span v-if="flag">支付中, <span style="color: #ff6c21;">{{second}}</span>秒后自动返回{{content}}</span>
          <span v-else>支付成功, 即将跳转</span>
        </div>
      </div>
    </div>
</template>

<script>
import Header from '@/components/public/Header'

export default {
  name: 'KuaiQianPay',
  data () {
    return {
      msg:`这是块钱支付页面`,
      content: ``, //显示对应内容
      url: ``, //跳转对应页面
      second: 30, //倒计时初始化时间
      interval: ``, //轮询定时器
      countdown: ``, //倒计时定时器
      flag: true //true-支付中 false-支付成功
    }
  },
  components: {
    Header
  },
  beforeRouteLeave (to, from, next) {
    delete sessionStorage.type
    delete sessionStorage.orderno
    delete sessionStorage.datearea
    clearInterval(this.interval)
    clearInterval(this.countdown)
    next()
  },
  async mounted () {
    //倒计时
    this.countDown()
    let type = sessionStorage.type
    let orderno = sessionStorage.orderno
    let datearea = sessionStorage.datearea
    // 判断页面跳转及显示内容
    if (type == 1 || type == 2) {
      this.content = `充值中心`
      this.url = `/recharge`
    } else if (type == 3) {
      this.content = `店铺列表`
      this.url = `/personal?active=shop`
    } else {
      this.content = `我的任务`
      this.url = '/mytask'
    }
    //金币充值、押金充值、绑定店铺快钱支付
    if (type) {
      this.interval = setInterval(() => {
        //获取数据
        this.ajax({
          url: `TaskManageInterface/getpaystate?tk=${sessionStorage.token}`,
          data: {type, orderno}
        }).then(res => {
          if (res.code == 0) {
            //支付成功
            this.flag = false
            setTimeout(() => {
              this.$store.dispatch('userInfo')
              this.$router.push(this.url)
            }, 2000)
          }
        })
      },3000)
    //发布任务快钱支付
    } else {
      this.interval = setInterval(()=>{
        //获取数据
        this.ajax({
          url: `TaskManageInterface/getpayinfo?tk=${sessionStorage.token}`,
          data: {orderno, datearea}
        }).then(res=>{
          if(res.data == 1){
            //支付成功
            this.flag = false
            setTimeout(() => {
              this.$store.dispatch('userInfo')
              this.$router.push(this.url)
            }, 2000)
          }
        })
      },3000)
    }
  },
  methods: {
    //倒计时
    countDown () {
      this.countdown = setInterval(() => {
        if (this.second == 0) {
          this.$store.dispatch('userInfo')
          this.$router.push(this.url)
        } else {
          this.second--
        }
      }, 1000)
    }
  }
}
</script>

<style scoped>
.kuai_qian_pay {
  background: #F0F0F0;
  padding-bottom: 150px;
}
.box {
  background: #eeffce;
  margin-top: 44px;
  padding: 24px 0;
}
.content {
  display: flex;
  align-items: center;
  padding-left: 36px;
  font-size: 16px;
  line-height: 16px;
  color: #3c3c3c;
  letter-spacing: 2px;
}
.kuaiqianpay_icon {
  display: inline-block;
  width: 36px;
  height: 35px;
  background: url('../../assets/img/common/kuaiqianpay_icon.png') no-repeat;
  background-size: 100%;
  margin-right: 30px;
}
</style>
