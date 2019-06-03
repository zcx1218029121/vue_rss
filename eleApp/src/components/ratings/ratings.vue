<template>
  <main role="main">
    <loading :isShow="true"
             ref="loading">
    </loading>
    <article v-for="(item, index) in data"
             :key="index"
             @click="showDetail(item)"
             class="card-40 social">
      <figure>
        <a class="ribbon-buy popular"
           href="javascript:;"
           title="Popular">
          Hot
        </a>
        <a href="javascript:;"><img onerror="this.src='https://hbimg.huabanimg.com/344c7e6763ac3ac6a516a0e96c9acf1315b0c8702a6c5-rwyZan_fw658'"
               referrer="no-referrer|origin|unsafe-url"
               v-bind:src="getimg(index)">
        </a>
      </figure>
      <!-- end figure-->
      <div class="flex-content">
        <header>
          <p class="user">
            <a class="button"
               href="javascript:;"
               title="Share"
               v-bind:style="{'background':isSubscribe(index) ? '#88d':'rgb(100, 197, 100)'}"
               @click.stop="unsubscribe(index)">
              <div v-if="isSubscribe(index)">关注</div>
              <div v-else>
                已关注
              </div>
            </a>
            <img class="avatar-32"
                 src="http://www.qdaily.com/favicon.ico"
                 alt="Avatar">
            <strong>
              <a title="Full Name">
                {{item.source}}
              </a>
            </strong>
            <span><a href="javascript:;"
                 title="Permalink">更新于</a> &middot; <a href="javascript:;"
                 title="258 comments">{{item.date}}</a></span>
          </p>
        </header>
        <a a
           href="javascript:;">
          <h2 style="word-wrap:break-word;word-break:break-all;">
            {{item.title}}
          </h2>

        </a>
      </div>
      <!-- end .flex-content-->
    </article>

    <a class="face-button"
       href="javascript:;"
       @click="scroll()"
       ref="loadmore">

      <div class="face-primary">
        <div v-if="!isend">查看更多</div>
        <div v-else>没有数据！</div>
      </div>
      <div class="face-secondary">
        <div v-if="!isend"> 再看5条</div>

      </div>
    </a>

    <transition name="fade">
      <!--详情页 -->
      <div class="zcxdetail"
           v-show="detailShow"
           @click="detailTogger(false)">
        <div class="detail-wrapper"
             @tochmove.prevent>
          <article class="card-70 social"
                   @click.stop="doNoting()">
            <!-- end figure-->
            <div class="flex-content">
              <h2 style="border-bottom: 1px solid #eee;">{{curItem.title}}</h2>

              <p class="zcxContent"
                 v-html="curItem.des">
              </p>
              <footer>
                <p>
                  <a class="bt-love"
                     title="Love"
                     href="javascript:;"
                     @click="doLove()">
                    Love
                  </a>
                  <a class="bt-comment"
                     target="_blank"
                     title="Comment"
                     v-bind:href="curItem.link">
                    阅读原文
                  </a>
                </p>
              </footer>
            </div>
            <!-- end .flex-content-->
          </article>
        </div>
      </div>
    </transition>
  </main>
</template>

<script>
import { rootNet } from '../../common/api'
import loading from '../loading'
import axios from 'axios'
import tool from '../../common/tool'
export default {
  components: {
    loading
  },
  data () {
    return {
      source: [],
      data: {},
      detailShow: false,
      curItem: {},
      p: 1,
      isend: false,
      isLoading: false
    }
  },
  methods: {
    getimg: function (index) {
      // `this` 指向 vm 实例
      var des = this.data[index].des
      try {
        var img = des.match(/<img.*?(?:>|\/>)/gi)[0].match(/src=[\\'\\"]?([^\\'\\"]*)[\\'\\"]?/i)[1]
      } catch (e) {
        console.log(e)
        return 'https://hbimg.huabanimg.com/344c7e6763ac3ac6a516a0e96c9acf1315b0c8702a6c5-rwyZan_fw658'
      }
      return img
    },
    unsubscribe: function (index) {
      var vm = this
      // 取消订阅
      if (this.isSubscribe(index)) {
        var params = new URLSearchParams()
        params.append('sid', vm.data[index].sourceId)

        axios({
          method: 'POST',
          url: rootNet + `source/subscribe`,
          data: params,
          headers: {
            token: localStorage.getItem('token')
          }
        }).then(function (res) {
          if (res.data.code === 200) {
            vm.source.push(vm.data[index].sourceId)
          } else {
            alert('关注失败')
          }
        })
      } else {
        let params = new URLSearchParams()
        params.append('sid', vm.data[index].sourceId)
        axios({
          method: 'POST',
          url: rootNet + `source/unsubscribe`,
          data: params,
          headers: {
            token: localStorage.getItem('token')
          }
        }).then(function (res) {
          if (res.data.code === 200) {
            var s = vm.source.indexOf(vm.data[index].sourceId)
            vm.source.splice(s, 1)
            vm.$router.sr = true
          } else {
            alert('取消关注失败')
          }
        })
      }
    },
    detailTogger: function () {
      if (this.detailShow) {
        tool.beforeClose()
      } else {
        tool.afterOpen()
      }

      this.detailShow = !this.detailShow
      if (!this.detailShow) {
        this.curItem = {}
      }
    },
    showDetail: function (item) {
      this.detailTogger(true)
      this.curItem = item
    },
    doNoting: function () {
      // 什么都不干就是为了拦截事件冒泡
    },
    doLove: function () {
      alert('功能还在开发')
    },
    getData: function () {
      var r = this.$router
      this.doGet(this.p++).then((response) => {
        this.source = response.data.source
        this.data = response.data.pager.data
        this.$refs.loading.togger(false)
      }
      ).catch(function (error) {
        r.push({ path: '/' })
        console.log(error.response)
      })
    },
    doGet: function (pager) {
      // 生命周期 当加载的时候————
      return axios.get(rootNet + 'rss/find', { headers: { token: localStorage.getItem('token') },
        params: {
          p: pager
        } })
    },
    scroll () {
      this.p = this.p + 1
      var vm = this

      if (this.isLoading === false && vm.isend === false) {
        this.isLoading = true
        this.doGet(vm.p).then((response) => {
          this.isLoading = false
          for (var i = 0; i < response.data.pager.data.length; i++) {
            vm.data.push(response.data.pager.data[i])
          }

          if (response.data.data.length <= 0) {
            vm.isend = true
          }
          this.disabled = true
        })
      }
    }

  },
  computed: {
    isSubscribe: function () {
      return function (index) {
        return this.source.indexOf(this.data[index].sourceId) === -1
      }
    }
    // return this.source.indexOf(this.data[0].sourceId) === -1
  },
  activated () {
    if (this.$router.sr) {
      let data = this.$router.rm
      for (var i = 0; i < data.length; i++) {
        var s = this.source.indexOf(data[i])
        this.source.splice(s, 1)
      }
      this.$router.rm = []
      this.$router.sr = false
    }
  },
  mounted () {
    this.p = 0
    this.getData()
  }
}
</script>
<style >
</style>
