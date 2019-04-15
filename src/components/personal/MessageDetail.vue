<template>
  <div id="account_manage">
    <!-- 账户管理 -->
    <div class="account_manage">
      <!-- 标题 -->
      <div class="account_manage_title">
        <h3>网站公告</h3>
        <div class='account_manage_span'>
          <span>
            {{data.title}}
          </span>
          <span class='modifydate pull-right'>
            {{data.modifydate}}
          </span>
        </div>
      </div>

      <!-- 内容盒子 -->
      <div class="account_manage_box">
        <div v-html="data.content">
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'MessageDetail',
  data () {
    return {
      data:{}
    }
  },
  async mounted () {
    let aid = this.$route.query.id
    console.log(aid)
    //获取数据
    let data = await this.ajax({
      url: `SellerCenterInterface/questions?tk=${sessionStorage.token}`,
      data:{aid},
      needAlert: false
    })
    //待处理ajax数据
    if(!data) return false
    this.data = data.data
  },
  methods: {
  }
}
</script>

<style scoped>
/* 账户管理盒子样式 */
.account_manage {
  /*height: 818px;*/
  background: #fff;
}
/* 标题样式 */
.account_manage_title {
  padding: 30px;
  height: 30px;
}
.account_manage_title h3 {
  line-height: 30px;
  padding-left: 20px;
  border-left: 4px solid #fe474c;
  font-weight: normal;
  font-size: 25px;
}
.account_manage_title .account_manage_span{
    margin: 20px 0;
    font-size: 16px;
}
.modifydate{
  color: #999
}
/* 内容盒子样式 */
.account_manage_box {
  min-height: 530px;
  padding: 30px;
  padding-bottom: 178px;
  padding-top: 58px;
}
</style>
