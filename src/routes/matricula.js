//Importaciones
const express = require('express');
const Excel=require('exceljs');
workbook = new Excel.Workbook();
const router = express.Router();
bodyParser=require('body-parser');
const path=require('path');
const pathEcxel=path.dirname(__dirname);

//Petición get que revisa el excel y retorna los valores de su primera hoja, Código nombre y cupo de los cursos
router.get('/listaCursos', (req, res) => {
    workbook.xlsx.readFile(pathEcxel+'/model/Matricula.xlsx').then(function () {
            var tabla=workbook.getWorksheet(1).getSheetValues();
            res.json(tabla.slice(1))
        }
    )
});

//Petición get que revisa el excel y retorna los valores la segunda hoja,registro de las operaciones, quién, que curso y la fecha
router.get('/listaHistorial', (req, res) => {
    workbook.xlsx.readFile(pathEcxel+'/model/Matricula.xlsx').then(function () {
            var tabla=workbook.getWorksheet(2).getSheetValues();
            res.json(tabla.slice(1))
        }
    )
});
module.exports = router;