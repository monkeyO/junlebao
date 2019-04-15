<template>
  <div class="reg">
    <Header></Header>
    <div class='box clearfix'>
      <!-- <img src="@/assets/img/login/reg_bg.jpg" alt="" id='bg' width="100%" height="100%"> -->
      <img src="@/assets/img/login/reg_bg.jpg" alt="" id='bg' width="100%">
      <RegMain></RegMain>
    </div>
  </div>
</template>

<script>
import Header from '@/components/public/Header'
import RegMain from './RegMain'

export default {
  name: 'Reg',
  components: {
    Header,
    RegMain
  }
}
</script>

<style scoped>
#bg{
  position: absolute;
  z-index: -1;
}
/* 媒体查询*/
@media screen and (max-width: 1200px){
  .box{
    width: 1200px;
  }
  #bg{
    width: 1200px;
  }
}
</style>
