import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './locale'
import filters from './filters'

// 引入ele-ui
import Element  from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Toast from './components/toast/index'
Vue.use(Toast);
Vue.use(Element)
Vue.config.productionTip = false

// 如果是非线上环境，加载 VConsole（移动端适用）
// if (process.env.NODE_ENV !== 'production') {
//     var VConsole = require('vconsole/dist/vconsole.min.js');
//     var vConsole = new VConsole();
// }

// 实际打包时应该不引入mock
if (process.env.NODE_ENV !== 'production') require('@/mock')

// 全局过滤器
Object.keys(filters).forEach(filterName => {
    Vue.filter(filterName, filters[filterName])
})

/* eslint-disable no-new */
new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount('#app')
