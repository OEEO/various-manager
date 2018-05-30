<template>
  <div class="user-setting">
    <ul>
      <li>
        <div>昵称：{{profiles.username}}</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'user-setting',
  data () {
    return {
      profiles: {
        username: ''
      }
    }
  },
  methods: {
    getUserProfiles () {
      let that = this
      this.axios.get('/getUserProfiles')
        .then(res => {
          if (res.data.success) {
            that.isLogin = 1
            that.profiles.username = res.data.username
          } else {
            that.isLogin = 0
          }
        })
    }
  },
  beforeMount () {
    this.getUserProfiles()
  }
}
</script>

<style lang="scss">
  .user-setting{

  }
</style>
