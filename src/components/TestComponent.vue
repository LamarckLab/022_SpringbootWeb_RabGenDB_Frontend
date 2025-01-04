<template>
  <div>
    <el-carousel>
      <el-carousel-item v-for="item in imgwrap" :key="item.url">
        <img :src="item.url"/>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
export default {
  data() {
    return {
      imgwrap: [
        {url: require("../assets/images/home.png")},
        {url: require("../assets/images/home.png")},
        {url: require("../assets/images/home.png")},
        {url: require("../assets/images/home.png")},
        {url: require("../assets/images/home.png")},
        {url: require("../assets/images/home.png")},
      ]
    }
  }
}
</script>
<style>
.el-carousel-item img {
  width: 100%;
  height: 100%;
}
</style>
