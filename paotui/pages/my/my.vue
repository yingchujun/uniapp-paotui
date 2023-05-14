<template>
  <view class="personal">
    <view class="header">
      <view class="avatar">
        <image src="../../static/头像/0.jpg" mode=""></image>
      </view>
      <view class="information">
        <view class="name">{{ username }}</view>
        <view class="name">活力币余额：{{ money }}</view>
      </view>
    </view>
    
    <view class="box">
      <view class="advice">
        
        <view class="title">
          <view class="icon">!</view>
          <view class="text">意见反馈与投诉</view>
        </view>
        
        <view class="orderId">
          <view class="item">输入您要投诉的订单号</view>
          <input type="text" placeholder="请填写..." v-model="orderid">
        </view>
        
        <view class="question">
          <view class="item">问题描述</view>
          <textarea placeholder="请填写..." v-model="question"></textarea> 
        </view>
        
        <view class="upload">
          <view class="item">上传凭证</view>
            <image src="../../static/personal/相册.png" @click="pictureClick"></image>
            <image :src="imgUrl"></image>
        </view>
        
        <view class="contact">
          <view class="item">联系方式</view>
          <input type="text" placeholder="请填写您的电话..." v-model="phone">
        </view>
        
        <view class="btn">
          <button type="promise" @click="submit">提交反馈</button>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        orderid: '',
        question: '',
        img: '',
        phone: '',
        imgUrl:"",
        money: 0,
        username: ''
      }
    },
    onTabItemTap: function (item) { 
        this.username = uni.getStorageSync("username")
        this.money = uni.getStorageSync("money")
        console.log('this.money', this.money )
    },
    methods: {
      submit() {
        let username = uni.getStorageSync('username') || '123465'
        uni.uploadFile({
          url: 'http://127.0.0.1:50/api/question', //仅为示例，非真实的接口地址
          filePath: this.imgUrl,
          name: 'img',
          formData: {
            username,
            orderid : this.orderid,
            question : this.question,
            phone: this.phone
          },
          success: (uploadFileRes) => {
            console.log(uploadFileRes.data);
            uni.showToast({
            	title: '反馈成功',
            	duration: 2000
            });
            this.orderid = ''
            this.question = ''
            this.img = ''
            this.phone = ''
            this.imgUrl = ''
          }
        });
        console.log(this.orderid)
      },
      pictureClick () {
          // 从相册选择1张图
          let that = this
          uni.chooseImage({
          	count: 1,
          	sizeType: ['original', 'compressed'],//original 原图，compressed 压缩图
          	sourceType: ['album'],//album 从相册选图
          	success:(res) => {
              this.imgUrl = res.tempFilePaths[0]
              console.log(this.imgUrl)
          	}
          });
      }
    }
  }
</script>

<style>
  
  input {
    padding-left: 16rpx;
    height: 55rpx;
    font-size: 25rpx;
    background-color: #f2f2f2;
    border-radius: 10rpx;
  }
  
  textarea {
    padding:6rpx 16rpx ;
    height: 200rpx;
    font-size: 25rpx;
    background-color: #f2f2f2;
    border-radius: 10rpx;
  }
  
  .item {
    margin: 20rpx 0;
    font-size: 30rpx;
  }
  
  .personal {
    overflow-x: hidden;
    padding: 50rpx 30rpx;
    height: 1010rpx;
    background-color: #f2f2f2;
  }
  
  .header {
    display: flex;
    align-items: center;
    padding: 0rpx 20rpx;
    width: 100%;
    height: 200rpx;
    box-sizing: border-box;
    border-radius: 20rpx;
    background-color: #f6dfbf;
  }
  
  .header .avatar {
    margin-right: 40rpx;
    width: 150rpx;
    height: 150rpx;
    border-radius: 75rpx;
    overflow: hidden;
  }
  
  .header .avatar image {
    width: 100%;
    height: 100%;
  }
  
  .box {
    margin-top: 50rpx;
    width: 100%;
    border-radius: 20rpx;
    background-color: #fff;
  }
  
  .box .advice {
    padding: 30rpx 30rpx;
    box-sizing: border-box;
  }
  
  .advice .title {
    display: flex;
    align-items: center;
    padding-bottom: 20rpx;
    border-bottom: 4rpx solid #f2f2f2;
  }
  
  .advice .title .icon {
    margin-right: 50rpx;
    width: 50rpx;
    height: 50rpx;
    line-height: 50rpx;
    text-align: center;
    color: #e91348;
    border: 1rpx solid #e91348 ;
    border-radius: 50rpx;
  }
  
  .upload image {
    width: 200rpx;
    height: 200rpx;
  }
  
  .advice .contact {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .advice .btn {
    margin: 40rpx 0;
  }
</style>
