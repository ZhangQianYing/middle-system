<template>
  <div class="login-container pull-height">
    <div class="login-info text-white animated fadeInLeft">
      <!-- <div class="logo" style="margin-top:-426px">
          <img src="../../assets/images/home/logo.png" width="160px" height="160px" alt="logo" style="vertical-align: middle;" />
      </div> -->
      <h2 class="login-info-title">{{$global.title.info.title}}</h2>
      <ul class="login-info-list">
        <li class="login-info-item" v-for="(item,index) of $global.title.info.list" :key="index">
          <i class="el-icon-check"></i>&nbsp;{{item}}
        </li>
      </ul>
    </div>
    <div class="login-border  animated fadeInRight">
      <div class="login-main">
        <h4 class="login-title">登录{{$global.title.title}}
        </h4>
        <el-tabs v-model="activeName">
          <el-tab-pane label="用户密码" name="user">
            <userLogin @loginUp='loginUp'></userLogin>
          </el-tab-pane>
          <el-tab-pane label="短信验证码" name="code">
            <codeLogin @loginUp='loginUp'></codeLogin>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>

  </div>
</template>
<script>
import userLogin from './userlogin'
import codeLogin from './codelogin'
import axios from '../../utils/axios'
import lib from '../../utils/lib'
export default {
  	name: 'login',
  	components: {
    	userLogin,
    	codeLogin
  	},
  	data() {
    	return {
      		activeName: 'user'
    	}
  	},
  	created() {
		axios.ajax({ // 检测登录状态
			url: '/auth/token/check',
			success: res => {
				if(res.data.is_valid) {
					this.$router.push('/')
				}
			}
		})
	},
  	mounted() {},
  	computed: {
    
  	},
  	props: [],
  	methods: {
	  	loginUp(item,code) {
			axios.ajax({
				url: '/auth/token/get',
				data: item,
				success: res => {
					if(res.status === 0) {
						this.$notify({
							title: '提示',
							message: res.msg,
							type: 'success'
						});
						this.$cookies.set(lib.name, res.data.access_token) 
						setTimeout(() => { this.$router.push({ path: '/'}) },500)
						axios.ajax({
							type: 'POST',
							url: '/auth/user',
							success: res => {
								localStorage.setItem(lib.name, JSON.stringify(res.data));
							}
						})
					} else {
						this.$notify({
							title: '提示',
							message: res.msg,
							type: 'error'
						});
					}
				}
			}) 
	  	},
  	}
}
</script>

<style lang="scss">
.login-container {
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: rgba(0, 0, 0, 0.2);
  position: relative;
  height: 100%;
  width: 100%;
}
.login-container::before {
  z-index: -999;
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-image: url("https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588824475307&di=f16854df42228c7be86a38155663c119&imgtype=0&src=http%3A%2F%2Fb2-q.mafengwo.net%2Fs5%2FM00%2F91%2F06%2FwKgB3FH_RVuATULaAAH7UzpKp6043.jpeg");
  background-size: cover;
}
.login-info {
  	padding-left: 60px;
}
.login-info-title {
	color: #fff;
  	line-height: 90px;
}
.login-info-item {
	color: #fff;
  font-size: 14px;
}
.login-border {
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 30px 50px 25px 50px;
  background-color: #fff;
  border-radius: 6px;
  box-shadow: 1px 1px 2px #eee;
}
.login-main {
  border-radius: 3px;
  box-sizing: border-box;
  background-color: #fff;
}
.login-main > h3 {
  margin-bottom: 20px;
}
.login-main > p {
  color: #76838f;
}
.login-title {
  margin: 0 0 20px;
  text-align: center;
  color: #409eff;
  letter-spacing: 3px;
}
.login-submit {
  margin-top: 20px;
  width: 100%;
  border-radius: 28px;
}
.login-form {
  margin: 10px 0;
  .el-form-item__content {
    width: 270px;
  }
  .el-input {
    input {
      text-indent: 5px;
      border-color: #dcdcdc;
      border-radius: 3px;
    }
    .el-input__prefix {
      i {
        padding: 0 5px;
        font-size: 16px !important;
      }
    }
  }
}
.login-code {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 0 0 0 10px;
}
.login-code-img {
  margin-top: 2px;
  width: 100px;
  height: 32px;
  background-color: #fdfdfd;
  border: 1px solid #f0f0f0;
  color: #333;
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 5px;
  line-height: 32px;
  text-indent: 5px;
  text-align: center;
}
</style>