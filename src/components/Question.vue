<template>
  <div class="question-page">
    <h1>问答系统管理</h1>
    <div class="box">
      <el-input placeholder="请输入题目" v-model="title" required>
        <template slot="prepend">题目</template>
        <template slot="append">
          <span>题目等级: </span>
          <el-input-number v-model="level" controls-position="right" :min="1" :max="10"></el-input-number>
        </template>
      </el-input>
      <div class="options">
        <el-form>
          <el-radio-group v-model="correctIndex">
            <el-input class="option"
                      placeholder="请输入选项"
                      v-for="(item, index) in options"
                      v-model="options[index]"
                      :key="index">
              <template slot="prepend">选项{{index+1}}</template>
              <template slot="append">
                <el-radio :label="index">{{correctIndex === index ? '正确' : ''}}选项</el-radio>
              </template>
            </el-input>
          </el-radio-group>
          <el-form-item class="submit-wrap">
            <el-button type="success" @click="postQuestion">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="question-wrap">
      <el-button @click="getQuestion(getLevel)">获取题库</el-button>
      <span>题目等级: </span><el-input-number v-model="getLevel" controls-position="right" :min="1" :max="10"></el-input-number>
      <div class="questions">
        <div class="question-item"
             v-for="(question, index) in questions"
             :key = "index">
          <h1>题目：{{ question.title }}</h1>
          <p v-for="(option, index) in question.answers" :key="index">选项{{ index + 1 }}: {{ option }}</p>
          <p>正确答案: {{ question.answers[question.correctIndex] }}</p>
        </div>
      </div>
    </div>

    <div class="socket-wrap">
      <el-input v-model="username" placeholder="请输入用户名"></el-input>
      <el-input v-model="msg" @keyup.enter.native="sendMsg"></el-input>
      <el-button type="success" @click="sendMsg">发送</el-button>
      <div class="board">
        <p class="msg" v-for="(msg, index) in msgArr" :key="index">{{ msg }}</p>
      </div>
    </div>
  </div>
</template>

<script>

import io from 'socket.io-client'
export default {
  name: 'question',
  data () {
    return {
      socket: null,
      title: '',
      options: new Array(4),
      correctIndex: 0,

      level: 1,
      getLevel: 1,
      questions: [],

      username: '',
      msg: '',
      msgArr: []
    }
  },
  methods: {
    postQuestion () {
      let data = {
        title: this.title,
        answers: this.options,
        correctIndex: this.correctIndex,
        level: this.level
      }
      console.log('答题提交数据', data)
      this.axios.post('/question/add', data)
        .then(res => {
          this.$message({
            showClose: true,
            message: '提交成功',
            type: 'success'
          })
        })
        .catch(err => {
          console.error('提交失败', err)
        })
    },
    getQuestion (level) {
      this.axios.get(`/question?level=${level}`)
        .then(res => {
          this.questions = res.data.data
          console.log('题目', this.questions)
        })
    },
    sendMsg () {
      this.socket.emit('message', {msg: this.msg})
      this.socket.emit('add User', {username: this.username})
      this.msg = ''
    }
  },
  mounted () {
    this.socket = io.connect('http://127.0.0.1:8088')
    this.socket.on('message', data => {
      console.log(data.msg)
    })
    this.socket.on('broadcast', data => {
      console.log('广播消息', data.msg)
      this.msgArr.push(data.msg)
    })

    // this.axios.post('/wxlogin/manual', {code: '033B6TZs0CItUd1DmIXs01cUZs0B6TZG'})
    //   .then(res => {
    //     console.log(res)
    //     let token = res.data.token
    //     cookie.set('token', token)
    //   })
    // this.axios.post('/wxlogin/auto', {})
    //   .then(res => {
    //     console.log('自动登录成功', res)
    //   })
  }
}
</script>

<style scoped lang="scss">
  .question-page{
    text-align: left;
  }
  .box {
    margin-top: 20px;
    width: 80%;
    .submit-wrap {
      margin-top: 15px;
      text-align: right;
    }
  }
  .options {
    margin-top: 20px;
  }
  .option {
    margin-top: 10px;
  }
  .questions {
    display: flex;
  }
  .question-item {
    width: 250px;
    height: 200px;
    background-color: #eee;
    margin-top: 10px;
    margin-right: 10px;
  }
  .socket-wrap {
    margin-top: 20px;
  }
</style>

<style lang="scss">
  .question-page {
    .el-input-group__prepend {
      width: 50px;
      text-align: center;
    }
  }
</style>
