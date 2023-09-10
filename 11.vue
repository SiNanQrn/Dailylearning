<template>
  <view class="container">
    <view class="btn">
      <view :data-id="item" v-for="item in list" @tap="bindToView">{{
        item
      }}</view>
    </view>

    <scroll-view
      class="scroller"
      :scroll-into-view="toView"
      scroll-y="true"
      scroll-with-animation="true"
    >
      <view :id="item" class="left" v-for="item in list">{{ item }}</view>
    </scroll-view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      list: ["薛之谦", "任然", "张靓颖", "周杰伦"],
      toView: "",
    };
  },
  methods: {
    bindToView(event) {
      var id = event.currentTarget.dataset.id;
      console.log(id);
      this.toView = id;
    },
  },
};
</script>

<style lang="scss">
.container {
  width: 100%;
  .btn {
    padding: 50px 0px;
    width: 100%;
    display: flex;
    justify-content: space-around;
  }
  scroll-view {
    height: 90vh;
    .left {
      font-size: 50rpx;
      line-height: 200rpx;
    }
  }
}
</style>
