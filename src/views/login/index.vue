
<template>
  <div class="login-bg">
    <div class="lft-img">
      <i></i>
      <div class="lfti iconlt" />
      <div class="lfti iconrt" />
      <div class="lfti iconlb" />
      <div class="lfti iconrb" />
    </div>
    <div class="adorn ad-t" />
    <div class="adorn ad-lb" />
    <div class="adorn ad-rb" />

    <div class="login-box">
      <div class="login-name">
        <span>{{ systemName }}</span>
      </div>
      <div class="input-box">
        <el-form
          ref="loginForm"
          :model="loginForm"
          class="login-form"
          auto-complete="on"
          label-position="left"
          @keyup.enter.native="handleLogin" >
          <el-form-item prop="username">
            <input v-model="loginForm.username"
              class="input"
              tabindex="1"
              placeholder="请输入用户名"/>
            <i class="i-user" />
            <!-- prefix-icon="el-icon-user-solid"  -->
          </el-form-item>
          <el-form-item prop="password">
            <input
              :key="passwordType"
              ref="password"
              v-model="loginForm.password"
              class="input"
              :type="passwordType"
              placeholder="请输入密码"
              name="password"
              tabindex="2" />

            <!-- <span class="show-pwd" @click="showPwd">
              <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"/>
            </span> -->
            <i class="i-pwd" />
          </el-form-item>

          <el-form-item v-if="capUrl" prop="username">
            <input
              v-model="loginForm.captcha"
              class="input capt"
              tabindex="3"
              placeholder="请输入验证码" />
            <i class="i-capt" />
            <img class="captcha" :src="capUrl" @click="showCapt" />
          </el-form-item>
        </el-form>
      </div>
      <el-button :loading="loading" @click.native.prevent="handleLogin">登 录</el-button>
    </div>

  </div>
</template>

<script>
import { getLoginKey, logoutBefore, checkCaptcha } from "@/api/user";
import { aes } from "@/utils/aes";
import Cookies from "js-cookie";
// Vue.use(animated);
export default {
  name: "Login",
  data() {
    return {
      systemName: customConfig.systemName,
      loginForm: {},
      passwordType: "password",
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {},
      capUrl: "", // 图片验证码地址
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        var path = route.query && route.query.relay;
        if (path) {
          this.redirect = decodeURIComponent(path);
        }
      },
      immediate: true,
    },
  },
  created() {
  },
  mounted() {
    if (this.loginForm.username === "") {
      this.$refs.username.focus();
    } else if (this.loginForm.password === "") {
      this.$refs.password.focus();
    }
    if(customConfig.LOGIN_TYPE==='ucapi'){
      this.getUuid();
      this.showCapt();
    }
  },
  destroyed() {},
  methods: {
    getUuid() {
      var s = [];
      var hexDigits = "0123456789abcdef";
      for (var i = 0; i < 36; i++) {
          s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
      }
      s[14] = "4";  
      s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); 
      s[8] = s[13] = s[18] = s[23] = "-";
      this.loginForm.uuid = s.join("");
    },
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      var username = this.loginForm.username;
      if (!username) {
        this.$message.warning("请输入用户名");
        return;
      }
      var password = this.loginForm.password;
      if (!password) {
        this.$message.warning("请输入密码");
        return;
      }
      var captcha = this.loginForm.captcha;
      if (this.capUrl && !captcha) {
        this.$message.warning("请输入验证码");
        return;
      }
      this.loading = true;
      getLoginKey().then((res) => {
        var key = res.data;
        if (!key) {
          this.loading = false;
          return;
        }
        this.loginForm.password = aes.encrypt(password, key).replace(/\+/g, "%2B")
        this.doLogin();
      })
    },
    doLogin() {
      this.$store.dispatch("user/login", this.loginForm).then((res) => {
          this.loading = false;
          Cookies.set("dashboard", "1");
          var cb=this.redirect?this.redirect:customConfig.homePage;
          if(cb==='/index'){
              this.$router.push({ path: this.redirect || "/", query: this.otherQuery },(onComplete) => {},(onAbort) => {});
          }else{
            top.location.href=cb;
          }
        })
        .catch((e) => {
          this.loading = false;
          this.showCapt();
        });
    },
    showCapt() {
      if(customConfig.LOGIN_TYPE==='ucapi'){
        this.capUrl =process.env.VUE_APP_BASE_API + "/edu/uc/login/captcha?uuid=" + this.loginForm.uuid+"&t="+Math.random().toString(16).substring(2, 30);
      }else{
        this.capUrl ="/uc/captchaLogin?v=" + Math.random().toString(16).substring(2, 30);
      }
    }
  }
};
</script>

