<template>
  <div class="index-page">
    <com-header></com-header>
    <transition :name="transitionName" mode="out-in">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
import comHeader from '../components/common-header'
import cookie from '../utils/cookie'
export default {
  name: 'index',
  components: { comHeader },
  data () {
    return {
      transitionName: 'fade',
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    }
  },
  methods: {
    autoLogin () {
      let that = this
      let token = cookie.get('token')
      if (!token) {
        console.log('自动登录失败')
        that.user.isLogin = 0
        return
      }
      this.axios.get('/user/profile')
        .then(res => {
          if (res.data.success) {
            that.user.isLogin = 1
            that.user.username = res.data.username
            that.user.avatar = res.data.avatar
          } else {
            that.user.isLogin = 0
          }
        })
    }
  },
  mounted () {
    this.autoLogin()
  }
}
</script>

<style lang="scss" scoped>
.index-page {

}
</style>
