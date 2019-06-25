<template>
    <div class="container">
        <div class="row">
            <div class="col-xs-12">
                <h1 class="text-center">Estudiante</h1>
                <div class="form-group">
                    <label class="text-center">Nombre</label>
                    <input v-model="nombre" placeholder="Nombre de estudiante a matricular" type="text"
                           class="form-control" id="nameField">
                    <!-- este input estará relacionado con la variable nombre que definimos mas abajo-->
                </div>
                <button @click="cargar()" id="multiBtn" class="btn btn-success btn-lg btn-block">Cargar</button>
                <!--                        este boton llama a la función cargar enviandole el nombre que halla en el campo de texto-->
                <h2 class="text-center">Lista de Materias</h2>
                <!--                la siguiente tabla está condicionada por si ya fue cargado un atributo nombre del estudiante, en caso de-->
                <!--                que no, se muestra solamente una tabla con los cursos ofertados, el codigo y los cupos restantes, en caso-->
                <!--                de tener el atributo, se agregará la opción de poder matricular-->
                <table v-if="this.matricula.estudiante===''" class="table text-center">
                    <thead>
                    <tr>
                        <th class="text-center">Código</th>
                        <th class="text-center">Curso</th>
                        <th class="text-center">Cupo</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="curso in cursos"> <!-- Recorremos nuestro array -->
                        <td v-text="curso[1]"></td> <!--En la primera columna mostramos el código-->
                        <td v-text="curso[2]"></td> <!--En la segunda mostramos el nombre-->
                        <td v-text="curso[3]"></td> <!--En la tercera mostramos el cupo-->
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
                    <tr v-for="(curso,index) in cursos" :key="curso.id" class="text-center">
                        <!-- Recorremos nuestro array -->
                        <td v-text="curso[1]"></td> <!-- igual que con el condicional anterior-->
                        <td v-text="curso[2]"></td><!-- igual que con el condicional anterior-->
                        <td v-text="curso[3]"></td><!-- igual que con el condicional anterior-->
                        <td v-if="curso[3]>1" class="btn btn-success btn-sm" @click="matricular(curso[1],index)">Add<!-- Parametros el codigo de curso y la posición en el array-->
                            <!-- Se agrega a cada fila el boton que permite realizar la matrícula-->
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    //Creamos una clase cuyos atributos seran enviados como parametros en las peticiones
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
                aux: true,//Nos permitira alternar la vista de los botones
                cursos: []
            }
        },
        created() {
            //Metodo que se ejecuta al cargar la vista
            this.getData();
        },
        methods: {
            //Peticion get al servidor que me retorna la información de todos los cursos
            getData() {
                fetch('/api/listaCursos').then(res => res.json().then(data => this.cursos = data));
            },
            cargar() {
                //Método sobrecargado (se puede dividir en otros dos métodos) que se encarga de alternar la vista del boton
                //principal , y hacer una petición post al servidor encargada de cargar los cursos que tiene disponible el estudiante
                //ingresado en el campo de texto
                if (this.aux === true) {
                    document.getElementById('multiBtn').innerText = "Atras";
                    document.getElementById('multiBtn').className = "btn btn-danger btn-lg btn-block"; //Cambia la vista del boton
                    document.getElementById('nameField').readOnly = true;
                    this.getDataByEstudent();//Aca hace la petición de cursos para un estudiante
                    this.matricula.estudiante = this.nombre;//le asigna el nombre del campo de texto al atributo estudiante de la clase matricula
                    this.aux = false;
                } else {
                    document.getElementById('multiBtn').innerText = "cargar";
                    document.getElementById('multiBtn').className = "btn btn-success btn-lg btn-block";//Cambia la vista del boton
                    document.getElementById('nameField').readOnly = false;
                    this.getData();//Peticion de todos los cursos ofertados con su codigo, nombre y cupo
                    this.nombre = "";
                    this.matricula.estudiante = "";
                    this.aux = true;
                }
            },
            getDataByEstudent() {
                //Carga al objeto matricula el nombre del estudiante y el codigo del curso que por le momento no nos interesa
                this.matricula.estudiante = this.nombre;
                this.matricula.curso = this.curso;
                //Peticion post al servidor enviandole el objeto matricula como parametro para que retorne la lista de cursos
                //disponibles para ese estudiante
                fetch('/api/buscarPorEstudiante', {
                    method: 'POST',
                    body: JSON.stringify(this.matricula),
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                    }
                }).then(res => (res.json().then(data => this.cursos = data)))
                //El array de cursos lo convierte en la respuesta del servidor , haciendo que estos se cambien y solo queden los
                //disponibles para el estudiante ingresado
            },
            matricular(curso, index) {
                //Vuelve a actualizar los atributos del objeto matricula, con el curso que le entra como parametro
                this.matricula.estudiante = this.nombre;
                this.matricula.curso = curso;
                //Método post que se encarga de enviarle el objeto matrícula al servidor y este se encarga de registrar al estudiante
                fetch('/api/inscribir', {
                    method: 'POST',
                    body: JSON.stringify(this.matricula),
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                    }
                }).then(res => res.json()).then(data => this.cursos.splice(index, 1));
                //Cuando obtiene respuesta, utiliza el index que llego como parametro, para
                //eliminar el elemento del array de cursos e impedir que se vuelva a matricular
            }
        }
    }
</script>