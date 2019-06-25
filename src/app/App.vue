<!--Es quien se carga por defecto en el index.html e internamente controla las vistas dependiendo la ruta en la que-->
<!--se encuentre el cliente mediante <router-link></router-link>-->
<template>
    <div>
        <navbar></navbar>
        <router-view></router-view>
    </div>
</template>
<script>
    //Importa el componente navbar, por defecto no hay necesidad de importar el router-view
    import Navbar from "./components/navbar.vue";
    export default {
        name: 'app',
        components: {Navbar},
    }
</script>
