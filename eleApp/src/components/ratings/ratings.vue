<template>
  <div class="star"
       :class="'star-'+size">
    <span class="star-item"
          v-for="(item, index) in starClasses"
          :class="item"
          :key="index"></span>
  </div>
</template>

<script>
export default {}
</script>

<style lang="stylus" rel="stylesheet/stylus">
</style>
