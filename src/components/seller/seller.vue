<template>
  <div>

    <div class="header">
      <div class="left_image">
        <b-img thumbnail
               class="icon"
               rounded="circle"
               fluid
               v-bind:src="user.head_icon"
               alt="Image 1"></b-img>
      </div>
      <div class="content">
        <div class="title">
          <h2>{{user.nickname}}</h2>
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
               >Username</label>
        <b-input-group prepend="参数"
                       v-model="param"
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
                   v-model="s_name"
                   required
                   placeholder="源的名字"></b-input>
        </b-input-group>

        <b-input-group prepend="源的图标"
                       v-model="s_icon"
                       class="mb-2 mr-sm-2 mb-sm-0"
                       style="  padding: 10px;">
          <b-input id="inline-form-input-username"
                   required
                   placeholder="源的图标"></b-input>
        </b-input-group>
        <!--
          <b-form-file v-model="file"
                       :state="Boolean(file)"
                       placeholder="上传源图片"
                       drop-placeholder="可以为空"></b-form-file>-->
        <b-button type="submit"
                  class="button"
                  style="width: 100%"
                  variant="primary"
                  @click="dopost()">提交</b-button>

      </b-collapse>
      <b-list-group-item button
                         class="item"
                         v-b-toggle.collapse-2>添加订阅源</b-list-group-item>
      <b-collapse id="collapse-2"
                  class="mt-2">
        <b-input-group prepend="url"
                       class="mb-2 mr-sm-2 mb-sm-0"
                       style="  padding: 10px;">
          <b-input id="inline-form-input-username"
                   v-model="s_url"
                   required
                   placeholder="源的utl"></b-input>
        </b-input-group>
        <b-input-group prepend="源的图标"
                       class="mb-2 mr-sm-2 mb-sm-0"
                       style="  padding: 10px;">
          <b-input id="inline-form-input-username"
                   v-model="s_icon"
                   required
                   placeholder="源的图标"></b-input>
        </b-input-group>
        <b-input-group prepend="源的名字"
                       class="mb-2 mr-sm-2 mb-sm-0"
                       style="  padding: 10px;">
          <b-input id="inline-form-input-username"
                   v-model="s_name"
                   required
                   placeholder="源的名字"></b-input>
        </b-input-group>
        <b-input-group prepend="range"
                       class="mb-2 mr-sm-2 mb-sm-0"
                       style="  padding: 10px;">
          <b-input id="inline-form-input-username"
                   v-model="range"
                   required
                   placeholder="range"></b-input>
        </b-input-group>
        <b-button type="submit"
                  class="button"
                  style="width: 100%"
                  variant="primary"
                  @click="dopost2()">提交</b-button>
      </b-collapse>
      <b-list-group-item button
                         class="item"
                         v-b-toggle.collapse-3>修改用户信息</b-list-group-item>
      <b-collapse id="collapse-3"
                  class="mt-2">
        <b-input-group prepend="昵称"
                       class="mb-2 mr-sm-2 mb-sm-0"
                       style="  padding: 10px;">
          <b-input id="inline-form-input-username"
                   v-model="nickName"
                   required
                   placeholder="昵称"></b-input>
        </b-input-group>
        <b-input-group prepend="密码"
                       class="mb-2 mr-sm-2 mb-sm-0"
                       style="  padding: 10px;"

        >
          <input id="type-password" type="password" v-model="passWord" class="form-control">

        </b-input-group>
        <b-input-group prepend="头像链接"
                       class="mb-2 mr-sm-2 mb-sm-0"
                       style="  padding: 10px;">
          <b-input id="inline-form-input-username"
                   v-model="u_icon"
                   required
                   placeholder="头像链接"></b-input>
        </b-input-group>
        <b-button type="submit"
                  class="button"
                  style="width: 100%"
                  variant="primary"
                  @click="dopost3()">提交</b-button>
      </b-collapse>
    </b-list-group>

  </div>
</template>

<script>
  import crypto from 'crypto'
import axios from 'axios'
import json from '../seller/routes.json'
import { doGetWithToken, rootNet,doPostWithToken } from '../../common/api'

export default {
  data () {
    return {
      range: 3,
      s_url: '',
      s_icon: '',
      s_name: '',
      username: '',
      nickName: '',
      passWord: '',
      scource: [],
      u_icon: '',
      hp: false,
      data: json,
      selected: {},
      selectedsub: '',
      ca1: [],
      user: {},
      param: ''
    }
  },
  methods: {
    dopost: function () {
      alert('添加的源经过管理员审核后,将出现在您的订阅中')
    },
    dopost2: function () {
      let params = new URLSearchParams()
      params.append('source_name', this.s_name)
      params.append('url', this.s_url)
      params.append('range', this.range)
      params.append('source_icon', this.s_icon)
      doPostWithToken('add_source',params).then((r) => {
        if (r.status === 200) {
          alert('添加成功')
        }
      }).catch((r) => {
        alert('您的权限不足')
      })
      axios.post(rootNet + '/add_source')
    },
    dopost3: function () {
      let params = new URLSearchParams()
      params.append('icon', this.u_icon)
      params.append('password', this.passWord)
      params.append('nickName', this.nickName)
      doPostWithToken('update_user', params).then((r) => {
        if (r.status === 200) {
          alert('修改成功')
          this.getData()
        }
      }).catch((r) => {
        alert('您的权限不足')
      })
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
    },
    getData: function () {
      doGetWithToken('/me').then((r) => { this.user = r.data })
    }
  },
  mounted () {
    this.getData()
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
