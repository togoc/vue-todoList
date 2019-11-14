<template>
  <div id="app">
    <router-view />
  </div>
</template>







<script>

export default {
  comments:{

  },
  created() {
    this.$router.push("/")
  },
}

</script>


<style scoped>


</style>
