<template>
    <div class="container">
        <div class="row">
            <div class="col-xs-12">
                <h1 class="text-center">Estudiante</h1>
                <div class="form-group">
                    <label class="text-center">Nombre</label>
                    <input v-model="nombre" placeholder="Nombre de estudiante a matricular" type="text"
                           class="form-control" id="nameField">
                    <!-- este input estará relacionado con la variable nombre-->


                </div>

                <button @click="Cargar()" id="multiBtn" class="btn btn-success btn-lg btn-block">Cargar</button>
                <!--Este botón llama a la función guardar que hemos declarado en la parte script-->


                    <h2 class="text-center">Lista de Materias</h2>
                <table v-if="this.matricula.estudiante===''" class="table text-center">
                    <thead>
                    <tr>
                        <th class="text-center">Código</th>
                        <th class="text-center">Curso</th>
                        <th class="text-center">Cupo</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="curso in alv"> <!-- Recorremos nuestro array -->
                        <td v-text="curso[1]"></td> <!--En la primera columna mostramos el nombre-->
                        <td v-text="curso[2]"></td> <!--En la segunda mostramos el apellido-->
                        <td v-text="curso[3]"></td> <!--En la segunda mostramos el apellido-->
                        <!--En la segunda mostramos el apellido-->
                    </tr>
                    </tbody>
                </table>
                <table v-else class="table text-center">
                    <thead>
                    <tr class="text-center">
                        <th class="text-center">Código</th>
                        <th class="text-center">Curso</th>
                        <th class="text-center">Cupo</th>
                        <th class="text-center">Agregar</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(curso,index) in alv" :key="curso.id" class="text-center">
                        <!-- Recorremos nuestro array -->
                        <td v-text="curso[1]"></td>
                        <td v-text="curso[2]"></td>
                        <td v-text="curso[3]"></td>
                        <td v-if="curso[3]>1" class="btn btn-success btn-sm" @click="matricular(curso[1],index)">Add
                        </td>
                        <!--En la segunda mostramos el apellido-->
                    </tr>
                    </tbody>
                </table>
            </div>


        </div>

    </div>
</template>

<script>
    class Matricula {
        constructor() {
            this.estudiante = "";
            this.curso = "";
        }
    }

    export default {
        name: "Matricula",
        data() {
            return {
                matricula: new Matricula(),
                nombre: "",//variable nombre que hacer referencia al valor del input
                aux: true,
                alv: []
            }
        },
        created() {
            this.getData();
        },
        methods: {
            getData() {
                fetch('/api/list').then(res => res.json().then(data => this.alv = data));
            },
            Cargar() {

                if (this.aux === true) {
                    document.getElementById('multiBtn').innerText = "Atras";
                    document.getElementById('multiBtn').className = "btn btn-danger btn-lg btn-block";
                    document.getElementById('nameField').readOnly = true;
                    this.getDataByEstudent();
                    this.matricula.estudiante = this.nombre;
                    this.aux = false;

                } else {

                    document.getElementById('multiBtn').innerText = "Cargar";
                    document.getElementById('multiBtn').className = "btn btn-success btn-lg btn-block";
                    document.getElementById('nameField').readOnly = false;
                    this.getData();
                    this.nombre = "";
                    this.matricula.estudiante = "";
                    this.aux = true;
                }
                //var persona = {nombre:this.nombre, apellidos:this.apellidos} //creamos la variable personas, con la variable nombre y apellidos

            },
            getDataByEstudent() {
                this.matricula.estudiante = this.nombre;
                this.matricula.curso = this.curso;
                fetch('/api/buscarLista', {
                    method: 'POST',
                    body: JSON.stringify(this.matricula),
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                    }
                }).then(res => (res.json().then(data => this.alv = data)))
            },
            matricular(curso, index) {


                this.matricula.estudiante = this.nombre;
                this.matricula.curso = curso;
                this.alv.splice(index, 1);
                fetch('/api/inscribir', {
                    method: 'POST',
                    body: JSON.stringify(this.matricula),
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                    }
                }).then(res => res.json()).then(data => console.log(data));

            }
        }
    }
</script>

<style scoped>

</style>