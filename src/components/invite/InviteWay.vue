<template>
  <div id="invite_way">
    <!-- 邀请方式 -->
    <div class="invite_way">
      <!-- 邀请方式一 -->
      <div class="invite_way_box">
        <div class="title">邀请方式一：复制您的专属链接，发给您的QQ、微信好友</div>
        <div class="content">
          <div class="invite_way_first">
            <div class="left">
              <p class="color-433f36">好友通过您的邀请注册商家并成功开通VIP商家即可获得邀请奖励</p>
              <p v-text="getMsg[0]" class="color-b65b53"></p>
            </div>
            <div class="right">
              <button class="copy_btn" v-clipboard:copy="getMsg[0]" v-clipboard:success="onCopy" v-clipboard:error="onError">一键复制</button>
            </div>
          </div>
        </div>
      </div>
      <!-- 邀请方式二 -->
      <div class="invite_way_box">
        <div class="title">邀请方式二：保存分享二维码</div>
        <div class="content">
          <div class="invite_way_second">
            <div class="left">
              <img src="@/assets/img/invite/invite_icon.png" alt="">
            </div>
            <div class="middle">
              <p class="color-b65b53" style="font-size: 22px; line-height: 22px;">分享到朋友圈、微博、QQ空间</p>
              <p class="color-433f36">扫描您的二维码注册并加入好卖符会员，也可获得邀请奖励</p>
            </div>
            <div class="right">
              <img :src="getMsg[1]" alt="">
            </div>
          </div>
        </div>
      </div>
      <!-- 邀请方式三 -->
      <div class="invite_way_box">
        <div class="title">邀请方式三：分享专属邀请码</div>
        <div class="content">
          <div class="invite_way_third">
            <div class="left">
              <div class="left_outer_box">
                <div class="left_inner_box">
                  <p>{{getMsg[2]}}</p>
                </div>
              </div>
            </div>
            <div class="middle">
              <p class="color-b65b53" style="font-size: 22px; line-height: 22px;">复制专属邀请码，发给您的QQ、微信好友</p>
              <p class="color-433f36">好友注册时填写了您的邀请码，并成功入驻VIP商家亦可获得邀请奖励</p>
            </div>
            <div class="right">
              <button class="copy_btn" v-clipboard:copy="getMsg[2]" v-clipboard:success="onCopy" v-clipboard:error="onError">一键复制</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Message } from 'element-ui'

export default {
  name: 'InviteWay',
  computed: {
    //获取数据
    getMsg () {
      return this.$attrs.inviteway
    }
  },
  methods: {
    onCopy: function (e) {
      Message({
        message: `复制成功`,
        duration: 1500,
        type: 'success'
      })
    },
    onError: function (e) {
      Message({
        message: `复制失败,请手动复制`,
        duration: 1500,
        type: 'error'
      })
    }
  }
}
</script>

<style scoped>
@import '../../assets/css/invite/inviteway.css';
</style>
