import Vue from 'vue';
import App from './App.vue'
import router from './router/router.js'
// Vue.use(Router);
new Vue({
    el:'#app',
    router,
    template:'<App/>',
    render: h => h(App),
});

