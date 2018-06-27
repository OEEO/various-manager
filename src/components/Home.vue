<template>
    <div class="home">
      <header>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item index="1">
            <router-link to="/">首页</router-link>
          </el-menu-item>
          <el-menu-item index="2">
            <router-link to="/Photos">相册</router-link>
          </el-menu-item>
          <el-menu-item index="3">
            <router-link to="/Article">我的文章</router-link>
          </el-menu-item>
          <el-menu-item index="4">
            <router-link to="/Post">写文章</router-link>
          </el-menu-item>
        </el-menu>
        <div class="user-box">
          <template v-if="isLogin === 1">
            <div
              class="userAvatar"
              @mouseenter="showProfiles = true"
              @mouseleave="showProfiles = false">
              <!--<img :src="userAvatar" alt="头像">-->
              <p>{{ profiles.username }}</p>
              <div class="profiles" v-if="showProfiles">
                <el-button type="" class="item" @click="goToUserSetting">个人设置</el-button>
                <el-button type="danger" class="item" @click="logout">退出登录</el-button>
              </div>
            </div>
          </template>
          <template v-else-if="isLogin === 0">
            <el-button type="success" @click="showLoginModal">登录</el-button>
            <el-button type="" @click="showRegisterModal">注册</el-button>
          </template>
        </div>
      </header>
      <main>
        <router-view></router-view>
      </main>
      <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
        <el-form :model="loginForm" :rules="rules2" ref="loginForm" label-width="" class="login-form">
          <template v-if="curDialog === 'register'">
            <el-form-item label="昵称" prop="surname">
              <el-input type="text" v-model="loginForm.surname" auto-complete="off"></el-input>
            </el-form-item>
          </template>
          <el-form-item label="手机号 或 Email" prop="username">
            <el-input type="text" v-model="loginForm.username" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="loginForm.pass" auto-complete="off"></el-input>
          </el-form-item>
          <template v-if="curDialog === 'register'">
            <el-form-item label="确认密码" prop="checkPass">
              <el-input type="password" v-model="loginForm.checkPass" auto-complete="off"></el-input>
            </el-form-item>
          </template>
          <el-form-item class="footer-btn">
            <div v-if="curDialog === 'register'">
              <el-button type="success" @click="submitForm('loginForm')">注册</el-button>
            </div>
            <div v-else>
              <el-button type="success" @click="submitForm('loginForm')">登录</el-button>
            </div>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
</template>

<script>
import cookie from '../utils/cookie'

