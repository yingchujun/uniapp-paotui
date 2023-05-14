<template>
  <view class="category">
    
      <view class="content">
        <view v-if="infos.length == 0">
          <img src="../../static/dingdan/wu.png" alt="">
          <view class="noinfos">暂无订单</view>
        </view>
        <view v-for="(item, index) of infos" :key="index">
          <view class="item">
            <view class="avatar">
              <image src="../../static/头像/6.jpg" mode=""></image>
            </view>
            <view class="message">
              <view class="title">
                <view class="item1">
                  <view class="type">{{ type[item.type] }}</view>
                  <view class="pubilsh-time">{{ item.username.slice(0, 6) }}</view>
                </view>
                <view class="isTrue">{{ item.createTime}}</view>
              </view>
              <view class="body">
                <view class="left">
                  <view class="task-time item2">时间：{{ item.finishTime}} </view>
                  <view class="place item2">地点：{{ item.place}}</view>
                </view>
                <view class="right" :style="item.type.slice(0,1) == 'a' ? 'background-color:#eb6100' : 'background-color:#618bdf'" @click="checkout(item.orderID, item.username)">
                  {{ item.whoreceive == username ? '已接取' : '接取'}}
                </view>
              </view>
            </view>
          </view> 
        </view>
      </view>

  </view>
</template>

<script>
  export default {
    data() {
      return {
        username: '',
        type : '' ,
        infos: []
      }
    },
    methods: {
      checkout(orderid, whopublish) {
        let username = uni.getStorageSync('username')
        console.log(username, 'whopublish', whopublish)
        if (username == whopublish ) {
          uni.showToast({
          	title: '无法接取自己的任务',
          	icon: 'none',
          	duration: 2000
          }) 
          return 
        }
        uni.showModal({
        	content: '是否接取该任务',
        	success:(res) =>{
        		if (res.confirm) {
        			uni.request({
                url: `http://127.0.0.1:50/api/checkout?username=${this.username}&orderid=${orderid}` ,
                method: 'GET',
                success(res) {
                  if (res.data.code == 1) {
                    uni.showToast({
                    	title: res.data.msg,
                    	duration: 2000
                    });
                    setTimeout(function(){
                      uni.redirectTo({
                      	url: '../home/home'
                      });
                    }, 2000)
                  }

                }
              })
        		} 
        	}
        });
      }
    },
  		onLoad() {
        console.log("sdadsad")
        let username = uni.getStorageSync('username') || 'sadasdsd'
        this.username = username
        console.log(this.username)
        let querryType = {
          'a0':"我帮取" ,
          'a1':"我帮送" ,
          'a2':"我帮做" ,
          'a3':"我帮买" ,
          'b0':"帮我取" ,
          'b1':"帮我送" ,
          'b2':"帮我做" ,
          'b3':"帮我买" ,
        }
        let type = getCurrentPages()[1]['options']['type']
        console.log(type)
        this.type = type
  			uni.setNavigationBarTitle({
  				title: querryType[type]
  			})
        
        uni.request({
          url: `http://127.0.0.1:50/api/order?type=${type}`,
          method: "GET",
          success: (res) => {
            this.infos = res.data.result
            console.log(this.infos)
          }
        })
  		}
  }
</script>

<style>
  
  .noinfos {
    color:#c3c3c3;
    width: 100%;
    text-align: center;
  }

  .content {
    position: absolute;
    margin-top: 40rpx;
    padding: 0 60rpx ;
    width: 100%;
    box-sizing: border-box;
  }
  
  .content .item {
    display: flex;
    padding: 20rpx 30rpx;
    margin-bottom: 40rpx;
    width: 100%;
    height: 260rpx;
    background-color: #f2f2f2;
    overflow: hidden;
    border-radius: 20rpx;
    box-sizing: border-box;
  }
  
  
  .content .item .avatar, 
  .content .item .avatar image{
    margin-right: 20rpx;
    width: 80rpx;
    height: 80rpx;
    border-radius: 50rpx;
  }
  
  .content .item .message .title{
    display: flex;
    justify-content: space-between;
  }
  
  .content .item .message .title .item1 .pubilsh-time {
    line-height: 90rpx;
    font-size: 30rpx;
  }
  
  .content .item .message .title .isTrue {
    padding: 0 15rpx;
    height: 62rpx;
    font-size: 20rpx;
    color: #94908a;
    line-height: 90rpx;
    align-items: center;
    border-radius: 20rpx;
    background-color: #f2f2f2;
  }
  
  .content .item .message .item2 {
    width: 360rpx;
    margin-top: 10rpx;
    font-size: 26rpx;
    display: inline-block;
  }
  
  /* .content .item .message .title .body . */
  
  .content .item .message .body {
    margin-top: 20rpx;
    margin-left: -95rpx;
    display: flex;
  }
  
  .content .item .message .body .right {
    margin-top: 40rpx;
    padding: 0 20rpx;
    line-height: 60rpx;
    text-align: center;
    width: 164rpx;
    height: 66rpx;
    color: #fff;
    border-radius: 32rpx;
  }
  
</style>
