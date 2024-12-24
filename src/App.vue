<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',  // 该组件的名称
  methods:{  // 该组件的方法
    loadGet(){
      this.$axios.get('http://localhost:9090/list').then(res=>res.data).then(res=>{
        console.log(res)
      })
    },
    loadPost(){
      this.$axios.post('http://localhost:9090/save',{}).then(res=>res.data).then(res=>{
        console.log(res)
      })
    }
  },
}
</script>

<style>
#app {

}
</style>