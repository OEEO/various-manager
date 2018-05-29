<template>
    <div class="home">
      <header>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
          <el-menu-item index="1">
            <router-link to="/Article">文章</router-link>
          </el-menu-item>
          <el-menu-item index="2">
            <router-link to="/Photos">相册</router-link>
          </el-menu-item>
          <el-menu-item index="3">
            <router-link to="/Post">写文章</router-link>
          </el-menu-item>
        </el-menu>
        <div class="user-box">
          <div v-if="isLogin">
            <div class="userAvatar">
              <img :src="userAvatar" alt="头像">
            </div>
          </div>
          <div v-else>
            <el-button type="success" @click="showLoginModal">登录</el-button>
            <el-button type="" @click="showRegisterModal">注册</el-button>
          </div>
        </div>
      </header>
      <main>
        <router-view></router-view>
      </main>
      <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="手机号 或 Email" :label-width="formLabelWidth">
            <el-input v-model="form.username" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" :label-width="formLabelWidth">
            <el-input v-model="form.password" auto-complete="off"></el-input>
          </el-form-item>
          <div v-if="curDialog === 'register'">
            <el-form-item label="确认密码" :label-width="formLabelWidth">
              <el-input v-model="form.conPassword" auto-complete="off"></el-input>
            </el-form-item>
          </div>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <div v-if="curDialog === 'login'">
            <el-button type="success" @click="login">登录</el-button>
          </div>
          <div v-else>
            <el-button type="success" @click="register">注册</el-button>
          </div>
        </span>
      </el-dialog>
    </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      isLogin: false,
      activeIndex: '1',
      dialogTitle: '',
      curDialog: '',
      dialogFormVisible: false,
      form: {
        username: '',
        password: '',
        reConPassword: ''
      },
      formLabelWidth: ''
    }
  },
  computed: {

  },
  methods: {
    login () {
      let data = {
        username: this.form.username,
        password: this.form.password
      }
      let that = this
      this.axios.post('/login', data)
        .then(res => {
          if (res.data.success) {
            // 隐藏模态框
            this.dialogFormVisible = false
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
            alert('登录失败')
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    register () {
      let reUsername = this.form.username
      let rePassword = this.form.password
      let reConPassword = this.form.conPassword
      let that = this
      if (rePassword !== reConPassword) {
        that.$message.error('两次输入密码不一样')
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

  },
  mounted () {
    this.$message('你好啊')
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
    .userAvatar{
      width: 60px;
      height: 60px;
      -webkit-border-radius: 50%;
      -moz-border-radius: 50%;
      border-radius: 50%;
      background-color: #eee;
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
      margin-bottom: 50px;
    }
    .el-dialog__body,
    .el-dialog__footer{
      padding: 0 25%;
    }
    .el-dialog__body{
      .el-form-item__label{
        font-size: 16px;
        font-weight: bold;
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
