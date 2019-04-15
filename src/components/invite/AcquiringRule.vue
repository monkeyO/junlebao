<template>
  <div id="acquiring_rule">
    <!-- 好卖符教您如何日赚1000金币 -->
    <div class="get_gold">
      <div class="get_gold_box">
        <div class="title">好卖符教您如何日赚1000金币</div>
        <div class="content">
          <div class="inner_box">
            <div class="left text-left">
              <p class="color-433f36">邀请好友注册使用好卖符，徒弟每放1单下单任务，推荐人可获得0.5金币/单的奖励</p>
              <p class="color-433f36">如推荐人邀请徒弟10人，徒弟每日发布下单任务数为2000单，则推荐人每日可抽取1000金币</p>
              <p class="color-b65b53" style="margin-top: 20px;">(假设推荐人每放1单需要10金币，则1000金币可以免费放100单下单任务)</p>
              <p data-v-0e215928="" class="color-b65b53" style="">注：该活动只针对徒弟发布的货返下单任务方可有效计算，立返任务不计算在内</p>
            </div>
            <div class="right"></div>
          </div>
        </div>
      </div>
    </div>
    <!-- 邀请奖励 -->
    <div class="invite_award">
      <ul>
        <li style="font-weight: bold;">
          <div>好友充值金币</div>
          <div>推荐人获得金币</div>
        </li>
        <li v-for="(item, index) in getMsg" :key="index">
          <div>{{item.goldnum}}</div>
          <div>{{item.tofriendgoldcoins}}</div>
        </li>
      </ul>
    </div>
    <!-- 选择我们的八大优势 -->
    <div class="choose_us">
      <div class="choose_us_box">
        <div class="title">选择我们的八大优势</div>
        <div class="content">
          <div class="contrast"></div>
          <ul class="both_ul">
            <li>
              <div class="left">佣金仅需8元起</div>
              <div class="right">佣金11元起 佣金贵</div>
            </li>
            <li>
              <div class="left">手续费低至2元/单</div>
              <div class="right">商品金额的0.6%-1% 手续费高</div>
            </li>
            <li>
              <div class="left">无退款保证金 资金无风险</div>
              <div class="right">商品金额的5%-10% 资金风险大</div>
            </li>
            <li>
              <div class="left">充值会员最高返2100金币</div>
              <div class="right">会员费高 无金币返利</div>
            </li>
            <li>
              <div class="left">XX工具箱和大数据筛查买号和买手</div>
              <div class="right">买手入门门槛低 买号不安全</div>
            </li>
            <li>
              <div class="left">支持淘宝 天猫 京东 拼多多 阿里巴巴5大平台</div>
              <div class="right">只支持淘宝 天猫平台</div>
            </li>
            <li>
              <div class="left">买手均要身份证实名认证</div>
              <div class="right">无身份证认证要求</div>
            </li>
            <li>
              <div class="left">专属运营MM维护 售后无忧</div>
              <div class="right">售前售后态度不一 售后找不到人处理</div>
            </li>
          </ul>
          <ul class="middle_ul">
            <li>佣金费用</li>
            <li>手续费费用</li>
            <li>资金风险</li>
            <li>充值返利</li>
            <li>买号安全</li>
            <li>支持平台</li>
            <li>买手实名</li>
            <li>运营售后</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AcquiringRule',
  computed: {
    //获取数据
    getMsg () {
      return this.$attrs.meal
    }
  }
}
</script>

<style scoped>
@import '../../assets/css/invite/acquiringrule.css';
</style>
