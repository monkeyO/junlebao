<template>
  <div class="fudai minW1920">
    <!-- 顶部 -->
    <Header :active=6></Header>
    <!-- banner -->
    <div class="fudaibg">
      <div>
        <div style="text-align: center;">
          <img src="@/assets/img/fudai/title.png">
        </div>
        <div class="content_box">
          <div class="content_item" style="padding-top: 200px;">
            <img src="@/assets/img/fudai/step1.png" class="img_width" height="800px">
            <div class='content1'>
              <div class='left'>
                <p class='p'>邀请好友注册使用好卖符，徒弟每放1单下单任务，</p>
                <p>推荐人可获得0.5金币/单的奖励</p>
                <p class='p'>如推荐人邀请徒弟10人，徒弟每日发布下单任务数</p>
                <p>为2000单，则推荐人每日可抽取1000金币</p>
                <p class='p'>注：该活动只针对徒弟发布的货返下单任务方可有</p>
                <p>效计算，立返任务不计算在内</p>
              </div>
              <div class='right'>
                <p >你发任务&nbsp;&nbsp;&nbsp;&nbsp;我买单</p>
                <p class='fs40'>全年<span>免费</span>发任务</p>
                <button @click="getfudai(1)" class='btn'>领取福袋</button>
              </div>
            </div>
          </div>
          <div class="content_item">
            <img src="@/assets/img/fudai/step2.png" class="img_width" height="800px">
            <div class='content2'>
              <div class='left'>
                <p class="p">邀请好友来注册使用好卖符，好友注册即可免费</p>
                <p class="p">获得价值200元2个月会员时长（此服务是送给被</p>
                <p class="p">邀请好友的福利），师傅邀请徒弟发布任务人数</p>
                <p class="p">≥10人，师傅可获得平台终生会员免费权</p>
              </div>
              <div class='right'>
                <p style="font-size:45px">邀请好友来注册，好友注册</p>
                <p class='fs40' style="font-size:81px">即<span style="font-size:90px">送2</span>个月会员</p>
                <button @click="getfudai(1)" class='btn' style="background:#7DE564;color:#39961C">领取福袋</button>
              </div>
            </div>
          </div>
          <div class="content_item">
            <img src="@/assets/img/fudai/step3.png" class="img_width" height="800px">
            <div class='content3'>
              <div class='left'>
                <p>
                  凡注册好卖符的商家，自注册之日起一周内绑定≥3个
                </p>
                <p>
                  店铺，绑定店铺金额全返
                </p>
                <p class='p m20'>如：商家A注册一周内绑定了5个店铺，除第一个店铺</p>
                <p class='m20'>外，绑定其他店铺需支付100元/个，绑定4个店铺需</p>
                <p class='m20'>累计支付400元，注册一周内绑定了5个店铺，平台将</p>
                <p class='m20'>会将您自费绑定店铺的金额以金币的形式返还到您的</p>
                <p class='m20'>账户</p>
              </div>
              <div class='right'>
                <p style="font-size:45px">注册一周内绑定3个店铺以上</p>
                <p class='fs40' style='margin-top:10px;font-size:75px'>绑定店铺金额<span style="font-size:80px">全返</span></p>
                <button @click="getfudai(3)" class='btn' style="background:#FFD101;color:#826274">领取福袋</button>
              </div>
            </div>
          </div>
           <div class="content_item">
            <img src="@/assets/img/fudai/step4.png" class="img_width" height="800px">
            <div class='content4'>
              <div class='left'>
                <p>
                  凡是注册好卖符的商家，近30天内日均发布任务≥
                </p>
                <p style='margin-top:20px'>
                  20单，可免费赠送1个月会员
                </p>
                <p class='p m20'>如：商家A使用好卖符近30天内日均发布任务≥20</p>
                <p class='m20'>单，那么商家A可免费获得价值100元的VIP会员1</p>
                <p class='m20'>个月，商家A次月也满足日均发布任务≥20单，又</p>
                <p class='m20'>可免费获得价值100元的VIP会员1个月，以此类推</p>
              </div>
              <div class='right'>
                <p style="font-size:45px">当月日均任务≥20单</p>
                <p class='fs40' style="font-size:80px">次月会员我<span style="font-size:90px">买单</span></p>
                <button @click="getfudai(4)" class='btn'>领取福袋</button>
              </div>
            </div>
          </div>
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
/* 背景样式 */
.fudaibg{
  background: url('../../assets/img/fudai/fudaibg.jpg') no-repeat;
  background-size: 100%;
  padding-top: 1600px;
  padding-bottom: 230px;
}
.content_box{
  margin: 0 125px;
  margin-top: -115px;
  background: white;
  border-radius: 50px;
  font-size: 25px;
  color: white;
  padding-bottom: 100px;
}
.content_item{
  text-align: center;
  padding-top: 120px;
  position: relative;
  padding-left: 100px;
  padding-right: 100px;
}
.left .m20{
  margin-top: 20px;
}
.left .p{
  margin-top: 60px;
}
.right{
  font-size: 60px;
  text-shadow:3px 8px 13px rgba(0,0,0,0.3);
}
.right .fs40{
  font-size: 75px;
  padding-bottom: 10px;
}
.right .fs40 span{
  font-size: 83px;
  font-weight: bold;
}
.btn{
  border: 0;
  display: block;
  width: 424px;
  height: 157px;
  margin-top: 50px;
  font-size: 75px;
  background: #F45832;
  border-radius: 100px;
  color: white;
  letter-spacing: 5px;
  box-shadow:15px 25px 45px #daa200;
}
.content3 .btn{
  box-shadow:15px 25px 45px #737BFF;
}
.content2 .btn{
  box-shadow:15px 25px 45px #e65420;
}
.content4 .btn{
  box-shadow:15px 25px 45px #f0a515;
}

.content1 .left,
.content2 .left,
.content3 .left,
.content4 .left{
  position: absolute;
  z-index: 999;
  text-align: start;
}
.content1 .right,
.content2 .right,
.content3 .right,
.content4 .right{
  position: absolute;
  text-align: start;
}

.content1 .left{
  top: 34%;
  left: 13%;
}
.content1 .right{
  top: 38%;
  right: 13%;
}
.content2 .left{
  top: 38%;
  right: 14%;
}
.content2 .right{
  top: 43%;
  left: 12%;
}
.content3 .left{
    top: 42%;
    left: 12%;
}
.content3 .right{
    top: 43%;
    right: 11%;
}
.content4 .left{
    top: 42%;
    right: 11%;
}
.content4 .right{
    top: 43%;
    left: 12%;
}

@media screen and (max-width: 1920px) {
  .minW1920 {
    width: 1920px;
  }
  /* .banner  {
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
  } */

}
</style>
