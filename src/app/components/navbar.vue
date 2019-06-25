<!--Este es un componente simple que consta de una barra de navegación que estará presente en ambas vistas de la apliación-->
<!--y se encarga de redireccionar entre ellas-->
<template>
    <nav class="navbar navbar-light bg-light">
        <router-link to="/" class="navbar-brand">HERRAMIENTA DE MATRÍCULA</router-link>
        <router-link to="/historial" class="navbar-brand">VER HISTORIAL</router-link>

    </nav>
</template>

<script>
    export default {
        name: "navbar"
    }
</script>
