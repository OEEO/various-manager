<template>
  <div class="login">
    <div v-if="!register">
      <div class="form-body">
        <div class="form-item">
          <label for="username"></label>
          <el-input id="username" v-model="username" placeholder="请输入邮箱或手机号"></el-input>
        </div>
        <div class="form-item">
          <label for="password"></label>
          <el-input id="password" v-model="password" @keyup.enter.native="login" placeholder="请输入密码"></el-input>
        </div>
        <div class="form-item">
          <el-button type="primary" @click="login" class="login-btn">登录</el-button>
        </div>
        <div class="form-item">
          <span @click="register = true" class="btn">注册</span>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="form-body">
        <div class="form-item">
          <label for="reUsername"></label>
          <el-input id="reUsername" v-model="reUsername" placeholder="请输入邮箱或手机号"></el-input>
        </div>
        <div class="form-item">
          <label for="rePassword"></label>
          <el-input id="rePassword" v-model="rePassword" @keyup.enter.native="login" placeholder="请输入密码"></el-input>
        </div>
        <div class="form-item">
          <label for="reConPassword"></label>
          <el-input id="reConPassword" v-model="reConPassword" @keyup.enter.native="login" placeholder="请确认密码"></el-input>
        </div>
        <div class="form-item">
          <el-button type="primary" @click="toRegister" class="login-btn">注册</el-button>
        </div>
        <div class="form-item">
          <span class="btn" @click="register = false">登录</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import cookie from '../utils/cookie'
export default {
  name: 'Login',
  data () {
    return {
      username: '王朝振',
      password: '123456',
      // 注册
      reUsername: '',
      rePassword: '',
      reConPassword: '',
      register: false
    }
  },
  methods: {
    login () {
      let data = {
        username: this.username,
        password: this.password
      }
      let that = this
      this.axios.post('/login', data)
        .then(res => {
          if (res.data.success) {
            console.log('登录成功')
            let username = res.data.username
            let token = res.data.token
            console.log(token)
            cookie.set('token', token)
            that.$router.push({
              path: '/Home/' + username,
              params: {
                username: username
              }
            })
          } else {
            console.log('登录失败')
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    toRegister () {
      let reUsername = this.reUsername
      let rePassword = this.rePassword
      let reConPassword = this.reConPassword
      let that = this
      if (rePassword !== reConPassword) {
        console.log('两次输入密码不一样')
        return
      }
      this.axios.get('/username?username=' + reUsername)
        .then(res => {
          console.log(res.data.exist)
          if (res.data.exist) {
            console.log(res.data.msg)
            return
          }
          console.log(res.data.msg)
          that.axios.post('/register', {
            username: reUsername,
            password: rePassword
          })
            .then(res => {
              console.log('注册成功')
            })
        })
    }
  }
}
</script>

<style lang="scss" scoped>
  .login{
    height: 100vh;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    .form-body{
      padding: 50px;
      background-color: #5eaf52;
      .form-item{
        width: 30%;
        min-width: 300px;
        margin: 30px auto 0;
        >.btn{
          cursor: pointer;
          &:hover{
            color: #fff;
          }
        }
        .login-btn{
          width: 100%;
        }
      }
    }
  }
</style>
