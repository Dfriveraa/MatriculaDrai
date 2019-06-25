//Requerimientos
const express = require('express');
const app = express();
const morgan = require('morgan');
const moment = require('moment');
bodyParser = require('body-parser');
const Excel=require('exceljs');
workbook = new Excel.Workbook();
//Routes
app.use('/api', require('./routes/matricula'));//Se establece la ruta maestra de las peticiones
//settings
app.set('port', process.env.PORT || 3700);
//Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParser.json());
//static files
app.use(express.static(__dirname + '/public'));
//server listening
app.listen(app.get('port'), () => {
    console.log("Server on port", app.get('port'))
});

// Metodo sobrecargado que se encarga de registrar a un estudiante en un curso, descontar los cupos en dicho curso
// y agregar el registro de la operación al historial
function matricular(name, curse) {
    workbook.xlsx.readFile(__dirname + '/model/Matricula.xlsx').then(function () {
        //Hoja 1
        const hoja1 = workbook.getWorksheet(1);
        const hoja3 = workbook.getWorksheet(3);
        const hoja2 = workbook.getWorksheet(2);
        var index = hoja1.getColumn(1).values.indexOf(curse);
        if (hoja1.getRow(index).getCell(3).value > 0) {//Verifica por segunda vez que el curso si tenga cupo
            hoja1.getRow(index).getCell(3).value = hoja1.getRow(index).getCell(3).value - 1;
            hoja2.addRow([name, curse, moment().format('MMMM Do YYYY, h:mm:ss a')]);//Se agrega una fila indicando la operación
            if (hoja3.getColumn(1).values.indexOf(name) > 0) {//Busca el registro del estudiante, si no lo encuentra significa
                var indexName = hoja3.getColumn(1).values.indexOf(name);//que es primera vez que matricula un curso y crea un nuevo registro
                hoja3.getRow(indexName).getCell(hoja3.getRow(indexName).actualCellCount + 1).value = curse;//Añade el curso al registro del estudiante
            } else {
                hoja3.addRow([name, curse]);
            }
            workbook.xlsx.writeFile(__dirname + '/model/Matricula.xlsx');//Guarda el archivo modificado.
        }
    })

}

//Peticion post que recibe el nombre de un estudiante y el código del curso para llamar al método encargado de
//hacer la inscripcióm
app.post('/api/inscribir', (req, res) => {

    matricular(req.body.estudiante, req.body.curso);
    res.json(JSON.stringify('Complete'))

});
//Petición post que recibe el nombre de un estudiante como parametro y revisa el excel para filtrar
//Los cursos en los que ya está inscrito y retornar los que tiene disponibles.
app.post('/api/buscarPorEstudiante', (req, res) => {
        workbook.xlsx.readFile(__dirname + '/model/Matricula.xlsx').then(function () {
            const hoja1 = workbook.getWorksheet(1);
            const hoja3 = workbook.getWorksheet(3);
            var cursosInf = hoja1.getSheetValues();
            var out = [];
            var indexEst = hoja3.getColumn(1).values.indexOf(req.body.estudiante);
            aux = hoja3.getRow(indexEst).values.slice(2);
            if (indexEst > 0) {
                cursosInf.forEach(function (value) {
                    // se recorren los cursos ofertados y se comparan con el historial de cursos del estudiante
                    // para identificar en cuáles aún no se ha matrículado
                    if (aux.indexOf(value[1]) === -1) {
                        out.push(value)
                    }
                })
            } else {
                out = cursosInf.slice(1);
            }
            res.json(out);
        })
    }
);
