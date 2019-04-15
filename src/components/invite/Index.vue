<template>
  <div class="invite minW1550">
    <!-- 顶部 -->
    <Header :active=3></Header>
    <!-- banner -->
    <div class="banner">
      <img src="@/assets/img/invite/invite_banner.png" alt="" class="img_width">
    </div>
    <!-- 免费放单 -->
    <AcquiringRule :meal="meal"></AcquiringRule>
    <!-- 邀请方式 -->
    <InviteWay :inviteway="inviteway"></InviteWay>
    <!-- 邀请排行榜 -->
    <InviteRanking :ranking="ranking"></InviteRanking>
    <!-- 常见问题 -->
    <CommonQuestion></CommonQuestion>
  </div>
</template>

<script>
import Header from '@/components/public/Header'
import InviteWay from '@/components/invite/InviteWay'
import AcquiringRule from '@/components/invite/AcquiringRule'
import InviteRanking from '@/components/invite/InviteRanking'
import CommonQuestion from '@/components/invite/CommonQuestion'

export default {
  name: 'Invite',
  data () {
    return {
      msg: '这里是邀请返利',
      inviteway: [],
      meal: [],
      ranking: []
    }
  },
  async mounted () {
    //获取邀请返利数据
    let data = await this.ajax({
      url: `SellerCenterInterface/sellerInvite?tk=${sessionStorage.token}`,
      needAlert: false
    })
    this.inviteway[0] = data.inviteurl //邀请链接
    this.inviteway[1] = data.pic //二维码
    this.inviteway[2] = data.invitecode //邀请码
    this.meal = data.meal //充值套餐
    this.ranking = data.ranking //排行榜
  },
  components: {
    Header,
    InviteWay,
    AcquiringRule,
    InviteRanking,
    CommonQuestion
  }
}
</script>

<style scoped>
.invite {
  background: #fff6ed;
}
/* banner样式 */
.banner {
  position: relative;
  z-index: 9;
}
</style>