export default {
  name: 'Home',
  data () {
    const checkUsername = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('请输入用户名！'))
      } else {
        let reEmail = /^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}$/
        let rePhone = /^1\d{10}$/
        if (reEmail.test(value) || rePhone.test(value)) {
          callback()
        } else {
          callback(new Error('请输入手机号或邮箱！'))
        }
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value === null) {
        callback(new Error('帐号或密码错误'))
        return
      }
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.curDialog === 'register' && this.loginForm.checkPass !== '') {
          this.$refs.loginForm.validateField('checkPass')
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.loginForm.pass) {
        callback(new Error('两次输入的密码不一致'))
      } else {
        callback()
      }
    }
    return {
      profiles: {
        username: ''
      },
      showProfiles: false,
      isLogin: '', // 1 表示登录，0 表示未登录
      activeIndex: '1', // 菜单初始位置
      dialogTitle: '',
      curDialog: '',
      dialogFormVisible: false,
      loginForm: {
        username: '',
        surname: '',
        pass: '',
        checkPass: ''
      },
      rules2: {
        username: [
          {validator: checkUsername, trigger: 'blur'}
        ],
        pass: [
          {validator: validatePass, trigger: 'blur'}
        ],
        checkPass: [
          {validator: validatePass2, trigger: 'blur'}
        ]
      }
    }
  },
  computed: {

  },
  methods: {
    goToUserSetting () {
      this.$router.push({
        path: '/user/setting'
      })
    },
    submitForm (formName) {
      let that = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (that.curDialog === 'register') {
            that.register()
          } else {
            that.login()
          }
        } else {
          return false
        }
      })
    },
    checkToken () {
      let that = this
      this.axios.get('/user/profile')
        .then(res => {
          if (res.data.success) {
            that.isLogin = 1
            that.profiles.username = res.data.username
          } else {
            that.isLogin = 0
          }
        })
    },
    login () {
      let data = {
        username: this.loginForm.username,
        password: this.loginForm.pass
      }
      let that = this
      this.axios.post('/login', data)
        .then(res => {
          if (res.data.success) {
            // 隐藏模态框
            that.dialogFormVisible = false
            console.log('登录成功')
            let username = res.data.username
            let token = res.data.token
            console.log(token)
            cookie.set('token', token)
            that.checkToken()
            // that.$router.push({
            //   path: '/Home/' + username,
            //   params: {
            //     username: username
            //   }
            // })
          } else {
            that.$message('帐号或密码错误')
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    logout () {
      this.showProfiles = false
      cookie.clear('token')
      this.isLogin = 0
    },
    register () {
      let reUsername = this.loginForm.username
      let reSurname = this.loginForm.reSurname
      let rePassword = this.loginForm.pass
      let reConPassword = this.loginForm.checkPass
      let that = this
      if (rePassword !== reConPassword) {
        that.$message.error('两次输入密码不一样')
        return
      }
      this.axios.get('/register/checkname?username=' + reUsername)
        .then(res => {
          console.log(res.data.exist)
          if (res.data.exist) {
            console.log(res.data.msg)
            return
          }
          console.log(res.data.msg)
          that.axios.post('/register', {
            username: reUsername,
            surname: reSurname,
            password: rePassword
          })
            .then(res => {
              console.log(res.data.msg)
              this.dialogFormVisible = false
            })
        })
    },
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    showLoginModal () {
      this.dialogTitle = '登录'
      this.curDialog = 'login'
      this.dialogFormVisible = true
    },
    showRegisterModal () {
      this.dialogTitle = '注册'
      this.curDialog = 'register'
      this.dialogFormVisible = true
    }
  },
  beforeMount () {
    console.log('beforeMount')
    this.checkToken()
  },
  mounted () {

  },
  beforeUpdate () {

  }
}
</script>

<style lang="scss">
  $mainFontColor: #2c3e50;
.home{
  >header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80px;
    line-height: 80px;
    font-size: 25px;
    .el-menu-item{
      padding: 0;
      a{
        display: block;
        padding: 0 20px;
        text-decoration: none;
        color: $mainFontColor;
        &:visited{
          color: $mainFontColor
        }
      }
    }
    .user-box{
      display: flex;
      align-items: center;
      .userAvatar{
        position: relative;
        cursor: pointer;
        width: 60px;
        height: 60px;
        line-height: 60px;
        font-size: 16px;
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        border-radius: 50%;
        background-color: #eee;
        .profiles{
          position: absolute;
          z-index: 50;
          top: 60px;
          right: 10px;
          width: 250px;
          height: 200px;
          background-color: #fff;
          border: 1px solid #eee;
          box-shadow: 1px 1px 1px 1px rgba(125, 125, 125, 0.2);
          button{
            width: 90%;
          }
        }
      }
    }
  }
  .el-dialog{
    max-width: 550px;
    border-radius: 10px;
    overflow: hidden;
    .el-dialog__header{
      background-color: #f3f3f3;
      text-align: left;
      padding: 15px 20px;
    }
    .el-dialog__body,
    .el-dialog__footer{
      padding: 0 25%;
    }
    .el-dialog__body{
      margin: 50px auto;
      .el-form-item__label{
        font-size: 16px;
        font-weight: bold;
      }
      .footer-btn{
        button {
          width: 100%;
        }
      }
    }
    .el-dialog__footer {
      margin-bottom: 60px;
      .dialog-footer{
        display: block;
        button{
          width: 100%;
        }
      }
    }

  }
}
</style>
