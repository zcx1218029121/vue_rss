<template>
  <div>
  <div class="login-wrap">
    <div class="login-html">
      <input id="tab-1" type="radio" name="tab" class="sign-in" checked><label for="tab-1" class="tab">Sign In</label>
      <input id="tab-2" type="radio" name="tab" class="sign-up"><label for="tab-2" class="tab">Sign Up</label>
      <div class="login-form">
        <div class="sign-in-htm">
          <div class="group">
            <label for="user" class="label">Username</label>
            <input  v-model="un" type="text" class="input">
          </div>
          <div class="group">
            <label for="pass" class="label">Password</label>
            <input v-model="pw" type="password" class="input" data-type="password">
          </div>
          <div class="group">
            <input id="check" type="checkbox" class="check" checked>
            <label for="check"><span class="icon"></span> Keep me Signed in</label>
          </div>
          <div class="group">
            <input type="submit" class="button" @click="doLogin" value="Sign In">
          </div>
          <div class="hr"></div>
          <div class="foot-lnk">
            <a href="#forgot">Forgot Password?</a>
          </div>
        </div>

        <!--- 注册   !--->
        <div class="sign-up-htm">
          <div class="group">
            <label for="user" class="label">Username</label>
            <input v-model="un" id="user" type="text" class="input">
          </div>
          <div class="group">
            <label for="pass" class="label">Password</label>
            <input v-model="pw"  type="password" class="input" data-type="password">
          </div>
          <div class="group">
            <label for="pass" class="label">昵称</label>
            <input  type="text" v-model="nickName" class="input" >
          </div>
          <div class="group">
            <label for="pass" class="label">icon</label>
            <input id="pass" v-model="icon" type="text" class="input">
          </div>
          <div class="group">
            <label for="user" class="label">Invitation code</label>
            <input  id="Invitation code" v-model="code" type="text" class="input">
          </div>
          <div class="group">
            <input type="submit" @click="dosingUp" class="button" value="Sign Up">
          </div>
          <div class="hr"></div>
          <div class="foot-lnk">
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
// eslint-disable-next-line standard/object-curly-even-spacing
import crypto from 'crypto'
// eslint-disable-next-line standard/object-curly-even-spacing
import { rootNet, doPostWithToken} from '../../common/api'
import axios from 'axios'
export default {
  name: 'singup',
  data () {
    return {
      un: '',
      pw: '',
      nickName: '',
      icon: '',
      code: ''
    }
  },
  methods: {
    doLogin: function () {
      const r = this.$router
      const params = new URLSearchParams()
      const md5 = crypto.createHash('md5').update(this.pw).digest('hex')
      params.append('userName', this.un)
      params.append('password', md5)
      console.log(rootNet)
      axios.post(rootNet + 'login', params).then(function (res) {
        console.log(res)

        if (res.data.resultCode === 200) {
          localStorage.setItem('token', res.data.token)
          localStorage.setItem('username', res.data.nickname)
          r.push({path: 'main/goods'})
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
    },
    dosingUp: function () {
      let params = new URLSearchParams()
      params.append('name', this.un)
      const md5 = crypto.createHash('md5').update(this.pw).digest('hex')
      params.append('password', md5)
      params.append('nickName', this.nickName)
      params.append('code', this.code)
      params.append('icon', this.icon)
      doPostWithToken('registered', params).then(function (r) {
        // eslint-disable-next-line no-unused-expressions
        if (r.data.code === 200) {
          alert('注册成功')
        } else if (r.data.code === 501) {
          alert('重复的用户名')
        } else if (r.data.code === 502) {
          alert('错误的邀请码')
        }
      })
    }
  }
}
</script>

<style scoped>
  body{
    margin:0;
    color:#6a6f8c;
    background:#c8c8c8;
    font:600 16px/18px 'Open Sans',sans-serif;
  }
  *,:after,:before{box-sizing:border-box}
  .clearfix:after,.clearfix:before{content:'';display:table}
  .clearfix:after{clear:both;display:block}
  a{color:inherit;text-decoration:none}

  .login-wrap{
    width:100%;
    margin:auto;
    max-width:525px;
    min-height:670px;
    position:relative;
    background:url(https://raw.githubusercontent.com/khadkamhn/day-01-login-form/master/img/bg.jpg) no-repeat center;
    box-shadow:0 12px 15px 0 rgba(0,0,0,.24),0 17px 50px 0 rgba(0,0,0,.19);
  }
  .login-html{
    width:100%;
    height:100%;
    position:absolute;
    padding:90px 70px 50px 70px;
    background:rgba(40,57,101,.9);
  }
  .login-html .sign-in-htm,
  .login-html .sign-up-htm{
    top:0;
    left:0;
    right:0;
    bottom:0;
    position:absolute;
    transform:rotateY(180deg);
    backface-visibility:hidden;
    transition:all .4s linear;
  }
  .login-html .sign-in,
  .login-html .sign-up,
  .login-form .group .check{
    display:none;
  }
  .login-html .tab,
  .login-form .group .label,
  .login-form .group .button{
    text-transform:uppercase;
  }
  .login-html .tab{
    font-size:22px;
    margin-right:15px;
    padding-bottom:5px;
    margin:0 15px 10px 0;
    display:inline-block;
    border-bottom:2px solid transparent;
  }
  .login-html .sign-in:checked + .tab,
  .login-html .sign-up:checked + .tab{
    color:#fff;
    border-color:#1161ee;
  }
  .login-form{
    min-height:345px;
    position:relative;
    perspective:1000px;
    transform-style:preserve-3d;
  }
  .login-form .group{
    margin-bottom:15px;
  }
  .login-form .group .label,
  .login-form .group .input,
  .login-form .group .button{
    width:100%;
    color:#fff;
    display:block;
  }
  .login-form .group .input,
  .login-form .group .button{
    border:none;
    padding:15px 20px;
    border-radius:25px;
    background:rgba(255,255,255,.1);
  }
  .login-form .group input[data-type="password"]{
    text-security:circle;
    -webkit-text-security:circle;
  }
  .login-form .group .label{
    color:#aaa;
    font-size:12px;
  }
  .login-form .group .button{
    background:#1161ee;
  }
  .login-form .group label .icon{
    width:15px;
    height:15px;
    border-radius:2px;
    position:relative;
    display:inline-block;
    background:rgba(255,255,255,.1);
  }
  .login-form .group label .icon:before,
  .login-form .group label .icon:after{
    content:'';
    width:10px;
    height:2px;
    background:#fff;
    position:absolute;
    transition:all .2s ease-in-out 0s;
  }
  .login-form .group label .icon:before{
    left:3px;
    width:5px;
    bottom:6px;
    transform:scale(0) rotate(0);
  }
  .login-form .group label .icon:after{
    top:6px;
    right:0;
    transform:scale(0) rotate(0);
  }
  .login-form .group .check:checked + label{
    color:#fff;
  }
  .login-form .group .check:checked + label .icon{
    background:#1161ee;
  }
  .login-form .group .check:checked + label .icon:before{
    transform:scale(1) rotate(45deg);
  }
  .login-form .group .check:checked + label .icon:after{
    transform:scale(1) rotate(-45deg);
  }
  .login-html .sign-in:checked + .tab + .sign-up + .tab + .login-form .sign-in-htm{
    transform:rotate(0);
  }
  .login-html .sign-up:checked + .tab + .login-form .sign-up-htm{
    transform:rotate(0);
  }

  .hr{
    height:2px;
    margin:60px 0 50px 0;
    background:rgba(255,255,255,.2);
  }
  .foot-lnk{
    text-align:center;
  }
</style>
