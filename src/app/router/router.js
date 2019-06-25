//Cargaqmos lo que vamos a usar
import Vue from 'vue'
import Router from 'vue-router'
import Historial from '../views/Historial.vue' //Ruta de archivo donde se encuentra la vista de historial
import Matricula from '../views/Matricula.vue'//Ruta de archivo donde se encuentra la vista de matrícula
Vue.use(Router);
//Exportamos las rutas  para que puedan ser leídas por el main.js de vuejs
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