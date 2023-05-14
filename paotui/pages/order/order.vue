<template>
    <view class="order">
      <view class="header">
        <uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" styleType="text" activeColor="#eb6100"></uni-segmented-control>
      </view>
      
      <view class="content">
          <view v-show="current === 0">
            <view v-if="infos.length == 0">
              <img src="../../static/dingdan/wu.png" alt="">
              <view class="noinfos">暂无订单</view>
            </view>
            <view v-for="(item, index) of infos" :key="index">
              <view class="item" :style="item.type.slice(0,1) == 'a' ? 'background-color:#f6debf' : 'background-color:#d2dbee'">
                <view class="avatar">
                  <image src="../../static/头像/6.jpg" mode=""></image>
                </view>
                <view class="message">
                  <view class="title">
                    <view class="item1">
                      <view class="type">{{ type[item.type] }}</view>
                      <view class="pubilsh-time">1-15 12:34</view>
                    </view>
                    <!-- <view class="isTrue">{{ item.istrue ? '已完成': '未完成' }}</view> -->
                  </view>
                  <view class="task-time item2">时间：{{ item.finishTime}} </view>
                  <view class="place item2">起：{{ item.place.split('-')[0]}}</view>
                  <view class="place item2">终：{{ item.place.split('-')[1]}}</view>
                  <view class="orderID item2"  @click="copy(item.orderID)">订单号：{{ item.orderID }}</view>
                  <view class="tips">
                    <view class="text" >{{ item.istrue ? item.isfinish ? '订单已完成': '订单已完成，待确认' : '信息已发布，等待被下单' }}</view>
                    <view class="price">活力币 +1</view>
                  </view>
                </view>
              </view> 
            </view>
          </view> 
          <view v-show="current === 1">
            <view v-if="infos.length == 0">
              <img src="../../static/dingdan/wu.png" alt="">
              <view class="noinfos">暂无订单</view>
            </view>
              <view v-for="(item, index) of infos" :key="index">
                <view class="item" :style="item.type.slice(0,1) == 'a' ? 'background-color:#f6debf' : 'background-color:#d2dbee'" style="height: 450rpx;">
                  <view class="avatar">
                    <image src="../../static/头像/6.jpg" mode=""></image>
                  </view>
                  <view class="message">
                    <view class="title">
                      <view class="item1">
                        <view class="type">{{ type[item.type] }}</view>
                        <view class="pubilsh-time">1-15 12:34</view>
                      </view>
                      <view class="isTrue">{{ item.istrue ? '已完成': '未完成' }}</view>
                    </view>
                    <view class="task-time item2">时间：{{ item.finishTime}} </view>
                  <view class="place item2">起：{{ item.place.split('-')[0]}}</view>
                  <view class="place item2">终：{{ item.place.split('-')[1]}}</view>
                    <view class="orderID item2"  @click="copy(item.orderID)">订单号：{{ item.orderID }}</view>
                    <view class="tips">
                      <view class="text">{{ item.istrue ? item.isfinish ? '订单已完成': '订单已完成，待确认' : '信息已发布，等待被下单' }}</view>
                      <view class="price" style="color: #fff; background-color: #d9001b;" @click="isfinish(item.istrue, item.isfinish,item.orderID, item.whoreceive, item.username, item.type)">{{ item.isfinish ? '已完成' : "确认完成" }}</view>
                    </view>
                    <view class="huoli">活力币+1</view>
                  </view>
                </view> 
              </view>
          </view> 
          <view v-show="current === 2">
            <view v-if="infos.length == 0">
              <img src="../../static/dingdan/wu.png" alt="">
              <view class="noinfos">暂无订单</view>
            </view>
              <view v-for="(item, index) of infos" :key="index">
                <view class="item" :style="item.type.slice(0,1) == 'a' ? 'background-color:#f6debf' : 'background-color:#d2dbee'">
                  <view class="avatar">
                    <image src="../../static/头像/6.jpg" mode=""></image>
                  </view>
                  <view class="message">
                    <view class="title">
                      <view class="item1">
                        <view class="type">{{ type[item.type] }}</view>
                        <view class="pubilsh-time">1-15 12:34</view>
                      </view>
                      <view class="isTrue" @click="istrue(item.istrue, item.orderID, item.whoreceive, item.username, item.type)">{{ item.istrue ? '已完成': '未完成' }}</view>
                    </view>
                    <view class="task-time item2">时间：{{ item.finishTime}} </view>
                  <view class="place item2">起：{{ item.place.split('-')[0]}}</view>
                  <view class="place item2">终：{{ item.place.split('-')[1]}}</view>
                    <view class="orderID item2"  @click="copy(item.orderID)">订单号：{{ item.orderID }}</view>
                    <view class="tips">
                      <view class="text">{{ item.istrue ? item.isfinish ? '订单已完成': '订单已完成，待确认' : '信息已发布，等待被下单' }}</view>
                      <view class="price">活力币 +1</view>
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
        items: ['全部订单', '我发布的', '我接受的'],
        current: 0,
        infos: [],
        type: {
          'a0':"我帮取" ,
          'a1':"我帮送" ,
          'a2':"我帮做" ,
          'a3':"我帮买" ,
          'b0':"帮我取" ,
          'b1':"帮我送" ,
          'b2':"帮我做" ,
          'b3':"帮我买" ,
        },
    };
  },
  onLoad() {
    uni.showTabBar()
    uni.request({
      url: 'http://127.0.0.1:50/api/order?type=all',
      method: "GET",
      success: (res) => {
        this.infos = res.data.result
        console.log(this.infos)
      }
    })
  },
  methods: {
    isfinish(isTrue, isFinish ,orderid, whoreceive, username, type){
      let money = uni.getStorageSync('money')
      uni.request({
        url: `http://127.0.0.1:50/api/istrue?istrue=1&isfinish=1&orderid=${orderid}&whoreceive=${whoreceive}&username=${username}&money=${money}&type=${type}`,
        method: "GET",
        success(res) {
          console.log('接单的确认')
          if (type.indexOf('a') != -1) {
              money = Number(money) - 1
          } else if (type.indexOf('b') != -1) {
              money = Number(money) + 1
          }
          uni.setStorage({
              key:"money",
              data: money ,
              success: function (){
                  console.log("wangcheng" , money )
              }
          })
          uni.redirectTo({
              url: '../order/order'
          });
          console.log(res.data)
        }
      })
    },
    istrue(isTrue, orderid, whoreceive, username, type) {
      console.log('orderid',orderid)
      if (!isTrue) {
        let money = uni.getStorageSync('money')
        uni.showModal({
        	content: '是否完成',
        	success: function (res) {
        		if (res.confirm) {
              uni.request({
                url: `http://127.0.0.1:50/api/istrue?istrue=1&isfinish=0&orderid=${orderid}&whoreceive=${whoreceive}&username=${username}&money=${money}&type=${type}`,
                method: "GET",
                success(res) {
                  console.log('接单的确认')
                  // if (type.indexOf('a') != -1) {
                  //     money = Number(money) - 1
                  // } else if (type.indexOf('b') != -1) {
                  //     money = Number(money) + 1
                  // }
                  // uni.setStorage({
                  //     key:"money",
                  //     data: money ,
                  //     success: function (){
                  //         console.log("wangcheng" , money )
                  //     }
                  // })
                  // uni.redirectTo({
                  //     url: '../order/order'
                  // });
                  // console.log(res.data)
                }
              })
        			console.log('用户点击确定');
        		} 
        	}
        });
      }
      console.log(isTrue)
    },
    copy(id) {
      console.log("sads")
      uni.setClipboardData({
        showToast: true,
      	data: id,
      	success: function () {
      		console.log('success');
      	}
      });
    },
    onClickItem(e) {
      if (this.current != e.currentIndex) {
        this.current = e.currentIndex;
        if (this.current == 1) {
          uni.getStorage({
          	key:'username',   // 储存在本地的变量名
          	success:res => {    // 成功后的回调
              uni.request({
                url: `http://127.0.0.1:50/api/order?username=${res.data}`,
                method: 'GET',
                success: (res) => {
                  this.infos = res.data.result
                }
              })
          	}
          })

        } else if (this.current == 0) {
          uni.request({
            url: 'http://127.0.0.1:50/api/order?type=all',
            method: "GET",
            success: (res) => {
              this.infos = res.data.result
            }
          })
        } else if (this.current == 2) {
          uni.getStorage({
          	key:'username',   // 储存在本地的变量名
          	success:res => {    // 成功后的回调
              uni.request({
                url: `http://127.0.0.1:50/api/order?whoreceive=${res.data}`,
                method: 'GET',
                success: (res) => {
                  this.infos = res.data.result
                  console.log("2")
                }
              })
          	}
          })
        }
        
      }
    }
  }
};
</script>

