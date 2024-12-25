<template>
  <div>
    <span>This is AdminHome</span>
    <h1>我是标题</h1>
    <h2>我是小标题</h2>
    <button @click="sayHello">我是一个按钮</button>
  </div>
</template>

<script>
export default{
  name: "AdminHomeComponent",
  data(){

  },
  methods:{
    sayHello(){
      alert("You are a pig")
    }
  }
}
</script>

<style scoped>

</style>