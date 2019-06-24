const express = require('express');
const Excel=require('exceljs');
workbook = new Excel.Workbook();
const router = express.Router();
bodyParser=require('body-parser');
const path=require('path');
const pathEcxel=path.dirname(__dirname);
router.get('/list', (req, res) => {
    workbook.xlsx.readFile(pathEcxel+'/model/Matricula.xlsx').then(function () {

            var materias = workbook.getWorksheet(1);
            var tabla=materias.getSheetValues();
            //res.send((curso.slice(1)));
            console.log(tabla);
            res.json(tabla.slice(1))
        }
    )
});
router.get('/listView', (req, res) => {
    workbook.xlsx.readFile(pathEcxel+'/model/Matricula.xlsx').then(function () {

            var materias = workbook.getWorksheet(3);
            var tabla=materias.getSheetValues();
            console.log(tabla);
            res.json(tabla.slice(1))
        }
    )
});

router.post('/waa',(req,res)=>{

    console.log(req.body);
    res.send('negativo')

});

module.exports = router;