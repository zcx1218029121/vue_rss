<template>
  <div class="warrp">
    <div class="login">
      <div class="login_image">
        <img src="data:image/png;base64,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"
             alt="">
      </div>
      <div class="login_content">

        <div class="login_content_form">
          <input type="text"
                 v-model="un"
                 placeholder="username">
        </div>
        <div class="login_content_form">
          <input type="password"
                 placeholder="password"
                 v-model="pw">
        </div>
        <button class="login_btn"
                @click="doLogin()">Login</button>
      </div>
    </div>
  </div>
</template>
<script>
import { rootNet } from '../../common/api'
import axios from 'axios'
export default {
  data () {
    return {
      un: '',
      pw: ''
    }
  },
  methods: {
    doLogin: function () {
      var r = this.$router

      var params = new URLSearchParams()
      params.append('userName', this.un)
      params.append('password', this.pw)
      console.log(rootNet)
      axios.post(rootNet + 'login', params).then(function (res) {
        console.log(res)

        if (res.data.resultCode === 200) {
          localStorage.setItem('token', res.data.token)
          localStorage.setItem('username', res.data.nickname)
          r.push({ path: 'main/goods' })
        } else {
          alert('登录失败')
        }
      }).catch(function (err) {
        if (err) {
          if (err.response.status === 401) {
            alert('账号或者密码错误')
          }
          if (err.response.status === 500) {
            alert('服务内部错误！')
          }
        }
      })
    }
  }
}
</script>

<style scoped>
@import url("assets/css/bootstrap.min.css");
@import url("assets/css/demo.css");
.warrp {
  width: 100%;
  height: 100%;
}

.login {
  font: 18px;
  position: relative;
  background-color: white;
  border-radius: 2px;
  max-width: 100%;
  margin: 20px auto;
  padding: 16px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
}
.login_image {
  max-height: 100%;
  max-width: 100%;
  text-align: center;
  margin: 16px;
}
.login_image img {
  height: 150px;
  width: 150px;
  border-radius: 100px;
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.05);
}
.login_content {
  text-align: center;
  padding: 25px 45px;
  margin: 20px auto;
}
.login_content_form {
  margin: 10px;
  display: grid;
}
.login_content_form input {
  padding: 16px;
  border: none;
  border-bottom: 2px solid #694ed6;
  margin: 10px 0;
  transition: 0.25s all;
}
.login_content_form input:focus {
  outline: none;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.125);
  border-bottom: none;
  transition: 0.25s all;
}
.login_btn {
  border: none;
  background: #694ed6;
  cursor: pointer;
  border-radius: 3px;
  padding: 16px;
  width: 200px;
  color: white;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.2);
}

@media only screen and (max-width: 390px) {
  .login {
    width: 100%;
    padding: 16px 0;
  }

  .login_btn {
    width: 100%;
  }
}
</style>
