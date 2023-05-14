<template>
	<view class="content">
		<image class="logo" src="../../../../static/img/common/logo.png"></image>
    <view class="login">
      <view class="username item" >
        <image class="user-logo" src="../../../../static/img/common/mima.png"></image>
        <input class="name"  type="text" placeholder="请输入新密码" @change="changePassword">
      </view>
      
      <view class="username item" >
        <image class="user-logo" src="../../../../static/img/common/mima.png"></image>
        <input class="name"  type="password" placeholder="请再次输入新密码" @change="changePassword2">
      </view>
      
      
      <view class="login-btn">
        <u-button type="warning" shape="circle" text="重置密码" @click="forget"></u-button>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      newPassword : "",
      newPassword2 : "",
      username: ''
    }
  },
  onLoad(options) {
    this.username = options.id
    console.log(this.username)
  },
  methods: {
    changePassword($event) {
      this.newPassword = $event.detail.value
    },
    changePassword2($event) {
      this.newPassword2 = $event.detail.value
    },
    forget() {
      console.log(this.newPassword, this.newPassword2)
      let username = this.username
      let newPassword = this.newPassword
      let newPassword2 = this.newPassword2
      if (newPassword != newPassword2) {
        uni.showToast({
          title: "俩次密码不一致",
          icon: 'none',
          duration: 2000
        })
      } else {
        console.log("俩次密码一致")
        uni.request({
          url: 'http://127.0.0.1:50/api/forget',
          method: 'POST',
          data: {
            'username': username,
            'password': newPassword
          },
          success(res) {
            console.log("data", res.data)
            if (res.data.state == 200) {
              console.log("修改成功")
              uni.showToast({
              	title: '修改成功,跳转登录页面',
              	icon: 'none',
              	duration: 2000
              })
              setTimeout(function() {
                uni.navigateBack()
              }, 3000)
            } 
          }
        })
      }
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
