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
  </div>
</template>

<script>
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
      questions: []
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
    }
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
