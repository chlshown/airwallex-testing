<template>
  <div class="login-wrap">
    <h1 class="title">
      <p>Broccoli & Co.</p>
      <p>Testing for Airwallex made by Ray</p>
    </h1>
    <el-button
      type="primary"
      @click="showPopup"
      class="sign-button"
      round
      size="medium "
      >Sign in</el-button
    >
    <el-dialog
      title="Sign in"
      :visible.sync="loginVisible"
      custom-class="login-dialog"
    >
      <el-form
        :model="param"
        :rules="rules"
        ref="login"
        label-width="0px"
        class="ms-content"
      >
        <el-form-item prop="username">
          <el-input v-model="param.username" placeholder="Full name">
          </el-input>
        </el-form-item>
        <el-form-item prop="email">
          <el-input type="email" placeholder="Email" v-model="param.email">
          </el-input>
        </el-form-item>
        <el-form-item prop="confirmEmail">
          <el-input
            type="email"
            placeholder="Confirm email"
            v-model="param.confirmEmail"
          >
          </el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="submitForm()" :loading="sendLoading"
            >Send</el-button
          >
        </div>
        <div class="error-message">{{ errorMessage }}</div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import * as axios from '../../lib/axios'

export default {
  data: function() {
    return {
      loginVisible: false,
      sendLoading: false,
      ifLogin: false,
      errorMessage: '',
      param: {
        username: '',
        email: '',
        confirmEmail: '',
      },
      rules: {
        username: [
          {
            required: true,
            message: 'Please enter your name',
            trigger: 'blur',
          },
          {
            validator: this.validateName,
            trigger: 'blur',
          },
        ],
        email: [
          {
            required: true,
            message: 'Please enter your email',
            trigger: 'blur',
          },
          {
            validator: this.validateEmail,
            trigger: 'blur',
          },
        ],
        confirmEmail: [
          {
            required: true,
            message: 'Please enter your email again',
            trigger: 'blur',
          },
          {
            validator: this.validateEmail,
            trigger: 'blur',
          },
          {
            validator: this.validateConfirmEmail,
            trigger: 'blur',
          },
        ],
      },
    }
  },
  methods: {
    validateName(rule, value, callback) {
      if (value.length <= 3) {
        callback(
          new Error('The user name needs to be greater than 3 characters')
        )
      } else {
        callback()
      }
    },
    validateEmail(rule, value, callback) {
      var regEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      if (!regEmail.test(value)) {
        callback(new Error('Bad mailbox format'))
      } else {
        callback()
      }
    },
    validateConfirmEmail(rule, value, callback) {
      if (value !== this.param.email) {
        callback(new Error('The two emails are inconsistent'))
      } else {
        callback()
      }
    },
    async postAuthApi() {
      const res = await axios.post('fake-auth', {
        name: this.param.username,
        email: this.param.email,
      })
      return res
    },
    submitForm() {
      this.errorMessage = ''
      this.$refs.login.validate(async (valid) => {
        if (valid) {
          this.sendLoading = true
          const res = await this.postAuthApi()
          this.sendLoading = false
          if (res.success) {
            this.ifLogin = true
            this.$alert('Thank you', 'All Done！', {
              confirmButtonText: 'OK',
              callback: (action) => {
                this.loginVisible = false
                this.ifLogin = false
              },
            })
          } else {
            this.errorMessage = res.msg
          }
        } else {
          this.errorMessage = 'Please enter the right information'
          return false
        }
      })
    },
    showPopup() {
      this.loginVisible = true
      this.errorMessage = ''
      this.sendLoading = false
      this.ifLogin = false
    },
  },
}
</script>

<style lang="less" scoped>
.el-dialog {
  min-width: 360px;
}

.login-wrap {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow-y: auto;
  background-size: 100%;
  background: #324157;
  padding-top: 70px;
  padding-bottom: 70px;
  box-sizing: border-box;

  .title {
    position: absolute;
    margin: 0 auto;
    left: 0;
    right: 0;
    top: 200px;
    color: white;
    width: 40%;
    min-width: 300px;
    text-align: center;
  }

  .sign-button {
    position: absolute;
    margin: 0 auto;
    left: 0;
    right: 0;
    top: 400px;
    width: 100px;
    height: 40px;
  }

  .error-message {
    color: red;
    text-align: center;
  }

  .ms-content {
    padding: 30px 30px;
  }
  .login-btn {
    text-align: center;
  }
  .login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
  }
}
</style>
