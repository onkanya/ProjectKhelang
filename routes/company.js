var db = require('../config')
var moment = require('moment');
const fs = require('fs');
const path = require('path');
var multer = require('multer')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'assets/images/company/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '.jpg')
    }
})
var upload = multer({ dest: 'assets/images/company/' })

module.exports = function(app) {

    app.get('/company', function (req, res) {
        db.query(`SELECT * FROM company
                    LEFT JOIN requestlicense ON requestlicense.Cid = company.Cid 
                    LEFT JOIN hazardcompanyinvestigation ON hazardcompanyinvestigation.RLid = requestlicense.RLid
                    LEFT JOIN hcisummary ON hcisummary.HCISid = hazardcompanyinvestigation.HCISid
                    LEFT JOIN owner ON owner.Oid = company.Oid
                    LEFT JOIN companytype ON companytype.CTid = company.CTid
                    WHERE hcisummary.HCISresult = 1`, (err, result, f) => {
            if(err) throw err
            res.send(result)
        })
    })
    
    app.get('/getcompanyforrequest', function (req, res) {
        db.query(`SELECT Cid, Cname FROM company`, (err, result, f) => {
            if(err) throw err
            res.send(result)
        })
    })

    app.get('/companygetid/:id', function (req, res) {
        db.query(`SELECT * FROM company
                LEFT JOIN licensefee
                ON licensefee.LFid = company.LFid
                WHERE Cid = ` + req.params.id , (err, result, f) => {
            if(err) throw err
            result.forEach(e => {
                e.Cstartdate = moment(e.Cstartdate).format('YYYY-MM-DD')
            })
            res.send(result)
        })
    })

    app.post('/newcompany', function (req, res) {
        try {
            db.query(`
                INSERT INTO company 
                (
                    CTid, LFid, Oid, 
                    Cname, Carea, Cmachine, 
                    Cemployee, Cstartdate, Chomeno, 
                    Cmoo, Csoi, Croad, 
                    Cvillage, SDTid, Did, Pid
                ) VALUES (
                    '${req.body.CTid}', '${req.body.LFid}', '${req.body.Oid}', 
                    '${req.body.Cname}', '${req.body.Carea}', '${req.body.Cmachine}', 
                    '${req.body.Cemployee}', '${req.body.Cstartdate}', '${req.body.Chomeno}', 
                    '${req.body.Cmoo}', '${req.body.Csoi}', '${req.body.Croad}', 
                    '${req.body.Cvillage}', '${req.body.SDTid}', '${req.body.Did}', '${req.body.Pid}'
                )
            `, (err, result, f) => {
                if (err) throw err
                db.query('SELECT LAST_INSERT_ID() as Cid', (err2, result2, f2) => {
                    if (err2) throw err2
                    console.log(result2)
                    res.send({
                        Cid: result2[0].Cid,
                        status: 'success'
                    })
                })
            })
        } catch (error) {
            console.log(error)
            return
        }
    })

    app.post('/updatecompany/:id', function (req, res) {
        try {
            db.query(`
                UPDATE company
                SET CTid = '${req.body.CTid}', 
                    CTCid = '${req.body.CTCid}', 
                    Oid = '${req.body.Oid}', 
                    Cname = '${req.body.Cname}', 
                    Carea = '${req.body.Carea}', 
                    Cmachine = '${req.body.Cmachine}', 
                    Cemployee = '${req.body.Cemployee}', 
                    Cstartdate = '${req.body.Cstartdate}', 
                    Chomeno = '${req.body.Chomeno}', 
                    Cmoo = '${req.body.Cmoo}', 
                    Csoi = '${req.body.Csoi}', 
                    Croad = '${req.body.Croad}', 
                    Cvillage = '${req.body.Cvillage}', 
                    SDTid = '${req.body.SDTid}', 
                    Did = '${req.body.Did}', 
                    Pid = '${req.body.Pid}'
                WHERE Cid = ` + req.params.id
            )
            res.send({
                status: 'success'
            })
        } catch (error) {
            console.log(error)
            return
        }
    })

    app.get('/imagecompany/:id', function (req, res) {
        db.query('SELECT * FROM `companyphoto` WHERE Cid = ' + req.params.id , (err, result, f) => {
            if(err) throw err
            res.send(result)
        })
    })

    app.post('/imagecompany/:id', upload.array('files', 12), function (req, res) {
        try {
            var newPath = 'assets/images/company/' + req.params.id + '/'
            var urlPath = 'http://localhost:5003/images/company/' + req.params.id + '/'
            var allfile = []
            var wg = true
            if (fs.existsSync(newPath)) {
                var list = fs.readdirSync(newPath);
                // Delete images in Folder
                for(var i = 0; i < list.length; i++) {
                    var filename = path.join(newPath, list[i]);
                    var stat = fs.statSync(filename);
    
                    if(filename == "." || filename == "..") {
                    } else if(stat.isDirectory()) {
                        rmdir(filename);
                    } else {
                        fs.unlinkSync(filename);
                    }
                }
                fs.rmdirSync(newPath);
            }
            // Delete images in table
            db.query(`DELETE FROM companyphoto WHERE Cid = ` + req.params.id)
            fs.mkdir(newPath, (err) => {
                for (let i = 0; i < req.files.length; i++) {
                    newFilePath =  newPath + req.files[i].filename + '.jpg'
                    fs.copyFile(req.files[i].path, newFilePath, (err) => {
                        fs.unlink(req.files[i].path, (err) => {
                            allfile.push(newFilePath)
                            if (allfile.length === req.files.length) {
                                let query = 'INSERT INTO companyphoto(CPpath, Cid) VALUES'
                                req.files.forEach((e, idx) => {
                                    query += `('${urlPath + req.files[idx].filename}.jpg', ${req.params.id})`
                                    if (idx !== req.files.length - 1) {
                                        query += ','
                                    }
                                })
                                db.query(query)
                                res.send({
                                    success: true,
                                    filePath: allfile
                                })
                            }
                        })
                    })
                }
            })
        } catch (error) {
            console.log(error)
            return
        }
    })

    app.post('/deletecompany/:id', function (req, res) {
        try {
            db.query(`
            DELETE FROM company
            WHERE Cid = ` + req.params.id)        
        res.send({
            status: 'success'
        })
        } catch (error) {
            console.log(error)
            return
        }
    })
}