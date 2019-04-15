<template>
  <div id="app">
    <!-- <keep-alive>
    <router-view v-if="$route.meta.keepAlive">
    </router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive">
    </router-view> -->
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style>
@import './assets/common.css';
@import './assets/main.css';
@import './assets/normalize.css';
</style>
