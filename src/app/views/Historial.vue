<template>
    <div class="container">
        <div class="row">
            <div class="col-xs-12">
                <table class="table table-striped text-center">
                    <thead class="thead-light">
                    <tr>
                        <th class="text-center">Estudiante</th>
                        <th class="text-center">Curso</th>
                        <th class="text-center">Fecha de matrícula</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="reg in hist"> <!-- Recorremos nuestro array -->
                        <td v-text="reg[1]"></td> <!--En la primera columna mostramos el nombre-->
                        <td v-text="reg[2]"></td> <!--En la segunda mostramos el apellido-->
                        <td v-text="reg[3]"></td> <!--En la segunda mostramos el apellido-->
                        <!--En la segunda mostramos el apellido-->
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "test",
        created() {
            this.getData();
        },
        data() {
            return{
            hist:[]
        }

    }
    ,
    methods: {
        getData()
        {
            fetch('/api/listView').then(res => res.json().then(data => this.hist = data));
        }
    }
    }

</script>