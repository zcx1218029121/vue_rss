<template>
  <main role="main">
    <div>

      <b-modal id="modal-1"
               title="你完成了阅读！">
        <p class="my-4">恭喜你，完成第一篇阅读,完成的阅读将不再显示在订阅里</p>
      </b-modal>
    </div>

    <!-- loading 组件-->
    <loading :isShow="true"
             ref="loading">
    </loading>
    <!-- item 开始-->
    <article v-for="(item, index) in data"
             :key="index"
             @click="showDetail(item)"
             class="card-40 social">
      <!-- start figure-->
      <figure>
        <a href="javascript:;">
          <img onerror="this.src='https://hbimg.huabanimg.com/344c7e6763ac3ac6a516a0e96c9acf1315b0c8702a6c5-rwyZan_fw658'"
               referrer="no-referrer|origin|unsafe-url"
               v-bind:src="getimg(index)">
        </a>
      </figure>
      <!-- end figure-->
      <div class="flex-content">
        <header>
          <p class="user">
            <a class="button"
               style="background: rgb(100, 197, 100);"
               href="javascript:;"
               title="Share"
               @click.stop="unsubscribe(index)">
              已关注
            </a>
            <img class="avatar-32"
                 v-bind:src="item.source_icon"
                 alt="Avatar">
            <strong>
              <a title="Full Name">
                {{item.source_name}}
              </a>
            </strong>
            <span style="text-overflow:ellipsis; max-lines: 1"> <a  href="javascript:;"
                 title="258 comments">{{item.time}}</a></span>
          </p>
        </header>
        <a a
           href="javascript:;">
          <!-- 长英文字符串强制换行-->
          <h2 style="word-wrap:break-word;word-break:break-all;">
            {{item.title}}
          </h2>

        </a>
      </div>
      <!-- end .flex-content-->
    </article>

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
                 v-html="curItem.content">
              </p>
              <footer>
                <p>
                  <a class="bt-love"
                     title="Love"
                     href="javascript:;"
                     @click="isRead(curItem)">
                    完成
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
    <!--empty tips -->
    <div class="no_ssr"
         v-if="this.data.length===0">
      <img src="../../../static/drawable/noSSR.png">
      <h2>完成了阅读。刷新看看有没有新内容</h2>
    </div>
    <!--empty tips end-->
    <!--loading more button -->
    <a class="face-button"
       href="javascript:;"
       @click="scroll()"
       ref="loadmore">

      <div class="face-primary">
        <div v-if="!isend">查看更多</div>
        <div v-else>休息一下吧！</div>
      </div>
      <div class="face-secondary">
        <div v-if="!isend"> 再看5条</div>
        <div v-else>没有更多了</div>
      </div>
    </a>
    <!--loading more button end-->

  </main>

</template>

<script>
import { doGetWithToken, rootNet } from '../../common/api'
import loading from '../loading'
import axios from 'axios'
import tool from '../../common/tool'
export default {
  components: {
    loading
  },
  data () {
    return {
      readList: [],
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
      var des = this.data[index].content
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
      var flag = confirm('是否取消订阅')
      var params = new URLSearchParams()
      let sid = vm.data[index].sourceId
      params.append('sid', sid)
      if (flag) {
        axios({
          method: 'POST',
          url: rootNet + `source/unsubscribe`,
          data: params,
          headers: {
            token: localStorage.getItem('token')
          }
        }).then(function (res) {
          if (res.data.code === 200) {
            vm.$router.rm.push(vm.data[index].sourceId)
            alert('取消关注成功')
            for (var i = 0; i < vm.data.length;) {
              if (vm.data[i].sourceId === sid) {
                var s = vm.data.indexOf(vm.data[i])
                vm.data.splice(s, 1)
              } else {
                i++
              }
            }
            // 删除结束后 当数据为空的时候手动调用一次分页查询
            vm.isLoading = true
            if (vm.data.length === 0) {
              vm.isLoading = true
              vm.scroll()
            }

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
    isRead: function (item) {
      doGetWithToken('rss/read', { i_id: item.u_id }).then((r) => {
        if (r.data.code === 200) {
          if (!localStorage.getItem('finsh1')) {
            this.$bvModal.show('modal-1')
            localStorage.setItem('finsh1', true)
          }
          this.data.splice(this.data.indexOf(item), 1)
        }
      })
    },
    getData: function () {
      var r = this.$router
      this.isLoading = true
      this.$refs.loading.togger(this.isLoading)

      this.doGet(this.p++).then((response) => {
        this.data = response.data.items
        console.log(this.data)
        this.$refs.loading.togger(false)
        if (this.data.length > 0) {
          this.isend = false
        }
      }
      ).catch(function (error) {
        r.push({ path: '/' })
        console.log(error.response)
      })
    },
    doGet: function (pager) {
      let params = { p: pager }

      return doGetWithToken('item', params)
      // 生命周期 当加载的时候————
    },
    scroll () {
      this.p = this.p + 1
      var vm = this

      if (vm.isend === false) {
        this.isLoading = true
        this.doGet(vm.p).then((response) => {
          this.isLoading = false
          for (let i = 0; i < response.data.items.length; i++) {
            vm.data.push(response.data.items[i])
          }
          if (response.data.items.length <= 0) {
            vm.isend = true
          }
          this.disabled = true
        })
      }
    },
    scrollBottom () {
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      let winHeight = document.documentElement.clientHeight || document.body.clientHeight
      let bodyScrollHeight = 0
      let documentScrollHeight = 0
      if (document.body) {
        bodyScrollHeight = document.body.scrollHeight
      }
      if (document.documentElement) {
        documentScrollHeight = document.documentElement.scrollHeight
      }
      let scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight
      if (scrollTop >= parseInt(scrollHeight) - winHeight) { // 如果滚动到接近底部，自动加载下一页
        this.scroll()
      }
    }

  },
  mounted () {
    this.$router.rm = []
    this.p = 0
    this.getData()
    window.addEventListener('scroll', this.scrollBottom)
  },
  activated () {
    if (this.$router.sr) {
      this.data = {}
      this.p = 0
      this.getData()
      this.$router.sr = false
    }
  },
  beforeDestroy () {
    console.log('a')
  }
}
</script>
<style >
.no_ssr {
  padding: 30px;
  display: block;
}
.no_ssr h2 {
  font-size: 20px;
  font-weight: 200;
}
</style>
