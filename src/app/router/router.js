import Vue from 'vue'
import Router from 'vue-router'
import Historial from '../views/Historial.vue'
import Matricula from '../views/Matricula.vue'
Vue.use(Router);

export default new Router({

    routes:[
        {
            path:'/historial',
            name:'/historial',
            component:Historial
        },
        {
            path:'/',
            name:'/matricula',
            component: Matricula
        }
    ]
})