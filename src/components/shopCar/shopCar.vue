<template>
  <div class="shopcart">
    <div class="content">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo"
               :class="{highlight: foodList.length}">
            <i class="icon-shopping_cart highlight"></i>
          </div>
          <div class="num"
               v-if="totalCount">{{totalCount}}</div>
        </div>
        <div>
          <div class="price">￥{{totalPrice}}</div>
          <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
        </div>
      </div>
    </div>
    <div class="content-right">
    </div>
  </div>

</template>

<script>
export default {
}
</script>

<style lang="stylus">
@import '../../common/stylus/mixins.styl';
</style>
