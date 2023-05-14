<template>
	<view class="content">
		<image class="logo" src="../../../static/img/common/logo.png"></image>
    <view class="login">
      <view class="username item" >
        <image class="user-logo" src="../../../static/img/common/zhanghao.png"></image>
        <input class="name"  type="text" placeholder="请输入您的邮箱" @change="changeUserName">
      </view>
    
      
      <view class="email item">
        <image class="pwd-logo" src="../../../static/zhuce/yanzhengma.png"></image>
        <input class="name"  type="text" placeholder="请输入验证码" @change="changeCode">
        <view class="get-code" @click="getCode">
          获取验证码
        </view>
      </view>
      
      
      <view class="login-btn">
        <u-button type="warning" shape="circle" text="下一步" @click="next1"></u-button>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      username : "",
      code : '',
    }
  },
  methods: {
    changeUserName($event) {
      this.username = $event.detail.value
    },
    changeCode($event) {
      this.code = $event.detail.value
    },
    getCode(){
      console.log("获取验证码中......")
      let username = this.username
      let code = this.code
      console.log(username)
      uni.request({
        url: "http://127.0.0.1:50/api/forgetcode",
        method: 'POST',
        data: {
          'username': username,
          'code': code
        }
      })
    },
    next1() { 
      const username = this.username
      const code = this.code
      // uni.redirectTo({url: "../forget/reset/reset?id=" + username})
      uni.request({
        url: "http://127.0.0.1:50/api/verify",
        method: 'POST',
        data: {
          "username": username,
          "code": code
        },
        success(res) {
          console.log(res.data)
          if (res.data.state == 200) {
            uni.redirectTo({url: "../forget/reset/reset?id=" + username})
          } else {
            uni.showToast({
            	title: res.data.msg,
            	icon: 'none',
            	duration: 2000
            })
          }
        }
      })
    }
  }
};
</script>
<style>

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
  
  .logo {
    width: 200rpx;
  	height: 200rpx;
  	margin-top: 200rpx;
  	margin-left: auto;
  	margin-right: auto;
  	margin-bottom: 50rpx;
  }
  
  .login .item {
    position: relative;
    width: 450rpx;
    height: 70rpx;
    margin-bottom: 45rpx;
    border-radius: 35rpx;
    background-color: #f2f2f2;
  }
  
  .login .item .name {
    position: absolute;
    top: 13rpx;
    right: 10rpx;
  }
  
  .login .email .get-code {
    z-index: 99999;
    position: relative;
    top: 18rpx;
    left: 310rpx;
    font-size: 25rpx;
    color: #35dfc3;
  }
  
  .login .user-logo,
  .login .pwd-logo{
    position: absolute;
    top: 10rpx;
    left: 25rpx;
    width: 50rpx;
    height: 50rpx;

  }
  
</style>
