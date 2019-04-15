<template>
  <el-row style='padding:20px' type="flex" align='middle'>
    <el-col :span="3">
      <img src="@/assets/img/common/head.png" alt="">
    </el-col>
    <el-col :span="7" class='personinfo'>
      <p>用户名：<span class="color-font">{{userInfo.phone}}</span></p>
      <p>会员等级：<span class="color-font">{{userInfo.isvip==1?'普通会员':userInfo.isvip==2?'VIP会员':''}}</span></p>
      <p v-if="userInfo.isvip==2">会员到期时间：
        <span class="color-font">{{userInfo.vipdate}}</span>
      </p>
      <router-link to="/recharge?active=recharge-getvip" class='renew'>{{userInfo.isvip==1?'充值会员':'续费会员'}}</router-link>
    </el-col>
    <el-col :span="13">
      <el-col :span="8" class='col8'>
        <div class='p-top'>
          <p>{{userInfo.money}}<em>元</em></p>
          <el-button round size='mini' class='usableJB btn'>可用金币</el-button>
        </div>
        <div class='p-bottom'>
          <router-link to="/recharge?active=recharge-center">
            <el-button type="primary" size='mini' class='rechargeJB btn'>充值金币</el-button>
          </router-link>
        </div>
      </el-col>
      <el-col :span="8"  class='col8'>
        <div class='p-top'>
          <p>{{userInfo.deposit}}<em>元</em></p>
          <el-button round size='mini' class='usableJB btn'>可用押金</el-button>
        </div>
        <div class='p-bottom'>
          <router-link to="/recharge?active=recharge-yajin">
            <el-button type="primary" size='mini' class='rechargeJB btn'>充值押金</el-button>
          </router-link>
        </div>
      </el-col>
      <el-col :span="8" style="padding: 57px 6px; text-align: end;">
        <!--<div class='p-top'>-->
          <!--<p>{{userInfo.frozen1}}<em>元</em></p>-->
          <!--<el-button round size='mini' class='usableJB btn'>任务冻结押金</el-button>-->
        <!--</div>-->
        <!--<div class='p-bottom' style='padding-bottom: 36px;'>-->
          <!-- <el-button type="primary" size='mini' class='rechargeJB btn'></el-button> -->
        <!--</div>-->
        <router-link to="/task">
          <el-button type="danger" size="medium" class='gotask btn'>发布任务</el-button>
        </router-link>
      </el-col>
    </el-col>
    <!--<el-col :span="4" style='text-align: end;'>-->
      <!--<router-link to="/task">-->
        <!--<el-button type="danger" size="medium" class='gotask btn'>发布任务</el-button>-->
      <!--</router-link>-->
    <!--</el-col>-->
</el-row>
</template>
<script>
export default {
  name: 'CenterInfo',
  data () {
    return {

    }
  },
  computed: {
    // 获取当前登录信息
    userInfo () {
      return this.$store.state.userInfo
    }
  }
}
</script>
<style scoped>
span {
    font-weight: normal;
}
.el-row p{
  font-weight: bold;
  color: #333;
}
.el-row .col8{
  padding: 6px;
}
.el-row .personinfo{
  padding: 10px 0;
  border-right: 1px solid #CCC;
  margin-right: 20px;
}
.renew {
  display: inline-block;
  width: 82px;
  height: 26px;
  line-height: 26px;
  margin-top: 5px;
  text-align: center;
  background: #e4c984;
  color: #ac6e08;

}
.p-top{
  background: #E56A6A;
  position: relative;
  text-align: center;
  padding: 30px 0 30px 0;
}
.p-top p{
  font-size: 20px;
  font-weight: normal;
  color: white;
}
.p-top em{
  font-style: normal;
  font-size: 16px;
}
.p-top .usableJB{
  position: absolute;
  bottom: -13px;
  left: 10%;
  border: 2px solid #E56A6A;
  font-weight: bold;
  width: 80%;
  font-size: 14px;
  color: #E56A6A;
}
.p-top .usableJB:hover{
  color: #333;
  background: #fdfdfd;
}
.p-bottom .rechargeJB{
  font-size: 14px;
  border-radius: 0;
  padding-top: 5px;
  padding-bottom: 5px;
  color: #6aa6e5;
  border: 1px solid #6aa6e5;
  background: #fff;
}
.p-bottom .rechargeJB:hover {
  color: #fff;
  background: #6aa6e5;
}
.p-bottom{
  border: 1px solid #CCC;
  text-align: center;
  border-top: 0;
  padding: 25px 0 10px 0;
}
.gotask{
  padding: 14px 34px;
  font-size: 16px;
}
</style>
