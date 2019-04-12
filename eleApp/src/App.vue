<template>
  <div>
    <ele-header :seller="seller"></ele-header>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/goods"
                     active-class="active">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings"
                     active-class="active">评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller"
                     active-class="active">商家</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view :seller="seller"
                   active-class="active"></router-view>
    </keep-alive>
  </div>
</template>
<script>

import header from './components/header/header'
import axios from 'axios'

export default {
  name: 'App',
  data () {
    return {
      seller: {}
    }
  },
  components: {
    'ele-header': header
  },
  created () {
    // 生命周期 当加载的时候————
    axios.get('/api2/seller').then((response) => {
      const result = response.data
      console.log(result.data)
      if (result.code === 0) {
        this.seller = result.data
      }
    }
    )
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import './common/stylus/mixins.styl';

// css import
.tab {
  height: 40px;
  line-height: 40px;
  display: flex;
  border-1px(rgba(7, 17, 27, 0.1));

  .tab-item {
    flex: 1;
    font-size: 14px;
    color: rgb(77, 85, 93);
    text-align: center;

    .active {
      color: red;
    }
  }
}
</style>
