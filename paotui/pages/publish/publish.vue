<template>
    <view class="publish">
        <view class="header">
          <uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" styleType="text" activeColor="#eb6100"></uni-segmented-control>
        </view>

        <view class="body">
          <view class="content">
              <view v-show="current === 0">
                  <view class="box">
                    <view class="title">发布信息订单：</view>
                    <view class="msg">
                      
                      <view class="time">
                        <view class="icon">
                          <image src="../../static/publish/place.png"></image>
                        </view>
                        <view class="t">类型:</view>
                        <view class="item">
                          <uni-data-select
                            v-model="value"
                            :localdata="range1"
                            @change="change1"
                          ></uni-data-select>
                        </view>
                      </view>
                      
                      <view class="time">
                        <view class="icon">
                          <image src="../../static/publish/time.png"></image>
                        </view>
                        <view class="t">时间:</view>
                        <view class="select">
                          <view class="example-body">
                          	<uni-datetime-picker
                              :clear-icon="false"
                              :border="false"  
                          		v-model="datetimerange"
                          		type="datetimerange"
                          		:start="start"
                          		:end="end"
                          		rangeSeparator="-"
                          	/>
                          </view>
                        </view>
                      </view>
                      
                      <view class="time">
                        <view class="icon">
                          <image src="../../static/publish/起点.png"></image>
                        </view>
                        <view class="t">起始:</view>
                        <view class="item">
                          <uni-data-select
                            v-model="startPlace"
                            :localdata="range3"
                            @change="change2"
                          ></uni-data-select>
                        </view>
                      </view>
                      
                      <view class="time">
                        <view class="icon">
                          <image src="../../static/publish/终点.png"></image>
                        </view>
                        <view class="t">终点:</view>
                        <view class="item">
                          <uni-data-select
                            v-model="endPlace"
                            :localdata="range3"
                            @change="change3"
                          ></uni-data-select>
                        </view>
                      </view>
                      
                      <view class="time">
                        <view class="icon">
                          <image src="../../static/publish/write.png"></image>
                        </view>
                        <view class="t">备注:</view>
                        <input type="text" class="item" placeholder="请备注" v-model="remark">
                      </view>
                      
                    </view>
                  </view>
                  
                  <view class="box2">
                    <view class="content">
                      <view class="title">预计收入</view>
                      <view class="price">1 活力币</view>
                      <button class="btn" @click="publishClick()">立即发布</button>
                    </view>
                  </view>
              
              
              </view>
              <view v-show="current === 1">
                  <view class="box">
                    <view class="title">发布信息订单：</view>
                    <view class="msg">
                      
                      <view class="time">
                        <view class="icon">
                          <image src="../../static/publish/place.png"></image>
                        </view>
                        <view class="t">类型:</view>
                        <view class="item">
                          <uni-data-select
                            v-model="value"
                            :localdata="range2"
                            @change="change1"
                          ></uni-data-select>
                        </view>
                      </view>
                      
                      <view class="time">
                        <view class="icon">
                          <image src="../../static/publish/time.png"></image>
                        </view>
                        <view class="t">时间:</view>
                        <view class="select">
                          <view class="example-body">
                          	<uni-datetime-picker
                              :clear-icon="false"
                              :border="false"  
                          		v-model="datetimerange"
                          		type="datetimerange"
                          		:start="start"
                          		:end="end"
                          		rangeSeparator="-"
                          	/>
                          </view>
                        </view>
                      </view>
                      
                      
                      <view class="time">
                        <view class="icon">
                          <image src="../../static/publish/起点.png"></image>
                        </view>
                        <view class="t">起始:</view>
                        <view class="item">
                          <uni-data-select
                            v-model="startPlace"
                            :localdata="range3"
                            @change="change2"
                          ></uni-data-select>
                        </view>
                      </view>
                      
                      <view class="time">
                        <view class="icon">
                          <image src="../../static/publish/终点.png"></image>
                        </view>
                        <view class="t">终点:</view>
                        <view class="item">
                          <uni-data-select
                            v-model="endPlace"
                            :localdata="range3"
                            @change="change3"
                          ></uni-data-select>
                        </view>
                      </view>
                      
                      
                      
                      <view class="time">
                        <view class="icon">
                          <image src="../../static/publish/write.png"></image>
                        </view>
                        <view class="t">备注:</view>
                        <input type="text" class="item" placeholder="请备注" v-model="remark"> 
                      </view>
                    </view>
                  </view>
                  
                  <view class="box2">
                    <view class="content">
                      <view class="title">预计使用</view>
                      <view class="price">1 活力币</view>
                      <button class="btn" style="background-color: #618bdf;" @click="publishClick()">立即发布</button>
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
        type: '',
        finishTime: '',
        place: '',
        remark: '',
        value: '',
        startPlace:'',
        endPlace:'',
        range1: [
          { value: 'a0', text: "帮取" },
          { value: 'a1', text: "帮送" },
          { value: 'a2', text: "帮做" },
          { value: 'a3', text: "帮买" },
        ],
        range2: [
          { value: 'b0', text: "帮取" },
          { value: 'b1', text: "帮送" },
          { value: 'b2', text: "帮做" },
          { value: 'b3', text: "帮买" },
        ],
        range3: [
          {value: '慧心园1幢', text: '慧心园1幢'},
          {value: '慧心园2幢', text: '慧心园2幢'},
          {value: '慧心园3幢', text: '慧心园3幢'},
          {value: '慧心园4幢', text: '慧心园4幢'},
          {value: '弘毅园1幢', text: '弘毅园1幢'},
          {value: '弘毅园2幢', text: '弘毅园2幢'},
          {value: '弘毅园3幢', text: '弘毅园3幢'},
          {value: '弘毅园4幢', text: '弘毅园4幢'},
          {value: '信息楼', text: '信息楼'},
          {value: '行政楼', text: '行政楼'},
          {value: '博雅楼', text: '博雅楼'},
          {value: '博识楼', text: '博识楼'},
          {value: '博园楼', text: '博园楼'},
          {value: '博知楼', text: '博知楼'},
          {value: '笃学楼', text: '笃学楼'},
          {value: '博文楼', text: '博文楼'},
          {value: '明德楼', text: '明德楼'},
          {value: '励志楼', text: '励志楼'},
          {value: '图书馆', text: '图书馆'},
          {value: '学生会堂', text: '学生会堂'},
          {value: '篮球场', text: '篮球场'},
          {value: '食堂', text: '食堂'},
          {value: '超市', text: '超市'},
        ],
        items: ['我来帮', '来帮我'],
        current: 0,
        start: '',
        end:'',
        range: ["2021-03-8", "2021-4-20"],
        datetimerange: ["2021-03-20 20:10:10", "2021-05-10 10:10:10"],
    };
  },
  onLoad() {
    this.getTime()
    uni.showTabBar()

  },
  watch: {
  	range(newval) {
  		console.log("范围选1:", this.range);
  	},
  	datetimerange(newval) {
      this.finishTime = this.datetimerange[0] + '-' + this.datetimerange[1] 
  		console.log("范围选2:", this.finishTime);
  	}
  },
  methods: {
    onClickItem(e) {
      if (this.current != e.currentIndex) {
        this.current = e.currentIndex;
      }
    },
    change(e) {
    	this.single = e;
    	console.log("-change事件:", e);
    },
    change1(e) {
          this.type = e
          console.log("e:", this.type);
        },
    change2(e) {
          this.startPlace = e
          console.log("起", this.startPlace);
        },
    change3(e) {
          this.endPlace = e
          console.log("终", this.endPlace);
        },
    publishClick() {
      var money = uni.getStorageSync('money')
      var username = ''
      var type = this.type
      var finishTime = this.finishTime
      var place = this.startPlace + '-' + this.endPlace
      var remark = this.remark
      var date = new Date()
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      var createTime = year + "-" +month
      if (money <=0 ) {
        uni.showToast({
        	title: '活力币不足无法发布',
        	icon: 'none',
        	duration: 2000
        }) 
        return
      }
      uni.getStorage({
          key:"username",
          success: (res)=>{
              username = res.data
              uni.request({
                  url: 'http://127.0.0.1:50/api/publish', 
                  method: "POST",
                  data: {
                      'username':username,
                      'type': type,
                      'createTime': createTime,
                      'finishTime': finishTime,
                      'price': '1',
                      'place': place,
                      'remark': remark,
                  },
                  success: (res) => {
                    if ((res.data.state == 200) && (this.type.indexOf('b') != -1 )) {
                      let money =uni.getStorageSync('money')
                      try {
                      	uni.setStorageSync('money', money-1);
                      } catch (e) {
                      	console.log(e)
                      }
                    }
                    uni.showToast({
                    	title: '发布成功',
                    	//将值设置为 success 或者直接不用写icon这个参数
                    	icon: 'success',
                    	//显示持续时间为 2秒
                    	duration: 2000
                    })
                    this.type = ''
                    this.finishTime = ''
                    this.place = ''
                    this.remark= ''
                    this.value = ''
                    console.log(res.data);
                  }
              });
          }
      })
      


    },
    getTime:function(){
    			var date = new Date(),
    			year = date.getFullYear(),
    			month = date.getMonth() + 1,
    			day = date.getDate(),
    			day7 = date.getDate()+7,
    			hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(),
    			minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(),
    			second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    			month >= 1 && month <= 9 ? (month = "0" + month) : "";
    			day >= 0 && day <= 9 ? (day = "0" + day) : "";
    			var nowtimer = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
    			var aftertimer = year + '-' + month + '-' + day7 + ' ' + hour + ':' + minute + ':' + second;
          this.start = nowtimer
          this.end = aftertimer
          this.datetimerange[0] = this.start
          this.datetimerange[1] = this.end
    		},

        
  }
};
</script>

