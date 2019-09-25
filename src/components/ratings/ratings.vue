<template>
  <main role="main">
    <loading :isShow="true"
             ref="loading">
    </loading>
    <div>
      <b-list-group>
        <b-list-group-item style=" display: flex;justify-content:space-between" v-for="(item, index) in this.source" :key="index"
                           @click="detail(item)"
        > <b-img left
                                   v-bind:src="item.source_icon"
                                   alt="Left image"
                                   class="icon_source "
        ></b-img>{{item.source_name}}<b-button @click.stop="unsubscribe(index)" variant="success"
                                               style="right: 2px;">
                                <div v-if="isSubscribe(item)">关注</div>
          <div v-else>
            取消
          </div>
          </b-button></b-list-group-item>
      </b-list-group>
    </div>

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
  </main>
</template>

<script>
import { rootNet } from '../../common/api'
import loading from '../loading'
import axios from 'axios'
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
    unsubscribe: function (index) {
      var vm = this
      // 取消订阅
      if (this.isSubscribe(vm.source[index])) {
        var params = new URLSearchParams()
        console.log(vm.source[index])
        params.append('sid', vm.source[index].sid)
        axios({
          method: 'POST',
          url: rootNet + `add_subscribe`,
          data: params,
          headers: {
            token: localStorage.getItem('token')
          }
        }).then(function (res) {
          if (res.data.code === 200) {
            vm.data.push(vm.source[index].sid)
            vm.$bus.$emit('change')
          } else {
            alert('关注失败')
          }
        })
      } else {
        let params = new URLSearchParams()
        console.log(vm.source[index].sid)
        params.append('sid', vm.source[index].sid)
        axios({
          method: 'POST',
          url: rootNet + `del_subscribe`,
          data: params,
          headers: {
            token: localStorage.getItem('token')
          }
        }).then(function (res) {
          if (res.data.code === 200) {
            vm.$bus.$emit('change')
            var s = vm.data.indexOf(vm.source[index].sid)
            vm.data.splice(s, 1)
          } else {
            alert('取消关注失败')
          }
        })
      }
    },
    doNoting: function () {
      // 什么都不干就是为了拦截事件冒泡
    },
    detail: function (source) {
      this.$router.push({path: '/source',
        query: {source: source,
          isSubscribe: this.isSubscribe(source)
        }})
    },
    doLove: function () {
      alert('功能还在开发')
    },
    getData: function () {
      this.doGet(this.p++).then((response) => {
        this.source = response.data.source
        this.data = response.data.subscribeSource
        this.$refs.loading.togger(false)
      }
      )
    },
    doGet: function (pager) {
      // 生命周期 当加载的时候————
      return axios.get(rootNet + 'find', { headers: { token: localStorage.getItem('token') },
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
          for (var i = 0; i < response.data.source.length; i++) {
            vm.data.push(response.data.source[i])
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
      return function (item) {
        return this.data.indexOf(item.sid) === -1
      }
    }
    // return this.source.indexOf(this.data[0].sourceId) === -1
  },
  activated () {
    this.$bus.$on('change', () => {
      this.p = 0
      this.getData()
    })
  },
  mounted () {
    this.p = 0
    this.getData()
  }
}
</script>
<style >
  .icon_source{
    height: 32px;
    width: 32px;
  }
</style>
