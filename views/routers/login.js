'use strict';
const express = require('express');
const router = express.Router();
const fs = require('fs');
const config = require('../config');
const mysql = require('mysql');

router.post('/login', function (req, res) {
  const con = mysql.createConnection(config.dbcon);
  con.connect(function (err) {
    const sql = "SELECT * FROM tb_user  WHERE Uname = \'" + req.body.username + "\'";
    //console.log(sql);
    if (err) throw err;
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
     // console.log(result[0]);
      con.end(function () { });
      if (result[0] == undefined || result[0] == null) {
        const response = { status: false, message: { id: 0, uname: null, status: null } };
        res.json(response);
      } else {
        if (req.body.username == result[0].Uname && req.body.password == result[0].PW) {
          const response = { status: true, message: { id: result[0].UserID, uname: result[0].Uname, status: result[0].Status } };
          res.json(response);
        } else {
          const response = { status: false, message: { id: 0, uname: null, status: null } };
          res.json(response);
        }
      }

    });
  });
});

module.exports = router;