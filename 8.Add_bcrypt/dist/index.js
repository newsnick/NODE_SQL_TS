"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const mysqlPassword = process.env.MYSQL_DB_PASSWORD || '';
const host = process.env.HOST || '';
const user = process.env.USER || '';
const database = process.env.DATABASE || '';
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use(routes_1.default);
// app.get('/details/:id', (req: Request, res: Response) => {
//   var pool = mysql.createPool({
//     host: host,
//     user: user,
//     password: mysqlPassword,
//     database: database,
//     connectionLimit: 10, // Maximale Anzahl von Verbindungen, bevor der Pool auf eine Freigabe wartet
//     multipleStatements: true,
//   })
//   pool.getConnection(function (err: any, conn: any) {
//     if (err) {
//       // console.log(err);
//       // express.send(400)
//       console.log('Fehler aufgetreten', err)
//       res.send({
//         success: false,
//         statusCode: 500,
//         message: 'Fehler bei der Verbindung',
//       })
//       return
//     }
//     console.log('Die ID: ' + req.params.id)
//     // Wenn eine Verbindung hergestellt wurde...
//     conn.query(
//       'SELECT * FROM kunden WHERE Position=?',
//       [req.params.id],
//       function (err: any, rows: any) {
//         if (err) {
//           conn.release()
//           return res.send({
//             success: false,
//             statusCode: 400,
//           })
//         }
//         // Zur Vereinfachung senden wir nur diese Zeilen
//         res.send({
//           message: 'Erfolg',
//           statsCode: 200,
//           data: rows,
//         })
//         // VERBINDUNG BEENDEN
//         conn.release()
//       }
//     )
//   })
//   // res.send({
//   //   message: 'Hello World!',
//   //   id: req.params.id,
//   //   name: req.params.name,
//   // })
// })
// app.post('/register', (req: Request, res: Response) => {
//   var pool = mysql.createPool({
//     host: host,
//     user: user,
//     password: mysqlPassword,
//     database: database,
//     connectionLimit: 10, // Maximale Anzahl von Verbindungen, bevor der Pool auf eine Freigabe wartet
//     multipleStatements: true,
//   })
//   pool.getConnection(function (err: any, conn: any) {
//     if (err) {
//       console.log('Fehlermeldung')
//       console.log(err)
//       res.send({
//         success: false,
//         statusCode: 500,
//         message: 'Während des Verbindungsaufbaus ist ein Fehler aufgetreten',
//       })
//       return
//     }
//     console.log('line 91')
//     console.log(req.body)
//     let sqlQuery = 'call registeruser(?,?,?,?,?,?)'
//     // Wenn eine Verbindung hergestellt wurde...
//     conn.query(
//       sqlQuery,
//       [
//         req.body.Nachname,
//         req.body.Vorname,
//         req.body.Position,
//         req.body.Anrede,
//         req.body.Geburtsdatum,
//         req.body.Einstellung,
//       ],
//       function (err: any, rows: any) {
//         if (err) {
//           conn.release()
//           return res.send({
//             success: false,
//             statusCode: 400,
//           })
//         }
//         console.log('line 100')
//         console.log(req.body)
//         // Zur Vereinfachung senden wir nur diese Zeilen
//         res.send({
//           message: 'Erfolg',
//           statusCode: 200,
//           // data: rows
//         })
//         // VERBINDUNG TRENNEN
//         conn.release()
//       }
//     )
//   })
// })
app.post('/Id/:id/Name/:name', (req, res) => {
    res.send({
        data: req.body,
        params: {
            id: req.params.id,
            name: req.params.name,
        },
    });
});
app.listen(process.env.PORT, () => {
    console.log(`Mit Port ${process.env.PORT} verbunden!`);
});
