<template>
  <div class="photos">

    <div class="albums-wrap">
      <el-carousel height="300px" type="card" :interval="3000">
        <el-carousel-item v-for="(item, index) in imgs" :key="index">
          <img :src="item.url" alt="" class="albums-img">
        </el-carousel-item>
      </el-carousel>
    </div>
    <el-button type="primary" @click="imgUploadModalShow = true" class="add-img-btn">添加图片</el-button>
    <div class="img-upload" v-if="imgUploadModalShow">
      <el-upload
        :action="uploadImgAction"
        :data="uploadImgData"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove">
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt="">
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: 'albums',
  props: ['user'],
  data () {
    return {
      imgs: [],
      dialogImageUrl: '',
      dialogVisible: false,
      uploadImgAction: `https://www.wangchaozhen.com/api/uploads/albums?username=${this.user.username}`,
      uploadImgData: {username: this.user.username},
      imgUploadModalShow: false
    }
  },
  computed: {

  },
  methods: {
    getImagesList () {
      let that = this
      this.axios.get('/albums')
        .then(res => {
          that.imgs = res.data.data
        })
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
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
    .albums-img {
      height: 100%;
    }
    .albums-wrap {
      background-color: #eee;
      margin-top: 20px;
    }
    .add-img-btn {
      margin-top: 30px;
    }
  }
</style>
