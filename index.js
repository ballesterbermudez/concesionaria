const mysql = require('mysql');
const express = require('express');
const sequelize = require('sequelize');
const dbb = require('./database/models');

const app = express()

const db = mysql.createConnection({
    user: "root",
    password: "",
    port: "3675",
    database: "Consecionaria",
    host: "localhost"
})

app.get('/prueba', (req, res) => {
    dbb.vendedores.findAll({include: {all:true, nested: true}}).then(resultado => {
        res.send(resultado);
    })
})

app.get('/vehiculos',(req,res) => {
    if(req.query.anio) {
        let anio = req.query.anio;
        dbb.Vehiculos.findAll({where: {ando_fabricacion:anio}}).then(vehiculo => {
            res.send(vehiculo);
        })
    } else {
        dbb.Vehiculos.findAll().then(vehiculo => res.send(vehiculo))
    }
})

app.get('/vehiculos/usado',(req,res) => {
    dbb.Vehiculos.findAll({where: {usado:true}}).then(vehiculo => {
        res.send(vehiculo);
    })
})

app.get('/vehiculos/disponible', (req,res) => {
    dbb.Vehiculos.findAll({
        include: {
            model: dbb.Ventas,
            as: 'ventavehiculo',
            required: false
        }})
    .then(vehiculo => {
        res.send(vehiculo);
    })
})
// UserEvent.all({
//     include: [
//         model: EventFeedback,
//         required: false, // do not generate INNER JOIN
//         attributes: [] // do not return any columns of the EventFeedback table
//     ],
//     where: sequelize.where(
//         sequelize.col('EventFeedback.userEventID'),
//         'IS',
//         null
//     )}

app.get('/vehiculos/vendido',(req,res) => {
    db.query(`SELECT * FROM vehiculos
    JOIN Ventas
    ON Ventas.id_vehiculo = Vehiculos.id`, (err,result) => {
    if(result) {
        console.table(result);
        res.send(result);
    }
    else console.log(err)
    })
})

app.get('/vendedores/mas-vende',(req,res) => {
    db.query(`SELECT vendedores.*, COUNT(Ventas.id) as 'cantidad de ventas' FROM vendedores
    LEFT JOIN Ventas
    ON Ventas.id_vendedor = vendedores.id
    GROUP BY vendedores.nombre
    ORDER BY COUNT(Ventas.id) DESC`, (err,result) => {
    if(result) {
        console.table(result);
        res.send(result);
    }
    else console.log(err)
    })
})

app.get('/vendedores/mas-guita',(req,res) => {
    db.query(`SELECT vendedores.*, COALESCE(SUM(Vehiculos.precio), 0) as 'cantidad de guita generada' FROM vendedores
    LEFT JOIN Ventas
    ON Ventas.id_vendedor = vendedores.id
    LEFT JOIN Vehiculos
    ON Vehiculos.id = Ventas.id_vehiculo
    GROUP BY vendedores.nombre
    ORDER BY SUM(Vehiculos.precio) DESC`, (err,result) => {
    if(result) {
        console.table(result);
        res.send(result);
    }
    else console.log(err)
    })
})

app.get('/periodo/',(req,res) => {
    let anio = req.query.anio;
    let mes = req.query.mes;
    if(anio) {
        db.query(`SELECT * FROM Ventas WHERE YEAR(fecha) = "${anio}"`, (err,result) => {
        if(result) {
            console.table(result);
            res.send(result);
        }
        else console.log(err)
        })
    } else if (mes) {
        db.query(`SELECT * FROM Ventas WHERE MONTH(fecha) = "${mes}"`, (err,result) => {
            if(result) {
                console.table(result);
                res.send(result);
            }
            else console.log(err)
        })
    } else {
        console.log('le pifiaste');
    }
})

app.get('/vehiculos/:marca',(req,res) => {
    let marca = req.params.marca;
    db.query(`SELECT * FROM vehiculos WHERE marca = "${marca}"`, (err,result) => {
        if(result) {
            console.table(result);
            res.send(result);
        }
        else console.log(err)
    })
})


app.listen(3000,async() =>  {     
    console.log("Servidor corriendo en puerto 3000")
})