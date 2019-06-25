//Indicamos lo necesario para que corra VueJS
import Vue from 'vue';
import App from './App.vue'
//Cargamos el controlador para indicar donde estan las rutas de las vistas
import router from './router/router.js'
//Cargamos vue
new Vue({
    el:'#app',
    router,
    template:'<App/>',
    render: h => h(App),
});

