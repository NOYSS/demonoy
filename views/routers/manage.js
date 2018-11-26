'use strict';
const express = require('express');
const router = express.Router();
const fs = require('fs');
const config = require('../config');
const mysql = require('mysql');

router.post('/insertcat', function (req, res) {
    const con = mysql.createConnection(config.dbcon);
    let cid = 0;
    con.connect(function (err) {

        const sqlmax = "SELECT MAX(CategoryID)+1 AS idmax FROM tb_category";
        if (err) throw err;
        con.query(sqlmax, function (err, resultm, fields) {
            if (err) throw err;
            if (resultm[0] == undefined || resultm[0] == null) {
                cid = cid + 1;
                const sql = "INSERT INTO tb_category (CategoryID,Cname,UserID) VALUES (" + cid + ", \'" + req.body.cname + "\', " + req.body.userid + ")";
                con.query(sql, function (err, result, fields) {
                    if (err) throw err;
                    const response = { status: true, message: 'ok' };
                    res.json(response);
                });
            } else {
                cid = resultm[0].idmax;
                const sql = "INSERT INTO tb_category (CategoryID,Cname,UserID) VALUES (" + cid + ", \'" + req.body.cname + "\', " + req.body.userid + ")";
                con.query(sql, function (err, result, fields) {
                    if (err) throw err;
                    const response = { status: true, message: 'ok' };
                    res.json(response);
                });
            }
        });

    });
});

router.post('/updatecat', function (req, res) {
    const con = mysql.createConnection(config.dbcon);
    con.connect(function (err) {
        const sql = "UPDATE tb_category SET Cname = \'" + req.body.cname + "\' WHERE CategoryID = " + req.body.id;
        con.query(sql, function (err, result, fields) {
            if (err) throw err;
            const response = { status: true, message: 'ok' };
            res.json(response);
        });
    });
});

router.post('/viewcat', function (req, res) {
    const con = mysql.createConnection(config.dbcon);
    con.connect(function (err) {
        if (err) throw err;
        const sql = "SELECT * FROM tb_category";
        con.query(sql, function (err, result, fields) {
            if (err) throw err;
            if (result[0] == undefined || result[0] == null) {
                const response = { status: false, message: null };
                res.json(response);
            } else {
                const response = { status: true, message: result };
                res.json(response);
            }
        });
    });
});

router.post('/deletecat', function (req, res) {
    const con = mysql.createConnection(config.dbcon);
    con.connect(function (err) {
        if (err) throw err;
        const sql = "DELETE FROM tb_category WHERE CategoryID=" + req.body.id;
        con.query(sql, function (err, result, fields) {
            if (err) throw err;

            const response = { status: true, message: result };
            res.json(response);

        });
    });
});

router.post('/editcat', function (req, res) {
    const con = mysql.createConnection(config.dbcon);
    con.connect(function (err) {
        if (err) throw err;
        const sql = "SELECT Cname FROM tb_category WHERE CategoryID=" + req.body.id;
        con.query(sql, function (err, result, fields) {
            if (err) throw err;
            const response = { status: true, message: result[0].Cname };
            res.json(response);

        });
    });
});

router.post('/insertblog', function (req, res) {
    const con = mysql.createConnection(config.dbcon);
    let lid = 0;
    con.connect(function (err) {

        const sqllmax = "SELECT MAX(LessonID)+1 AS idmax FROM tb_lesson";
        const sqlbmax = "SELECT MAX(BlogID)+1 AS idmax FROM tb_blog";
        if (err) throw err;
        con.query(sqllmax, function (err, resultm, fields) {
            if (err) throw err;
            if (resultm[0].idmax == undefined || resultm[0].idmax == null) {
                lid = lid + 1;
                const sql = "INSERT INTO tb_lesson (LessonID,CategoryID,Lname,UserID) VALUES (" + lid + "," + req.body.catid + ", \'" + req.body.lname + "\', " + req.body.userid + ")";
                con.query(sql, function (err, result, fields) {
                    if (err) throw err;
                    con.query(sqlbmax, function (err, resultb, fields) {
                        if (err) throw err;
                        let bid = 0;
                        if (resultb[0].idmax == undefined || resultb[0].idmax == null) {
                            bid = bid + 1;
                            const sql1 = "INSERT INTO tb_blog (BlogID,LessonID,EditNumber,Content,Wdate,Wtime,UserID) VALUES (" + bid + "," + lid + ",0,\'"+req.body.blog+"\',now(),now()," + req.body.userid + ")";
                            con.query(sql1, function (err, result, fields) {
                                if (err) throw err;
                                const response = { status: true, message: 'ok' };
                                res.json(response);
                            });
                        } else {
                            bid = resultb[0].idmax;
                            const sql1 = "INSERT INTO tb_blog (BlogID,LessonID,EditNumber,Content,Wdate,Wtime,UserID) VALUES (" + bid + "," + lid + ",0,\'"+req.body.blog+"\',now(),now()," + req.body.userid + ")";
                            con.query(sql1, function (err, result, fields) {
                                if (err) throw err;
                                const response = { status: true, message: 'ok' };
                                res.json(response);
                            });
                        }

                    });
                });
            } else {
                lid = resultm[0].idmax;
                const sql = "INSERT INTO tb_lesson (LessonID,CategoryID,Lname,UserID) VALUES (" + lid + "," + req.body.catid + ", \'" + req.body.lname + "\', " + req.body.userid + ")";
                con.query(sql, function (err, result, fields) {
                    if (err) throw err;
                    con.query(sqlbmax, function (err, resultb, fields) {
                        if (err) throw err;
                        let bid = 0;
                        if (resultb[0].idmax == undefined || resultb[0].idmax == null) {
                            bid = bid + 1;
                            const sql1 = "INSERT INTO tb_blog (BlogID,LessonID,EditNumber,Content,Wdate,Wtime,UserID) VALUES (" + bid + "," + lid + ",0,\'"+req.body.blog+"\',now(),now()," + req.body.userid + ")";
                            con.query(sql1, function (err, result, fields) {
                                if (err) throw err;
                                const response = { status: true, message: 'ok' };
                                res.json(response);
                            });
                        } else {
                            bid = resultb[0].idmax;
                            const sql1 = "INSERT INTO tb_blog (BlogID,LessonID,EditNumber,Content,Wdate,Wtime,UserID) VALUES (" + bid + "," + lid + ",0,\'"+req.body.blog+"\',now(),now()," + req.body.userid + ")";
                            con.query(sql1, function (err, result, fields) {
                                if (err) throw err;
                                const response = { status: true, message: 'ok' };
                                res.json(response);
                            });
                        }

                    });
                });
            }
        });

    });
});

router.post('/viewlesson', function (req, res) {
    const con = mysql.createConnection(config.dbcon);
    con.connect(function (err) {
        if (err) throw err;
        const sql = "SELECT * FROM tb_lesson";
        const sql1 = "SELECT * FROM tb_blog";
        con.query(sql, function (err, result, fields) {
            if (err) throw err;
            if (result[0] == undefined || result[0] == null) {
                const response = { status: false, message: null };
                res.json(response);
            } else {
                con.query(sql1, function (err, resultb, fields) {
                    if (err) throw err;
                    if (result[0] == undefined || result[0] == null) {
                        const response = { status: false, message: null };
                        res.json(response);
                    } else {
                        const response = { status: true, message: {lesson:result,blog:resultb }};
                        res.json(response);
                    }
                });
            }
        });
    });
});

module.exports = router;