<template>
  <div class="login">
    <div>
      <label for="username">用户名：</label>
      <el-input id="username" v-model="username"></el-input>
    </div>
    <div>
      <label for="password">密码</label>
      <el-input id="password" v-model="password"></el-input>
    </div>
    <div>
      <el-button type="primary" @click="login">登录</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login () {
      let data = {
        username: this.username,
        password: this.password
      }
      function transformRequest (data) {
        // Do whatever you want to transform the data
        let ret = ''
        for (let it in data) {
          ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
      }
      data = transformRequest(data).slice(0, -1)
      console.log(data)
      this.axios.post('/login', data)
        .then(res => {
          console.log(res.data)
          if (res.data.msg === 'success') {
            console.log('登录成功')
            this.$router.push({
              path: '/Home',
              query: {
                username: res.data.username
              }
            })
          } else {
            console.log(res.data.msg)
          }
        })
    }
  }
}
</script>

<style scoped>

</style>
