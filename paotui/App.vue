<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "uview-ui/index.scss";
  //第一种

  scroll-view ::-webkit-scrollbar {  

      display: none !important;  

      width: 0 !important;  

      height: 0 !important;  

      -webkit-appearance: none;  

      background: transparent;  

  }

  //第二种

  ::-webkit-scrollbar{

    display: none;

  }
</style>
