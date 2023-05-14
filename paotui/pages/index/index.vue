<template>
	<view class="content">
		<image class="logo" src="../../static/img/common/logo.png"></image>
    <view class="login">
      <view class="username item">
        <image class="user-logo" src="../../static/img/common/zhanghao.png"></image>
        <input class="name"  type="text" placeholder="请输入账号" @change="changeUserName($event)">
      </view>
      
      <view class="username item">
        <image class="pwd-logo" src="../../static/img/common/mima.png"></image>
        <input class="name"  type="password" placeholder="请输入密码" @change="changePassword($event)">
      </view>
      
      <view class="login-btn">
        <u-button type="warning" shape="circle" text="登录" @click="login"></u-button>
      </view>
    </view>
    <view class="other-action">
      <view class="register">
        <navigator url="register/register" >注册</navigator>
      </view>
      
      <view class="forget">
        <navigator url="forget/forget">忘记密码</navigator>
      </view>
    </view>
  </view>
</template>

<script>

export default {
  data() {
    return {
      username : "",
      password : ""
    }
  },
  onShow() {
    uni.hideTabBar({
      animation: false
    })
  },
  methods: {
    changeUserName($event) {
      this.username = $event.detail.value
    },
    changePassword($event) {
      this.password = $event.detail.value
    },
    login() {
      // uni.redirectTo({
      // 	url: '../publish/publish'
      // });

      const username = this.username
      uni.request({
        url: 'http://127.0.0.1:50/api/login',
        method: 'POST',
        data: {
          'username': this.username,
          'password': this.password
        },
        success(res) {
          if (res.data.state == 200) {
            uni.setStorage({
                key:"username",
                data: username,
                success: function (){
                    console.log("存储成功")
                }
            })
            uni.setStorage({
                key:"money",
                data: res.data.result[0]['money'],
                success: function (){
                    console.log(res.data.result[0]['money'])
                }
            })

            uni.redirectTo({
              url: '../home/home'
            })
            
          } else {
            uni.showToast({
            	title: '账号或密码错误',
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
  
  .login .username .name {
    position: absolute;
    top: 13rpx;
    right: 10rpx;
  }
  
  .login .user-logo,
  .login .pwd-logo{
    position: absolute;
    top: 10rpx;
    left: 25rpx;
    width: 50rpx;
    height: 50rpx;

  }
  
  .other-action {
    display: flex;
    justify-content: space-between;
    width: 350rpx;
    padding: 30rpx 0rpx;
    color: #888888 ;
    
  }
  
</style>