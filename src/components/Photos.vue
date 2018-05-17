<template>
  <div class="photos">
    <div class="img-wrap" v-for="(item, index) in imgs" :key="index">
      <img :src="item.src" :alt="item.title" class="img">
      <p>{{ item.title }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Photos',
  data () {
    return {
      imgs: [
        { id: 1, title: '图片1', src: '../images/1.png' },
        { id: 2, title: '图片2', src: '../images/2.png' },
        { id: 3, title: '图片3', src: '../images/3.png' }
      ]
    }
  }
}
</script>

<style scoped>

</style>
