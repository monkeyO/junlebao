<template>
  <div class="fudai minW1550">
    <!-- 顶部 -->
    <Header :active=6></Header>
    <!-- banner -->
    <div class="banner">
      <img src="@/assets/img/fudai/head.jpg" alt="" class="img_width">
    </div>
    <div class="banner">
      <img src="@/assets/img/fudai/1.jpg" alt="" class="img_width">
      <div class='content1'>
        <div class='left'>
          <p class='p'>邀请好友注册使用好卖符，<span class='color-red'>徒弟</span>每放1单下单任务，推荐人</p>
          <p>可获得0.5金币/单的<span class='color-red'>奖励</span></p>
          <p class='p'>如推荐人邀请徒弟10人，徒弟每日发布下单任务数为2000单，则</p>
          <p>推荐人每日可抽取1000金币</p>
          <p class='p'>注：该活动只针对徒弟发布的货返下单任务方可有效计算，立返任务不计算在内</p>
        </div>
        <div class='right'>
          <p class='color-red'>你发任务&nbsp;&nbsp;&nbsp;&nbsp;我买单</p>
          <p class='color-red fs40'>全年<span>免费</span>发任务</p>
          <button @click="getfudai(1)" class='btn'></button>
        </div>
      </div>
    </div>
    <div class="banner">
      <img src="@/assets/img/fudai/2.jpg" alt="" class="img_width">
      <div class='content2'>
        <div class='left'>
          <p style='margin-top: 20px;'>邀请<span class='color-red'>好友</span>来注册使用好卖符，好友注册即可<span class='color-red'>免费</span>获得</p>
          <p style='margin-top: 20px;'>价值200元2个月<span class='color-red'>会员</span>时长（此服务是送给被邀请好友</p>
          <p style='margin-top: 20px;'>的福利），师傅邀请徒弟发布任务人数<span class='color-red'>≥10人</span>，师傅</p>
          <p style='margin-top: 20px;'>可获得平台<span class='color-red'>终生</span>会员免费权</p>
        </div>
        <div class='right'>
          <p class='color-red'>邀请好友来注册</p>
          <p class='color-red fs40'>还有注册即<span>送2</span>个月会员</p>
          <button @click="getfudai(1)" class='btn'></button>
        </div>
      </div>
    </div>
    <div class="banner">
      <img src="@/assets/img/fudai/3.jpg" alt="" class="img_width">
      <div class='content3'>
        <div class='left'>
          <p class='title'>
            凡注册好卖符的商家，自注册之日起<span class='color-red'>一周内</span>绑定
          </p>
          <p style='margin-top:20px' class='title'>
            <span class='color-red'>≥3</span>个店铺，绑定店铺金额<span class='color-red'>全返</span>
          </p>
          <p class='p m20'>如：商家A注册一周内绑定了5个店铺，除第一个店铺外，绑</p>
          <p class='m20'>定其他店铺需支付100元/个，绑定4个店铺需累计支付400元</p>
          <p class='m20'>，注册一周内绑定了5个店铺，平台将会将您自费绑定店铺的</p>
          <p class='m20'>金额以金币的形式返还到您的账户</p>
        </div>
        <div class='right'>
          <p class='color-red'>注册一周内绑定3个店铺以上</p>
          <p class='color-red fs40' style='margin-top:10px'>绑定店铺金额全返</p>
          <button @click="getfudai(3)" class='btn'></button>
        </div>
      </div>
    </div>
    <div class="banner">
      <img src="@/assets/img/fudai/4.jpg" alt="" class="img_width">
      <div class='content4'>
        <div class='left'>
          <p class='title'>
            凡是注册好卖符的商家，近30天内日均发布任务
          </p>
          <p style='margin-top:20px' class='title'>
            <span class='color-red'>≥20</span>单，可免费<span class='color-red'>赠送</span>1个月<span class='color-red'>会员</span>
          </p>
          <p class='p m20'>如：商家A使用好卖符近30天内日均发布任务≥20单，那么</p>
          <p class='m20'>商家A可免费获得价值100元的VIP会员1个月，商家A次月也</p>
          <p class='m20'>满足日均发布任务≥20单，又可免费获得价值100元的VIP会</p>
          <p class='m20'>员1个月，以此类推</p>
        </div>
        <div class='right'>
          <p class='color-red'>当月日均任务≥20单</p>
          <p class='color-red fs40'>次月会员我买单</p>
          <button @click="getfudai(4)" class='btn'></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/public/Header'

export default {
  name: 'Invite',
  data () {
    return {
      msg: '这里是领取福袋',
    }
  },
  mounted () {
  },
  methods: {
    getfudai(item){
      if(item == 1){
        this.$router.push('invite')
      }
      if(item == 3){
        this.$router.push('personal?active=shop')
      }
      if(item == 4){
        this.$router.push('task')
      }
    }
  },
  components: {
    Header
  }
}
</script>

<style scoped>
/* banner样式 */
.banner {
  position: relative;
  z-index: 9;
  font-size: 18px;
}
.left .m20{
  margin-top: 10px;
}
.left .p{
  margin-top: 60px;
}
.left .title{
  font-size: 20px;
}
.right{
  font-size: 24px;
}
.right .fs40{
  font-size: 40px;
  border-bottom: 1px solid red;
  padding-bottom: 10px;
}
.right .fs40 span{
  font-size: 45px;
  font-weight: bold;
}
.content2 .fs40 span{
  font-weight: normal;
}
.btn{
  border: 0;
  display: block;
  width: 250px;
  height: 65px;
  background: url('../../assets/img/fudai/btn.png') no-repeat;
  background-size: 100%;
  margin-top: 50px;
}
.content1 .left,
.content2 .left,
.content3 .left,
.content4 .left{
    position: absolute;
    z-index: 999;
}
.content1 .right,
.content2 .right,
.content3 .right,
.content4 .right{
  position: absolute;
}

.content1 .left{
  top: 34%;
  left: 24%;
}
.content1 .right{
  top: 42%;
  right: 25%;
}
.content2 .left{
  top: 41%;
  right: 25%;
}
.content2 .right{
  top: 43%;
  left: 27%;
}
.content3 .left{
    top: 42%;
    left: 24%;
}
.content3 .right{
    top: 43%;
    right: 28%;
}
.content4 .left{
    top: 42%;
    left: 24%;
}
.content4 .right{
    top: 43%;
    right: 28%;
}

@media screen and (max-width: 1920px) {
  .banner  {
   font-size: 16px;
  }
  .left .m20{
    margin-top: 10px;
  }
  .left .p{
    margin-top: 40px;
  }
  .left .title{
    font-size: 18px;
  }
  .right{
    font-size: 20px;
  }
  .right .fs40{
    font-size: 30px;
  }
  .right .fs40 span{
    font-size: 35px;
    font-weight: bold;
  }
  .btn{
    width: 187px;
    height: 48px;
    margin-top: 35px;
  }
  .content1 .left{
    width: 31%;
  }
  .content1 .right{
    top: 42%;
    right: 27%;
  }

}
</style>
