<template>
  <div>
    <div class="containers">
      <!-- 效果一 -->
      <div class="bd_index one">
        <div class="neirong">
          <strong>
            <h1>link everything</h1>
          </strong>
          <p>用RSS连接全世界</p>
        </div>
      </div>
    </div>
    <div class="searchBar"
         id="searchBar">
      <div class="tab"
           :class="searchBarFixed == true ? 'isFixed' :''">

        <div class="tab-item">

          <router-link to="/main/goods"
                       active-class="active"> <span class="iconfont icon-remen"></span>我的订阅</router-link>
        </div>
        <div class="tab-item">
          <router-link to="/main/ratings"
                       active-class="active"><span class="iconfont icon-faxian"></span>发现</router-link>
        </div>
        <div class="tab-item">
          <router-link to="/main/seller"
                       active-class="active"><span class="iconfont icon-guanli"></span>管理源</router-link>
        </div>
      </div>
    </div>
    <keep-alive>
      <router-view active-class="active"></router-view>
    </keep-alive>
  </div>
</template>
<script>

export default {
  data () {
    return {
      searchBarFixed: true
    }
  },
  name: 'App',
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll () {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      let offsetTop = document.querySelector('#searchBar').offsetTop
      this.searchBarFixed = scrollTop > (offsetTop)
    },
    toggle (tabIndex) {
      this.whichTab = tabIndex
      window.location.href = '#searchBar' // 锚点
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus"  >
@import url('../../common/stylus/main.css');
@import url('../../common/stylus/iconfont.css');

*, *:before, *:after {
  box-sizing: inherit;
}

body {
  background: #fafafa;
  color: #333;
  /* Sometimes fonts don't display optimally on all devices */
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
  /* font-weight:300; */
}

a, .user {
  text-decoration: none;
  color: #88d;
}

a:hover {
  color: rgb(100, 197, 100);
}

a.button {
  display: inline-block;
  text-align: center;
  padding: 14px 24px;
  font-weight: 600;
  cursor: pointer;
  line-height: 1;
  background: #88d;
}

p, li, time {
  font-size: 1.6rem;
  line-height: 3.2rem;
  margin: 0 0 2.4rem;
}

#searchBar {
  .isFixed {
    width: 100%;
    position: fixed;
    background-color: #fff;
    top: 0px; // 44px是导航标题头的高度
    z-index: 965;
    padding: 0px;
    box-shadow: 1px 0.5px 1px 0.5px #555;
  }
}

.tab {
  margin-bottom: 10px;
  line-height: 50px;
  display: flex;
  border-1px(rgba(7, 17, 27, 0.1));
  background: hsla(0, 0, 100%, 0.16);

  .tab-item {
    margin-top: 10px;
    flex: 1;
    font-size: 14px;
    color: rgb(77, 85, 93);
    text-align: center;

    span {
      display: block;
    }

    .active {
      color: red;
    }
  }
}

.containers {
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 1;
}

.bd_index {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 500px;
  background: url('../../../static/drawable/zg.jpg') no-repeat center center; // hbimg.huabanimg.com/344c7e6763ac3ac6a516a0e96c9acf1315b0c8702a6c5-rwyZan_fw658) no-repeat center center;
  background-size: cover;
  background-attachment: fixed;
}

.neirong {
  position: relative;
  top: 90%;
  margin: 0 auto;
  font-size: 22px;
  color: #fff;
  box-sizing: border-box;
  padding-left: 40px;
}

@media screen and (max-width: 960px) {
  .bd_index {
    width: 100%;
    height: 20%;
  }
}
</style>