<style>
  .uni-date-x {
    height: 50rpx;
  } 
  
  .uni-icons {
    opacity: 0;
  }
  .example-body {
    width: 450rpx;
  }
  
  .publish {
    height: 1120rpx;
    background-color:#f2f2f2;
  }
  
  .header {
    background-color: #f2f2f2;
  }
  
  .box {
    padding: 50rpx;
  }
  
  .box image{
    width: 40rpx;
    height: 40rpx;
  }
  
  .box .title {
    padding: 20rpx;
    width: 35%;
    border-radius: 20rpx 20rpx 0 0;
    background-color: #fff;
  }
  
  .box .msg {
    padding: 20rpx;
    background-color: #fff;
    border-radius: 0 20rpx 20rpx 20rpx;
  }
  
  .box .msg .time {
    display: flex;
    margin-bottom: 30rpx;
    justify-content: space-between;
    align-items: center;
  }
  
  .box .msg .time .item {
    padding-left: 80rpx;
    width: 450rpx;
    box-sizing: border-box;
  }
  

  .box2 {
    margin-top: -20rpx;
    padding: 50rpx;
  }
  
  .box2 .content {
    padding-bottom: 50rpx;
    text-align: center;
    border-radius: 20rpx;
    background-color: #fff;
  } 
  
  .box2 .content .title{
    padding: 10rpx 0;
    font-size: 50rpx;
    font-weight: 700;
  }
  
  .box2 .content .price {
    color: #eb6100;
    padding: 10rpx 0;
  }
  
  .box2 .content .btn {
    margin-top: 20rpx;
    height: 80rpx;
    line-height: 80rpx;
    width: 60%;
    color: #fff;
    background-color: #eb6100;
    border-radius: 50rpx;
  }
  
  .box3 {
    padding: 50rpx;
  }
  
  
  .box3 .content .item image {
    display: inline-block;
    width: 100rpx;
    height: 100rpx;
  }
  
  .box3 .content {
    display: flex;
    /* width: 970rpx; */
    justify-content: space-between;
  }
  
  
</style>