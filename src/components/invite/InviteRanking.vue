<template>
    <div id="invite_ranking">
      <!-- 邀请排行榜 -->
      <div class="invite_ranking">
        <div class="invite_ranking_box">
          <ul class="invite_ranking_ul">
            <li class="invite_ranking_title">
              <div>排名</div>
              <div>用户名</div>
              <div>获得金币</div>
            </li>
            <li v-for="(item, index) in getMsg" :key="index">
              <div>{{index+1}}</div>
              <div>{{item.createphone|phoneFilter}}</div>
              <div style="color: #b43637;">{{item.gn}}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'InviteRanking',
  computed: {
    //获取数据
    getMsg () {
      return this.$attrs.ranking
    }
  },
  filters: {
    //手机号中间四位隐藏
    phoneFilter (str) {
      return str.replace(/^(\d{3})\d*(\d{4})$/, '$1****$2')
    }
  }
}
</script>

<style scoped>
@import '../../assets/css/invite/inviteranking.css';
</style>
