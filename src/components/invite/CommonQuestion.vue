<template>
  <div id="common_question">
    <!-- 常见问题 -->
    <div class="common_question">
      <!-- 文字说明盒子 -->
      <div class="common_question_box">
        <h1>常见问题</h1>
        <ul>
          <li>
            <p>问：我邀请好友成功购买金币后，奖励如何发放给我？</p>
            <p>答：根据活动规则，邀请商家获得的奖励将以金币的方式发放到您的商家账户中；如您的奖励超过2小时未到账，请联系在线客服QQ：800833972协助处理。</p>
          </li>
          <li>
            <p>问：我邀请的好友，是不是每次充值金币，我都可以获得对应的奖励呢？</p>
            <p>答：不是的哦，邀请的好友只有首次充值金币才能获得对应的奖励。</p>
          </li>
          <li>
            <p>问：我获得的金币奖励是否支持提现？</p>
            <p>答：不支持的哦，金币可在发布任务的时候使用，也是同样可以为您省去不少推广成本的。</p>
          </li>
          <li>
            <p>问：如果我邀请的好友注册账号但未绑定店铺，我能否可以获得邀请注册的10金币奖励？</p>
            <p>答：不会的哦，为了防止作弊行为，只有您邀请的好友注册并绑定店铺，您才会获得10金币奖励。</p>
          </li>
          <li>
            <p>问：我忘记使用邀请链接了，但她确实是我邀请加入你们的，怎么办？</p>
            <p>答：如有特殊原因，请联系在线客服QQ：8888888核实处理，核实属实也是同样可以享受邀请奖励的。</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommonQuestion'
}
</script>

<style scoped>
/* 常见问题样式 */
.common_question {
  margin-top: 63px;
  padding-bottom: 200px;
}
/* 文字说明盒子 */
.common_question_box {
  width: 57%;
  margin: 0 auto;
}
/* 标题样式 */
.common_question_box h1{
  font-size: 32px;
  font-weight: normal;
  letter-spacing: 2px;
  color: #333;
}
/* 列表项样式 */
.common_question_box li  {
  margin: 20px auto;
}
/* 段落样式 */
.common_question_box p {
  font-size: 24px;
  color: #666666;
}
</style>
