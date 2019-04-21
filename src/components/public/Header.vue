<template>
<div>
  <div class="head" :class="active==1?'fixed':''">
      <div id='h-top' class='clearfix' >
        <div class="w1200">
          <span class='pull-left'>
            <span class='login'>
              <span  v-if="loginState">
                  您好,{{userInfo.phone}} | <span @click="exit" class='pointer'>退出</span>
              </span>
              <span v-else @click="login" class='pointer login-btn'>
                登录
              </span>
            </span>
            <!-- <router-link to="/reg" slot="left">
              <span class='active'> [调试用注册入口]</span>
            </router-link> -->
          </span>
          <span class='pull-right'>
            <span  v-if="loginState" class='h-right'>
              <div class="h-right-a" v-if="userInfo.isvip == 2">
                <img src="@/assets/img/common/vip.png" alt="" class='vipimg'>
                <span>VIP会员</span>
                <span>会员到期时间：<span>{{userInfo.vipdate}}</span></span>
                <router-link to="/recharge?active=recharge-getvip" class="color-red">[续费]</router-link>
              </div>
              <div class="h-right-b">
                <span>可用押金：<span>{{userInfo.deposit}}</span></span>
                <span style="margin-left: 10px;">可用金币：<span>{{userInfo.money}}</span></span>
              </div>
              <div class="h-right-c">
                <router-link to="/recharge?active=recharge-yajin"><span :class="setRecharge==2?'active':''">充值押金</span></router-link>
                <span> | </span>
                <router-link to="/recharge?active=recharge-center"><span :class="setRecharge==1?'active':''">充值金币</span></router-link>
              </div>
            </span>
            <span v-else>
              QQ客服： 8888888
            </span>
          </span>
        </div>
      </div>
      <div id='h-bottom'>
        <div class="w1200">
          
          <div id="logo">
              <img src="@/assets/img/common/58logo.png" alt="logo" height="60px">
              <div>
                  <p clsss="logo-top">爆款打造专家</p>
                  <p class="logo-bottom">安全&nbsp;快速&nbsp;高效</p>
              </div>
          </div>
            
            <ul v-if="loginState" class='h-ul'>
              <!-- <li>
                <router-link to="/">
                  <span :class='active==1?"active":""'>首页</span>
                </router-link>
              </li> -->
              <li>
                <router-link to="/recharge">
                  <span  :class='active==2?"active":""' class="head chongzhi">充值中心</span>
                </router-link>
              </li>
               <li>
                <router-link to="/fudai">
                  <span :class='active==6?"active":""' class='head fudai'>领取福袋</span>
                </router-link>
              </li>
              <li>
                <router-link to="/invite">
                  <span :class='active==3?"active":""' class="head">邀请返利</span>
                </router-link>
              </li>
              <li>
                <router-link to="/task">
                  <span :class='active==4?"active":""' class="head task">发布任务</span>
                </router-link>
              </li>
              <li>
                <router-link to="/personal">
                  <span :class='active==5?"active":""' class="head">卖家中心</span>
                </router-link>
              </li>
            </ul>


        </div>
      </div>
  </div>
  <!-- 侧边栏客服 -->
  <Service></Service>
</div>
</template>

<script>
import Service from '@/components/public/Service'

export default {
  name: 'Header',
  data () {
    return {
      active: 1
    }
  },
  components: {
    Service
  },
  computed: {
    // 获取登录状态
    loginState () {
      return this.$store.state.loginstate
    },
    // 获取当前登录信息
    userInfo () {
      return this.$store.state.userInfo
    },
    // 设置点亮充值押金与充值金币
    setRecharge () {
      if(this.$route.query.active == 'recharge-center'){
        return 1
      }else if(this.$route.query.active == 'recharge-yajin'){
        return 2
      }else{
        return 0
      }
    }
  },
  mounted () {
    // 获取当前被选中的功能模块
    this.active = this.$attrs.active
  },
  methods: {
    exit () {
      // 取消记住我状态
      localStorage.remember = 0
      //取消登录状态
      this.$store.dispatch('loginstate', false)
      //取消vuex中的信息
      this.$store.dispatch('userInfo')
      this.$router.push('/login')
    },
    login () {
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
@import '../../assets/css/public/header.css';
.head:hover{
  color: red;
}
li .head{
  font-size: 18px;
}
.h-right-c a{
  color: red;
}
.fudai{
  position: relative;
}
.fudai::before{
  content: ' ';
  display: block;
  position: absolute;
  top: -20px;
  right: -70px;
  width: 117px;
  height: 26px;
  background: url('../../assets/img/fudai1.png') no-repeat;
}
.chongzhi::before{
  content: ' ';
  display: block;
  position: absolute;
  top: -20px;
  right: -70px;
  width: 117px;
  height: 26px;
  background: url('../../assets/img/fudai2.png') no-repeat;
}
</style>
