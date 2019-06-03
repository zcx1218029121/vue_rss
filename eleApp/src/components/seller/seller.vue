<template>
  <div>

    <div class="header">
      <div class="left_image">
        <b-img thumbnail
               class="icon"
               rounded="circle"
               fluid
               src="https://picsum.photos/250/250/?image=54"
               alt="Image 1"></b-img>
      </div>
      <div class="content">
        <div class="title">
          <h2>{{username}}</h2>
        </div>

      </div>
    </div>
    <b-list-group>
      <b-list-group-item button
                         v-b-toggle.collapse-1
                         class="item">手动添加源</b-list-group-item>
      <b-collapse id="collapse-1"
                  class="mt-2">

        <b-alert variant="success"
                 show
                 class="item">更多请前往rsshub</b-alert>

        <b-input-group prepend="网站"
                       class="mb-2 mr-sm-2 mb-sm-0"
                       style="padding: 10px; heigth:2rem">
          <b-form-select v-model="selected"
                         :options="ca1"></b-form-select>
        </b-input-group>

        <b-input-group prepend="类别"
                       class="mb-2 mr-sm-2 mb-sm-0"
                       style="  padding: 10px;">
          <b-form-select v-model="selectedsub"
                         :options="getCa2"></b-form-select>
        </b-input-group>
        <label class="sr-only"
               for="inline-form-input-username">Username</label>
        <b-input-group prepend="参数"
                       v-show="haveParms"
                       class="mb-2 mr-sm-2 mb-sm-0"
                       style="  padding: 10px;">
          <b-input id="inline-form-input-username"
                   placeholder="参数"></b-input>
        </b-input-group>
        <b-input-group prepend="源名字"
                       class="mb-2 mr-sm-2 mb-sm-0"
                       style="  padding: 10px;">
          <b-input id="inline-form-input-username"
                   required
                   placeholder="源的名字"></b-input>
        </b-input-group>
        <!--
          <b-form-file v-model="file"
                       :state="Boolean(file)"
                       placeholder="上传源图片"
                       drop-placeholder="可以为空"></b-form-file>-->
        <b-button type="submit"
                  class="button"
                  variant="primary"
                  @click="dopost()">提交</b-button>

      </b-collapse>
      <b-list-group-item button
                         class="item"
                         v-b-toggle.collapse-2>管理订阅源</b-list-group-item>
      <b-collapse id="collapse-2"
                  class="mt-2">

        <!--标题栏-->
        <div>
          <b-media class="s_media"
                   v-for="(item, index) in scource"
                   :key="index">
            <b-img left
                   src="http://www.qdaily.com/favicon.ico"
                   alt="Left image"
                   class="icon_source "></b-img>
            <div class="content">
              <h5 class="title">{{item.name}} </h5>
              <div class="button">
                <b-button variant="success"
                          @click='unsubscribe(index)'>取消</b-button>
              </div>
            </div>
          </b-media>

        </div>
      </b-collapse>
      <b-list-group-item button
                         disabled>收藏</b-list-group-item>
    </b-list-group>

  </div>
</template>

<script>

import axios from 'axios'
import json from '../seller/routes.json'
import { doGetWithToken, rootNet } from '../../common/api'
export default {
  data () {
    return {
      username: '',
      scource: [],
      hp: false,
      data: json,
      selected: {},
      selectedsub: '',
      ca1: []
    }
  },
  methods: {
    dopost: function () {
      alert('添加的源经过管理员审核后,将出现在您的订阅中')
    },
    unsubscribe: function (index) {
      var vm = this
      var params = new URLSearchParams()
      params.append('sid', this.scource[index].sid)
      axios({
        method: 'POST',
        url: rootNet + `source/unsubscribe`,
        data: params,
        headers: {
          token: localStorage.getItem('token')
        }
      }).then(function (res) {
        if (res.data.code === 200) {
          vm.$router.rm.push(vm.scource[index].sid)
          vm.$router.sr = true
          vm.scource.splice(index, 1)
        } else {
          alert('取消关注失败')
        }
      })
    }
  },
  mounted () {
    this.$router.rm = []
    // 获取所有路由分
    this.username = localStorage.getItem('username')
    for (var x in json.data) {
      this.ca1.push(x)
    }
  },
  computed: {
    getCa2: function () {
      if (json.data[this.selected]) {
        console.log(json.data[this.selected])
        return json.data[this.selected].routes
      } else {
        return ['我是空的']
      }
    },
    haveParms: function () {
      return this.selectedsub.match(':')
    }

  },
  activated () {
    doGetWithToken('source', null).then((r) => {
      this.scource = r.data.source
      console.log(r.data)
    })
  }
}
</script>
<style scoped>
.icon {
  width: 80px;
  height: 80px;
  margin: 10px;
}
.header {
  padding: 10px;
  display: flex;
}
.header .content {
  padding: 10px;
  height: 100%;
  max-width: 70%;
  flex: 1;
  overflow: hidden;
  text-align: center;
}
.title {
  display: block;
  align-content: center;
  padding: 10px;
}
.item {
  font-size: 1.5rem;
}
.icon_source {
  width: 30px;
  height: 30px;
  margin: 5px;
}
.content h5 {
  display: inline-block;
}
.content button {
  text-align: center;
}
.s_media {
  background: white;
  margin: 2px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
}
.button {
  margin: 5px;
  float: right;
  display: block;
}
</style>
