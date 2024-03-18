import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import { Request, Response } from 'express'
import mysql from 'mysql2'

const mysqlPassword = process.env.MYSQL_DB_PASSWORD || ''

const app = express()
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.get('/details/:id', (req: Request, res: Response) => {
  var pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: mysqlPassword,
    database: 'beispiel-datenbank',
    connectionLimit: 10, // Maximale Anzahl von Verbindungen, bevor der Pool auf eine Freigabe wartet
    multipleStatements: true,
  })

  pool.getConnection(function (err: any, conn: any) {
    if (err) {
      // console.log(err);
      // express.send(400)
      console.log('Fehler aufgetreten', err)
      res.send({
        success: false,
        statusCode: 500,
        message: 'Fehler bei der Verbindung',
      })

      return
    }

    console.log('Die ID: ' + req.params.id)

    // Wenn eine Verbindung hergestellt wurde...
    conn.query(
      'SELECT * FROM kunden WHERE Position=?',
      [req.params.id],
      function (err: any, rows: any) {
        if (err) {
          conn.release()
          return res.send({
            success: false,
            statusCode: 400,
          })
        }

        // Zur Vereinfachung senden wir nur diese Zeilen
        res.send({
          message: 'Erfolg',
          statsCode: 200,
          data: rows,
        })

        // VERBINDUNG BEENDEN
        conn.release()
      }
    )
  })

  // res.send({
  //   message: 'Hello World!',
  //   id: req.params.id,
  //   name: req.params.name,
  // })
})

app.post('/Id/:id/Name/:name', (req: Request, res: Response) => {
  res.send({
    data: req.body,
    params: {
      id: req.params.id,
      name: req.params.name,
    },
  })
})

app.listen(3000, () => {
  console.log('Mit Port 3000 verbunden!')
})
