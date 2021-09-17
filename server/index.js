const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 3032;

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'madrifigli'
})

app.use(cors()); 
app.use(express.json());

connection.connect();
try {
    connection.query(`CREATE TABLE Madri(
        id int(4) PRIMARY KEY NOT NULL AUTO_INCREMENT,
        nome varchar(20),
        cognome varchar(20),
        cittaResidenza varchar(100),
        provinciaResidenza varchar(100),
        indirizzo varchar(100),
        cittaNascita varchar(100),
        annoNascita int(10),
        codiceFiscale varchar(16));`, (error, results, fields) => {
            if(error)  
                console.log(error.sqlMessage)
        });

        connection.query(`CREATE TABLE Figli(
            id int(4) PRIMARY KEY NOT NULL AUTO_INCREMENT,
            nomeFiglio varchar(30),
            anniFiglio int(4),
            idMadre int(4),
            CONSTRAINT FK_MadreId FOREIGN KEY (idMadre)
            REFERENCES Madri(id)
            ON DELETE CASCADE)`, (error, results, fields) => {
                if(error)
                    console.log(error.sqlMessage)
            })
} catch (err) {
    console.log(err)
}  

// Fetch per l'inserimento dei dati della madre e del figlio in maniera dinamica
app.post("/inserisciUser", async(req, res) => {
    let id;
    connection.query(`INSERT INTO Madri (id, nome, cognome, cittaResidenza, provinciaResidenza, indirizzo, cittaNascita, annoNascita, codiceFiscale) VALUES (NULL, '${req.body.nome}','${req.body.cognome}','${req.body.cittaResidenza}','${req.body.provinciaResidenza}','${req.body.indirizzo}','${req.body.cittaNascita}','${req.body.annoNascita}','${req.body.codiceFiscale}')`, (err, results, fields) => {
        if(err) {
            console.log(err);
            return res.json({ msg: "Inserimento errato!" })
        }else {
            // Il ciclo for ci serve nel caso in cui vogliamo inserire più di un numero riferito allo stesso contatto
            id = results.insertId;
            for(let i = 0; i<req.body.figlio.length; i++) {
                
                connection.query(`INSERT INTO Figli (id, nomeFiglio, anniFiglio, idMadre) VALUES (NULL, "${req.body.figlio[i]}", "${req.body.anniFiglio[i]}", ${id})`, (err, results, fields) => {
                    if(err) {
                        console.log(err);
                        // return res.json({ msg: 'Inserimento errato!' })
                    }
                })
            }
        }
    })
    return res.json({ msg: 'Inserimento avvenuto con successo' })
})


app.get("/listaMadri", (req, res) => {
    connection.query(`SELECT * FROM Madri INNER JOIN Figli on Madri.id = Figli.idMadre`, (err, results, fields) => {
        if(err) {
            return res.json({ msg: 'Elenco errato' });
        }else {
            return res.json(results)
        }
    })
})



// Tramite codice similare a quello della Rubrica => FUNZIONA
// app.delete("/eliminaMadre", async (req, res) => {
//     connection.query(`DELETE FROM Madri WHERE id = ${req.body.id}`, (err, results, fileds) => {
//         if(err) {
//             console.log(err);
//             return res.json({ status: false })
//         }
//     })
//     return res.json({ status: true })
// })


// Tramite codice della todolist => FUNZIONA
app.delete("/eliminaMadre/:id", (req, res) => {
    const id = req.params.id;
    connection.query("DELETE FROM Madri WHERE id = ?", id, (err, result) => {
        if(err) {
            console.log(err);
            res.json({status: false})
        }else {
            console.log('Cancellazione avvenuta con successo')
        }
    })
    res.json({status: true})
})


app.delete("/eliminaFiglio/:id", (req, res) => {
    id = req.params.id;
    connection.query(`DELETE FROM figli WHERE id = ?`, id,(err, result) => {
        if(err) {
            return res.json({err})
        }else {
            console.log('Cancellazione avvenuta con successo')
        }
        res.json({msg: 'Record eliminato con successo'})
    })
})



app.listen(PORT, () => {
    console.log(`Server in ascolto sulla posta ${PORT}`)
})