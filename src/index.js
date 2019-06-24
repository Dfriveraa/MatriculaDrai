const express = require('express');
const app = express();
const morgan = require('morgan');
const Excel = require('exceljs');
bodyParser = require('body-parser');
//settings
app.set('port', process.env.PORT || 3700);

//Routes

app.use('/api', require('./routes/matricula'));

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

function matricular(name, curse) {
    workbook.xlsx.readFile(__dirname + '/model/Matricula.xlsx').then(function () {
        //Hoja 1
        var hoja1 = workbook.getWorksheet(1);
        var hoja3 = workbook.getWorksheet(3);
        var index = hoja1.getColumn(1).values.indexOf(curse);
        var cupo = hoja1.getRow(index).getCell(3).value;
        if (cupo > 0) {
            hoja1.getRow(index).getCell(3).value = cupo - 1;
            var hoja2 = workbook.getWorksheet(2);
            hoja2.addRow([name, curse, new Date()]);
            if(hoja3.getColumn(1).values.indexOf(name)>0){
                var indexName = hoja3.getColumn(1).values.indexOf(name);
                aux=hoja3.getRow(indexName).actualCellCount;
                hoja3.getRow(indexName).getCell(aux+1).value=curse;
            }
            else {
                hoja3.addRow([name,curse]);
            }

            workbook.xlsx.writeFile(__dirname + '/model/Matricula.xlsx');
        }

        //Hoja 2

    })

}

function buscarPosible(name) {

}

//Ruta post porque no queria dar la hpta
app.post('/api/inscribir', (req, res) => {

    matricular(req.body.estudiante,req.body.curso);
    res.json(JSON.stringify('Complete'))

});

app.post('/api/buscarLista', (req, res) => {
    workbook.xlsx.readFile(__dirname+'/model/Matricula.xlsx').then(function () {
        var hoja1 = workbook.getWorksheet(1);
        var hoja3 = workbook.getWorksheet(3);
        a = hoja1.getSheetValues();
        c = hoja3.getSheetValues();
        out = [];
        r = hoja3.getColumn(1).values.indexOf(req.body.estudiante);
        rdos = hoja3.getRow(r).values.slice(2);

        if (r > 0) {
            a.forEach(function (value) {
                if(rdos.indexOf(value[1])===-1){
                    out.push(value)
                }
            })
        }
        else {out=a.slice(1);}
        console.log(out);
        res.json(out);
    })
    }


);
