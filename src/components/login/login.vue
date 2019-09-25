<template>
  <div class="act-form">
    <iframe :src="src" ref="iframe"></iframe>
  </div>
</template>
<script>
export default {
  data () {
    return {
      src: 'https://m.bilibili.com/video/av68720838.html'
    }
  },
  methods: {
  }
}
</script>

<style scoped>

</style>
