<template>
  <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container">
    <h3 class="title">后台管理系统</h3>
    <el-form-item prop="phone">
      <el-input prefix-icon="fa fa-mobile" type="text" v-model="ruleForm2.phone" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="checkPass">
      <el-input prefix-icon="fa fa-lock" type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2" :loading="logining">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
  import { requestLogin } from '../api/api';
  import {isMobile,isLoginPwd} from '../common/js/regExp';
  import {addMinutes,Message} from '../common/js/util';

  export default {
    data() {
      var checkPhone = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入手机号'));
        }
        if (!isMobile(value)) {
          callback(new Error('请输入正确的手机号码'));
        } else {
          callback();
        }
      };
      var checkPwd = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入密码'));
        }
        if (!isLoginPwd(value)) {
          callback(new Error('密码必须是6~16位以字母开头，可包含数字、“_”的字符串'));
        } else {
          callback();
        }
      };
      return {
        logining: false,
        checked:true,
        ruleForm2: {
          phone: "13233356784",
          checkPass: 'A123456'
        },
        rules2: {
          phone: [
              {validator:checkPhone,trigger:'blur'}
          ],
          checkPass: [
            {validator:checkPwd,trigger:'blur'}
          ]
        }
      };
    },
    methods: {
      handleReset2() {
        this.$refs.ruleForm2.resetFields();
      },
      handleSubmit2(ev) {
        var that = this;
        this.$refs.ruleForm2.validate((valid) => {
          if (valid) {
            this.logining = true;
            var loginParams = { phone: that.ruleForm2.phone, password: that.ruleForm2.checkPass };
            requestLogin(loginParams).then(data => {
              this.logining = false;
              let { msg, code, user } = data;
              if (code !== 200) {
                Message(that,false,data.msg,0);
              } else {
                const loginOut = {loginOut:addMinutes(new Date(),30)};
                var memberInfo = {...user,...loginOut};
                that.$store.dispatch('update_local',{memberInfo});

                this.$router.push({ path: '/table' });
              }
            });
          } else {
            return false;
          }
        });
      }
    }
  }

</script>

<style lang="scss">
@import '~scss_vars';
  .login-container {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
      font-size:25px;
    }
    .el-input__prefix{
      top:2px;
      .el-input__icon{
        font-size:20px;
        color:$color-dark-gray;
      }
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
  }
</style>
