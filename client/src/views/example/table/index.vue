<template>
  <transition name="fade" mode="out-in">
    <keep-alive :include='cachePage'>
      <router-view></router-view>
    </keep-alive>
  </transition>
</template>

<script>
export default {
  name: 'TableMain',
  computed: {
    cachePage() {
      return this.$store.state.app.cachePage
    }
  }
}
</script>