<template>
    <div class="home">
      <header>
        <h1>首页</h1>
        <nav>
          <router-link to="/Article">文章</router-link>
          <router-link to="/Photos">图片</router-link>
        </nav>
      </header>
      <main>
        <router-view></router-view>
      </main>
    </div>
</template>

<script>
export default {
  name: 'Home',
  beforeCreate () {
    console.log('Home beforeCreate')
  },
  created () {
    console.log('Home created')
  },
  beforeMount () {
    console.log('Home beforeMount')
  },
  mounted () {
    console.log('Home mounted')
  },
  beforeUpdate () {
    console.log('Home beforeUpdate')
  },
  updated () {
    console.log('Home updated')
  },
  beforeDestroy () {
    console.log('Home beforeDestroy')
  },
  destroyed () {
    console.log('Home destroyed')
  }

}
</script>

<style scoped>

</style>
