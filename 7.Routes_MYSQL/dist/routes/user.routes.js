"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mysql2_1 = __importDefault(require("mysql2"));
const usersRouter = (0, express_1.Router)();
const mysqlPassword = process.env.MYSQL_DB_PASSWORD || '';
const host = process.env.HOST || '';
const user = process.env.USER || '';
const database = process.env.DATABASE || '';
usersRouter.get('/', (request, response) => {
    return response.json('OK');
});
usersRouter.get('/details/:id', (req, res) => {
    var pool = mysql2_1.default.createPool({
        host: host,
        user: user,
        password: mysqlPassword,
        database: database,
        connectionLimit: 10, // Maximale Anzahl von Verbindungen, bevor der Pool auf eine Freigabe wartet
        multipleStatements: true,
    });
    pool.getConnection(function (err, conn) {
        if (err) {
            // console.log(err);
            // express.send(400)
            console.log('Fehler aufgetreten', err);
            res.send({
                success: false,
                statusCode: 500,
                message: 'Fehler bei der Verbindung',
            });
            return;
        }
        console.log('Die ID: ' + req.params.id);
        // Wenn eine Verbindung hergestellt wurde...
        conn.query(
        //   'SELECT * FROM kunden WHERE Position=?',
        'SELECT * FROM kunden WHERE KundenCode=?', [req.params.id], function (err, rows) {
            if (err) {
                conn.release();
                return res.send({
                    success: false,
                    statusCode: 400,
                });
            }
            // Zur Vereinfachung senden wir nur diese Zeilen
            res.send({
                message: 'Erfolg',
                statsCode: 200,
                data: rows,
            });
            // VERBINDUNG BEENDEN
            conn.release();
        });
    });
    // res.send({
    //   message: 'Hello World!',
    //   id: req.params.id,
    //   name: req.params.name,
    // })
});
usersRouter.post('/register', (req, res) => {
    var pool = mysql2_1.default.createPool({
        host: host,
        user: user,
        password: mysqlPassword,
        database: database,
        connectionLimit: 10, // Maximale Anzahl von Verbindungen, bevor der Pool auf eine Freigabe wartet
        multipleStatements: true,
    });
    pool.getConnection(function (err, conn) {
        if (err) {
            console.log('Fehlermeldung');
            console.log(err);
            res.send({
                success: false,
                statusCode: 500,
                message: 'Während des Verbindungsaufbaus ist ein Fehler aufgetreten',
            });
            return;
        }
        console.log('line 91');
        console.log(req.body);
        let sqlQuery = 'call registeruser(?,?,?,?,?,?)';
        // Wenn eine Verbindung hergestellt wurde...
        conn.query(sqlQuery, [
            req.body.Nachname,
            req.body.Vorname,
            req.body.Position,
            req.body.Anrede,
            req.body.Geburtsdatum,
            req.body.Einstellung,
        ], function (err, rows) {
            if (err) {
                conn.release();
                return res.send({
                    success: false,
                    statusCode: 400,
                });
            }
            console.log('line 100');
            console.log(req.body);
            // Zur Vereinfachung senden wir nur diese Zeilen
            res.send({
                message: 'Erfolg',
                statusCode: 200,
                // data: rows
            });
            // VERBINDUNG TRENNEN
            conn.release();
        });
    });
});
exports.default = usersRouter;
