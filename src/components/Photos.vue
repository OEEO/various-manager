<template>
  <div class="photos">
    <div class="img-wrap" v-for="(item, index) in imgs" :key="index">
      <img :src="item.url" :alt="item.imgTitle" class="img">
      <p>{{ item.imgTitle }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Photos',
  data () {
    return {
      imgs: []
    }
  },
  methods: {
    getImagesList () {
      let that = this
      this.axios.get('/images')
        .then(res => {
          that.imgs = res.data
        })
    }
  },
  beforeCreate () {
    console.log('Photos beforeCreate')
  },
  created () {
    console.log('Photos created')
  },
  beforeMount () {
    this.getImagesList()
  },
  mounted () {
    console.log('Photos mounted')
  },
  beforeUpdate () {
    console.log('Photos beforeUpdate')
  },
  updated () {
    console.log('Photos updated')
  },
  beforeDestroy () {
    console.log('Photos beforeDestroy')
  },
  destroyed () {
    console.log('Photos destroyed')
  }
}
</script>

<style lang="scss" scoped>
  .photos{
    .img{
      width: 500px;
      display: block;
      margin: 20px auto 0;
    }
  }
</style>
