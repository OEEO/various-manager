<template>
  <div class="user-setting">
    <ul>
      <li>
        <div class="userAvatar-box">
          <form enctype="multipart/form-data" method="post" name="fileinfo">
            <el-upload
              class="avatar-uploader"
              action="javascript:void(0)"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :with-credentials="true"
              :before-upload="beforeAvatarUpload">
              <img v-if="profiles.avatar" :src="profiles.avatar" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <el-button type="success" @click="uploadAvatar" v-if="showUploadAvatarBtn">确认上传</el-button>
            <span v-else>点击头像更换</span>
          </form>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'user-setting',
  data () {
    return {
      showUploadAvatarBtn: false,
      profiles: {
        username: '',
        avatar: ''
      },
      params: '',
      formData: ''
    }
  },
  methods: {
    handleAvatarSuccess (res, file) {
      this.profiles.avatar = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      // const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!')
      //   return false
      // }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
        return false
      }
      let windowURL = window.URL || window.webkitURL
      this.profiles.avatar = windowURL.createObjectURL(file)
      this.params = new FormData()
      this.params.append('file', file, file.name)
      this.params.append('username', this.profiles.username)
      this.showUploadAvatarBtn = true
      return false
    },
    uploadAvatar () {
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
      this.axios.post('/uploads/avatar', this.params, config)
        .then(res => {
          if (res.data.fail) {
            console.log('更新头像失败', res.data)
            return
          }
          console.log('更新头像成功', res.data)
          this.showUploadAvatarBtn = false
          this.getUserProfiles()
        })
        .catch(err => {
          console.log('发生错误', err)
        })
    },
    getUserProfiles () {
      let that = this
      this.axios.get('/user/profile')
        .then(res => {
          if (res.data.success) {
            that.isLogin = 1
            console.log('重要', res)
            that.profiles.username = res.data.username
            that.profiles.avatar = res.data.avatar
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
    >ul>li {
      list-style: none;
      position: relative;
    }
    .userAvatar-box {
      position: absolute;
      left: 0;
      top: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .userAvatar {
      cursor: pointer;
      width: 100px;
      height: 100px;
      overflow: hidden;
      img {
        width: 100%;
      }
    }
    .update-avatar-btn {
      margin-top: 10px;
    }
    .avatar-uploader {
      .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
      }
      .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
      }
      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
      }
      .avatar {
        width: 178px;
        height: 178px;
        display: block;
      }
    }
    .test-box {
      .img-wrap {
        width: 100px;
        height: 100px;
        overflow: hidden;
        img {
          width: 100%;
        }
      }
    }
  }
</style>