<style scoped>
.login-bg {
  position: relative;
  background: url(~@/assets/img/login/bg.png) no-repeat top center #fff;
  background-size: 100% 100%;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
.login-name {
  padding-bottom: 20px;
  text-align: center;
  color: #fff;
  font-size: 26px;
  font-weight: 700;
}
.login-box {
  position: absolute;
  top: 50%;
  right: 8%;
  float: right;
  width: 360px;
  height: 360px;
  padding: 40px 20px;
  margin-top: -200px;
  border-radius: 5px;
  background: url(~@/assets/img/login/login-box.jpg) no-repeat center;
}
i.i-user,
i.i-pwd,
i.i-capt {
  position: absolute;
  left: 5px;
  top: 7px;
  height: 20px;
  width: 15px;
  display: block;
}
i.i-user {
  background: url(~@/assets/img/login/user.png) no-repeat center;
  background-size: 100%;
}
i.i-pwd {
  background: url(~@/assets/img/login/password.png) no-repeat center;
  background-size: 100%;
}
i.i-capt {
  background: url(~@/assets/img/login/vertify.png) no-repeat center;
  background-size: 100%;
}

.el-button {
  height: 34px;
  font-size: 14px;
  border-radius: 3px;
  margin-top: 20px;
  width: 100%;
  border: none;
  font-weight: 600;
}
.show-pwd {
  position: absolute;
  top: 0;
  right: 5px;
  cursor: pointer;
}
.input {
  height: 34px;
  line-height: 32px;
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding-left: 25px;
  background-color: rgb(232, 240, 254) !important;
}
.input::placeholder {
  color: #6585cb;
}
.input.capt {
  width: calc(100% - 90px);
  float: left;
}
img.captcha {
  float: right;
  display: block;
  width: 80px;
  height: 32px;
  cursor: pointer;
}
.lft-img {
  position: absolute;
  bottom: 5%;
  left: 8%;
  height: 90vh;
  width: 50vw;
  background: url(~@/assets/img/login/lftbg.png) no-repeat center;
  background-size: 100% 100%;
  overflow: hidden;
}
.lft-img > .line {
  position: absolute;
  height: 2px;
  width: 150px;
  background: url(~@/assets/img/login/line.png) no-repeat center;
  background-size: 100% 100%;
}
.lft-img > .line.line1 {
  left: 48%;
  bottom: 12%;
  width: 320px;
  transform: rotate(30deg);
}
.lft-img > i {
  display: block;
  position: absolute;
  left: 40%;
  top: 20px;
  height: 40px;
  width: 30px;
  background: url(~@/assets/img/login/lftbg-i.png) no-repeat center;
  background-size: 100% 100%;
  animation: upDown 3s infinite alternate;
  -webkit-animation: upDown 3s infinite alternate;
}
.lft-img > .lfti {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  background-repeat: no-repeat;
  background-position: 0 0;
  background-size: 100% 100%;
}
.lft-img > .lfti.iconlt {
  background-image: url(~@/assets/img/login/lftbg-1.png);
  animation: upDown 2s infinite alternate;
  -webkit-animation: upDown 2s infinite alternate;
}
.lft-img > .lfti.iconrt {
  background-image: url(~@/assets/img/login/lftbg-2.png);
  animation: upDown 2.5s infinite alternate;
  -webkit-animation: upDown 2s infinite alternate;
}
.lft-img > .lfti.iconlb {
  background-image: url(~@/assets/img/login/lftbg-3.png);
  animation: upDown 2.1s infinite alternate;
  -webkit-animation: upDown 2.1s infinite alternate;
}
.lft-img > .lfti.iconrb {
  background-image: url(~@/assets/img/login/lftbg-4.png);
  animation: upDown 2.5s infinite alternate;
  -webkit-animation: upDown 2.5s infinite alternate;
}
.adorn {
  position: absolute;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
  animation: adornExp 1s infinite alternate;
  -webkit-animation: adornExp 1s infinite alternate;
}
.adorn.ad-t {
  top: 0;
  left: 15%;
  width: 200px;
  height: 90px;
  background-image: url(~@/assets/img/login/t.png);
}
.adorn.ad-lb {
  left: 0;
  bottom: 5%;
  height: 220px;
  width: 50px;
  background-image: url(~@/assets/img/login/lb.png);
}

.adorn.ad-rb {
  right: 0;
  bottom: 0;
  height: 70px;
  width: 160px;
  background-image: url(~@/assets/img/login/rb.png);
}

/* aminate */
@-webkit-keyframes adornExp {
  from {
    transform: none;
  }
  to {
    transform: scale(1.1, 1.1);
  }
}
@keyframes adornExp {
  from {
    transform: none;
  }
  to {
    transform: scale(1.1, 1.1);
  }
}

/* up & down */
@-webkit-keyframes upDown {
  from {
    transform: none;
  }
  to {
    transform: translateY(15px);
  }
}
@keyframes upDown {
  from {
    transform: none;
  }
  to {
    transform: translateY(15px);
  }
}

/** rewrite */
.el-form-item--small.el-form-item {
  position: relative;
}
</style>
