<template>
  <view class="header">
    <swiper :indicator-dots="false" :autoplay="true" :interval="3000" :duration="1000">
      <view v-for="(item, index) of imgSrc" :key="index">
        <swiper-item>
          <view class="swiper-item ">
            <image :src='item'></image>
          </view>
        </swiper-item>
      </view>
    </swiper>
    <view class="button">
      <view class="left" @click="clickLeft(0)">
        <image :src='current == 0 ? "../../static/首页/lbw_tianchong.png" : "../../static/首页/lbw.png"' ></image>
        <view class="text">我来帮</view>
      </view>
      <view class="right" @click="clickLeft(1)">
        <image :src='current == 1 ? "../../static/首页/wlb_tianchong.png" : "../../static/首页/wlb.png"'></image>
        <view class="text">来帮我</view>
      </view>
    </view>
    
    <view class="module"  v-show="current == 0">
      <view class="box" :style="current == 0 ? 'color: #ee7b2b;': ''">
        <view class="item item1" @click="itemClick('a0')">
          <view class="bg">我帮取</view>
          <image src="../../static/首页/帮/3.3.png" mode=""></image>
        </view>
        <view class="item item2" @click="itemClick('a1')">
          <view class="bg">我帮送</view>
          <image src="../../static/首页/帮/1.3.png" mode=""></image>
        </view>
        <view class="item item3" @click="itemClick('a3')">
          <view class="bg">我帮买</view>
          <image src="../../static/首页/帮/2.3.png" mode=""></image>
        </view>
        <view class="item item4" @click="itemClick('a2')">
          <view class="bg">我帮做</view>
          <image src="../../static/首页/帮/4.3.png" mode=""></image>
        </view>
      </view>
    </view>
  
    <view class="module"  v-show="current == 1">
      <view class="box" :style="current == 1 ? 'color: #618bdf;': ''">
        <view class="item item1" @click="itemClick('b0')">
          <view class="bg">帮我取</view>
          <image src="../../static/首页/帮/3.4.png" mode=""></image>
        </view>
        <view class="item item2" @click="itemClick('b1')">
          <view class="bg">帮我送</view>
          <image src="../../static/首页/帮/1.4.png" mode=""></image>
        </view>
        <view class="item item3" @click="itemClick('b3')">
          <view class="bg">帮我买</view>
          <image src="../../static/首页/帮/2.4.png" mode=""></image>
        </view>
        <view class="item item4" @click="itemClick('b2')">
          <view class="bg">帮我做</view>
          <image src="../../static/首页/帮/4.4.png" mode=""></image>
        </view>
      </view>
    </view>
  
  </view>
</template>

<script>
  export default {
    data() {
      return {
        current: 0,
        "imgSrc": [
          '../../static/首页/轮播图/2.png',
          '../../static/首页/轮播图/3.png',
          '../../static/首页/轮播图/4.png'
        ],
        "bang": true,
        "icon": []
      }
    },
    onShow() {
      uni.showTabBar({
        animation: true
      })
    },
    methods: {
      clickLeft(current) {
        this.current = current
      },
    itemClick(type) {
      uni.navigateTo({
      	url: `../category/category?type=${type}`
      });
    }
    }
  }
</script>

<style>
  .header {
    width: 100%; 
    height: 1108rpx;
    background-color: #f2f2f2;
  }
  
  .header .swiper-item image{
    width: 100%;
    height: 350rpx;
  }
  
  .button {
    display: flex;
    justify-content: space-around;
    position: relative;
    top: -37rpx;
    width: 100%;
    height: 74rpx;
    box-sizing: border-box;
  }
  
  .button .left, 
  .button .right{
    display: flex;
    justify-content: center;
    padding-top: 10rpx;
    width: 225rpx;
    height: 74rpx;
    text-align: center;
    border-radius: 70rpx;
    background-color: #ffffff;
    box-sizing: border-box;
  }
  
  .button .left image ,
  .button .right image{
    width: 50rpx;
    height: 50rpx;
  }
  
  .button .left .text ,
  .button .right .text{
    line-height: 53rpx;
    margin-left: 10rpx;
    font-weight: 700;
  }
  
  .module {
    width: 100%;
    height: 100rpx;
  }
  
  .module .box {
    display: inline-block;
    display: flex;
    flex-wrap: wrap;
    padding: 75rpx;
    margin-top: -10rpx;
    width: 100%;
    height: 100%;
  }
  
  .module .box .item{
    position: relative;
    padding: 10rpx;
    width: 300rpx;
    height: 250rpx;
    box-sizing: border-box;
  }
  
  .module .box .item image {
    position: absolute;
    top: -14rpx;
    left: 67rpx;
    width: 140rpx;
    height: 140rpx;
  }
  
  .module .box .item .bg {
    position: absolute;
    top: 25rpx;
    width: 250rpx;
    height: 180rpx;
    text-align: center;
    line-height: 250rpx;
    /* color: #ee7b2b; */
    background-color: #fff;
  }

  .module .box .item3,
  .module .box .item4 {
    margin-top: 50rpx;
  }
  
  .module .box .item2,
  .module .box .item4 {
    margin-left: 40rpx;
  }
  
  .module .box .item1,
  .module .box .item3 {
    margin-left: -10rpx;
  }
  
</style>
