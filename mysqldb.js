const mysql = require('mysql');
const express = require('express');
const app = express();
app.use(express.json())

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'moviedb'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("My sql connected...")
})

//create DB
app.get('/createDB', (req, res) => {
    let sql = 'Create DATABASE moviedb'
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        console.log(result)
        res.send('DataBase Created....')
    })
})

//created table
app.get('/create/table', (req, res) => {
    let sql = 'Create table movies(id int auto_increment ,name varchar(100),rating int,lenght int , primary key(id))'

    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        console.log(result)
        res.send('table Created....')
    })


})

app.post('/add/onanyid/movies/:id', function (req, res) {
    let id = req.params.id
    let rating = parseInt(req.body.rating);
    let len = parseInt(req.body.len);
    let sql = `INSERT INTO movies (name,rating,lenght)  VALUES('${req.body.name}',${rating},${len}) WHERE ID = ${id}`;
    db.query(sql, (err, result) => {
        if (err) return console.error(err);
        if(result.length < 1) return res.send("No Such Data Exist")
        console.log(result)
        res.send(result)
    })
})

/*********************************************************************************************************/
app.get('/get/Movie', (req, res) => {
    
    let sql = `SELECT * from movies `
    db.query(sql, (err, result) => {
        if (err) return console.error(err);
        if(result.length < 1) return res.send("No Such Data Exist")
        console.log(result)
        res.send(result)
    })
})

app.post('/add/movies', function (req, res) {
    let rating = parseInt(req.body.rating);
    let len = parseInt(req.body.len);
    let sql = `INSERT INTO movies (name,rating,lenght)  VALUES('${req.body.name}',${rating},${len})`;
    db.query(sql, (err, result) => {
        if (err) return console.error(err);
        if(result.length < 1) return res.send("No Such Data Exist")
        console.log(result)
        res.send(result)
    })
})


app.put('/update/movie/:id', function (req, res) {
    let id = req.params.id
    let name = req.body.name
    
    let sql = `UPDATE movies SET name  ='${name}' WHERE id= ${id}`;
    db.query(sql, (err, result) => {
        if (err) return console.error(err);
        if(result.length < 1) return res.send("No Such Data Exist")
        console.log(result)
        res.send('Data updated')
    })
})

app.delete('/Delete/movie/:id', function (req, res) {
    let id = req.params.id
    
    let sql = `DELETE FROM movies WHERE id= ${id}`;
    db.query(sql, (err, result) => {
        if (err) return console.error(err);
        if(result.length < 1) return res.send("No Such Data Exist")
        console.log(result)
        res.send(id+'Data id Deleted')
    })
})


app.listen(9000, function (req, res) {
    console.log('running...')
});