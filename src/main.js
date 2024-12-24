// 引入Vue核心库
import Vue from 'vue'

// 引入根组件
import App from './App.vue'

// 引入了Element UI组件库
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 引入路由表
import VueRouter from "vue-router";
import router from './router';

// 引入Axios
import axios from "axios";
Vue.prototype.$axios=axios;

// 关闭生产环境的提示
Vue.config.productionTip = false

// 注册Element UI组件库到Vue实例中，使得整个项目都可以使用 Element UI 的组件
Vue.use(ElementUI);

Vue.use(VueRouter);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