<style>  

  
  .noinfos {
    color:#c3c3c3;
    width: 100%;
    text-align: center;
  }
  
  .order {
    overflow-y: hidden;
    overflow-x: hidden;
  }
  
  .header {
    position: fixed;
    z-index: 99999;
    width: 100%;
    background-color: #f2f2f2;
  }
  
  .content {
    position: absolute;
    padding: 0 60rpx ;
    margin-top: 120rpx;
    width: 100%;
    box-sizing: border-box;
  }

  .content .item {
    display: flex;
    padding: 20rpx 30rpx;
    margin-bottom: 40rpx;
    width: 100%;
    height: 380rpx;
    overflow: hidden;
    /* background-color: #f6debf; */
    border-radius: 20rpx;
    box-sizing: border-box;
  }

  
  .content .item .avatar, 
  .content .item .avatar image{
    margin-right: 20rpx;
    width: 100rpx;
    height: 100rpx;
    border-radius: 50rpx;
  }
  
  .content .item .message .title{
    display: flex;
    justify-content: space-between;
  }
  
  .content .item .message .title .item1 .pubilsh-time {
    font-size: 20rpx;
    color: #94908a;
  }
  
  .content .item .message .title .isTrue {
    padding: 0 15rpx;
    height: 62rpx;
    line-height: 62rpx;
    align-items: center;
    border-radius: 20rpx;
    background-color: #f2f2f2;
  }
  
  .content .item .message .item2 {
    width: 360rpx;
    margin-top: 10rpx;
    font-size: 26rpx;
    display: inline-block;
    white-space: nowrap; 
    overflow: hidden;
    text-overflow:ellipsis;
  }
  
  .content .item .message .tips {
    display: flex;
    justify-content: space-between;
    margin-top: 15rpx;
    font-size: 26rpx;
  }
  
  .content .item .message .tips .text {
    margin-right: 10rpx;  
    color: #eb6100;
  }
  
  .content .item .message .tips .price ,
  .huoli{
    padding: 0 10rpx;
    height: 50rpx;
    line-height: 50rpx;
    color: #d9001b;
    background-color: #efa696;
    box-sizing: border-box;
    border-radius: 10rpx;
  }
  
  .huoli {
    margin-top: 20rpx;
    display: inline-block;
    float: right;
    font-size: 25rpx;
  }
</style>