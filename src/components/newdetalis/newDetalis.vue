<!--- 详情页组件!-->
<template>
  <!-- Hover Demo-->
  <div class="warrp">  <div class="act-form" v-if="isShow">
    <iframe :src="item.link"   ref="iframe"></iframe>
  </div>
  <div class="column">

    <!-- Post-->
    <div class="post-module hover">
      <!-- Thumbnail-->
      <div class="thumbnail">
        <div class="date">
          <div class="day">{{getMon()}}</div>
        </div>
        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/169963/photo-1429043794791-eb8f26f44081.jpeg"/>
      </div>
      <!-- Post Content-->
      <div class="post-content">
        <div class="category">Photos</div>
        <h1 class="title">{{item.title}}</h1>
        <h2 class="sub_title">{{item.source_name}}</h2>
        <p class="description" v-html="item.content"></p>
        <div class="post-meta"><a @click="showurl">查看原文</a></div>
      </div>
    </div>
  </div>
  </div>
</template>
<script>
export default {
  name: 'detail',
  data () {
    return {
      isShow: false,
      data: {},
      item: {}
    }
  },
  activated () {
    this.item = this.$route.query.item
    this.isShow = false
  },
  methods: {
    showurl: function () {
      this.isShow = !this.isShow
    },
    getMon: function () {
      return this.item.time.split(',')[0]
    }
  }
}
</script>
<style lang="stylus" scoped>
  html, body {
    height: 100%;
  }

  body {
    background: #f2f2f2;
    font-family: 'proxima-nova-soft', sans-serif;
    font-size: 14px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

  }

  .column {
    position fixed;
    width 100%;
    height 100%;
    overflow scroll;
  }

  .post-module {
    overflow scroll;
    z-index: 1;
    display: block;
    background: #FFFFFF;
    min-width: 270px;
    height: 100%;

  }

  .post-module:hover,
  .post-module:hover .thumbnail img,
  .post-module .thumbnail {
    background: #000000;
    height: 400px;
    overflow: hidden;
  }

  .post-module .thumbnail .date {
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 1;
    background: #e74c3c;
    width: 55px;
    height: 55px;
    padding: 12.5px 0;
    -webkit-border-radius: 100%;
    -moz-border-radius: 100%;
    border-radius: 100%;
    color: #FFFFFF;
    font-weight: 700;
    text-align: center;
    -webkti-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  .post-module .thumbnail .date .day {
    font-size: 18px;
  }

  .post-module .thumbnail .date .month {
    font-size: 12px;
    text-transform: uppercase;
  }

  .post-module .thumbnail img {
    display: block;
    width: 120%;
  }

  .post-module .post-content {
    top: 200px;
    position: absolute;
    bottom: 0;
    background: #FFFFFF;
    width: 100%;

    padding: 30px;
    -webkti-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  .post-module .post-content .category {
    position: absolute;
    top: -34px;
    left: 0;
    background: #e74c3c;
    padding: 10px 15px;
    color: #FFFFFF;
    font-size: 14px;
    font-weight: 600;
  }

  .post-module .post-content .title {
    margin: 0;
    padding: 0 0 10px;
    color: #333333;
    font-size: 26px;
    font-weight: 700;
  }

  .post-module .post-content .sub_title {
    margin: 0;
    padding: 0 0 20px;
    color: #e74c3c;
    font-size: 20px;
    font-weight: 400;
  }

  .post-module .post-content .description {
    display: none;
    color: #666666;
    font-size: 14px;
    line-height: 1.8em;
  }

  .post-module .post-content .post-meta {
    margin: 30px 0 0;
    color: #999999;
  }

  .post-module .post-content .post-meta .timestamp {
    margin: 0 16px 0 0;
  }

  .post-module .post-content .post-meta a {
    color: #999999;
    text-decoration: none;
  }

  .hover .post-content .description {
    display: block !important;
    height: auto !important;
    opacity: 1 !important;
  }

  .container {
    max-width: 800px;
    min-width: 640px;
    margin: 0 auto;
  }

  .container:before,
  .container:after {
    content: '';
    display: block;
    clear: both;
  }

  .container .column {
    width: 50%;
    padding: 0 25px;
    -webkti-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    float: left;
  }

  .container .column .demo-title {
    margin: 0 0 15px;
    color: #666666;
    font-size: 18px;
    font-weight: bold;
    text-transform: uppercase;
  }

  .container .info {
    width: 300px;
    margin: 50px auto;
    text-align: center;
  }

  .container .info h1 {
    margin: 0 0 15px;
    padding: 0;
    font-size: 24px;
    font-weight: bold;
    color: #333333;
  }

  .container .info span {
    color: #666666;
    font-size: 12px;
  }

  .container .info span a {
    color: #000000;
    text-decoration: none;
  }

  .container .info span .fa {
    color: #e74c3c;
  }
  .act-form{
    background white
    height:100%;
    width:100%;
    /*width: 100%;*/
    position:
  fixed;
    z-index 999
  }
  .act-form iframe{
    height:100%;
    width:100%;
  }
</style>
