var db = require('../config')
var moment = require('moment');
const fs = require('fs');
const path = require('path');
var multer = require('multer')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'assets/images/investigation/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '.jpg')
    }
})
var upload = multer({ dest: 'assets/images/investigation/' })

module.exports = function(app) {

    app.post('/newinvestigation', function(req, res) {
        try {
            db.query(`
            INSERT INTO hazardcompanyinvestigation (RLid, HCIGid, HCIEid, HCISid, Uid)
            VALUES ('${req.body.RLid}', '${req.body.HCIGid}', '${req.body.HCIEid}', '${req.body.HCISid}', '${req.body.Uid}')
            `, (err, result, f) => {
                if (err) throw err
                    res.send({
                        status: 'success'
                    })
            })
        } catch (error) {
            console.log(error)
        }
    })

    app.get('/getinvestigation', function (req, res) {
        try {
            db.query(`
                SELECT * FROM hazardcompanyinvestigation`,
            (err, result, f) => {
                if(err) throw err
                res.send(result)                
            })
        } catch (error) {
            console.log(error)
            return
        }        
    })
    
    app.get('/getcompanyandowner/:id', function (req, res) {
        try {
            db.query(`
            SELECT requestlicense.Cid, company.Cname, company.Chomeno, company.Cmoo, company.Csoi, company.Croad, company.Cvillage, company.Pid, company.Did, company.SDTid, owner.Oid, owner.Otel, company.Cemployee, company.Clat, company.Clong
            FROM requestlicense
            LEFT JOIN company
            ON requestlicense.Cid = company.Cid
            LEFT JOIN owner
            ON company.Oid = owner.Oid
            WHERE RLid = ` + req.params.id,
            (err, result, f) => {
                if(err) throw err
                res.send(result)                
            })
        } catch (error) {
            console.log(error)
            return
        }        
    })
    
    app.get('/getinvestigation/:id', function (req, res) {
        try {
            db.query(`
            SELECT *
            FROM hazardcompanyinvestigation
            LEFT JOIN hcigeneral ON hcigeneral.HCIGid = hazardcompanyinvestigation.HCIGid
            LEFT JOIN hcienvironment ON hcienvironment.HCIEid = hazardcompanyinvestigation.HCIEid
            LEFT JOIN hcisummary ON hcisummary.HCISid = hazardcompanyinvestigation.HCISid
            WHERE RLid = ` + req.params.id,
            (err, result, f) => {
                if(err) throw err
                res.send(result)                
            })
        } catch (error) {
            console.log(error)
            return
        }        
    })

    app.post('/updategeneralcompany/:id', function (req, res) {
        try {
            db.query(`
                UPDATE company
                SET Cemployee = '${req.body.Cemployee}',
                    Chomeno = '${req.body.Chomeno}',
                    Cmoo = '${req.body.Cmoo}',
                    Csoi = '${req.body.Csoi}',
                    Croad = '${req.body.Croad}',
                    Cvillage = '${req.body.Cvillage}',
                    Pid = '${req.body.Pid}',
                    Did = '${req.body.Did}',
                    SDTid = '${req.body.SDTid}',
                    Clat = '${req.body.Clat}',
                    Clong = '${req.body.Clong}'
                WHERE Cid = ` + req.params.id)        
            res.send({
                status: 'success'
            })
        }
        catch (error) {
            console.log(error)
            return
        }
    })
    
    app.post('/updategeneralowner/:id', function (req, res) {
        try {
            db.query(`
                UPDATE owner
                SET Otel = '${req.body.Otel}'
                WHERE Oid = ` + req.params.id)        
            res.send({
                status: 'success'
            })
        }
        catch (error) {
            console.log(error)
            return
        }
    })

    app.get('/imageHCI/:id', function (req, res) {
        db.query('SELECT * FROM investigationphoto WHERE HCIid = ' + req.params.id , (err, result, f) => {
            if(err) throw err
            res.send(result)
        })
    })

    app.post('/imageHCI/:id', upload.array('files', 12), function (req, res) {
        try {
            var newPath = 'assets/images/investigation/' + req.params.id + '/'
            var urlPath = 'http://localhost:5003/images/investigation/' + req.params.id + '/'
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
            db.query(`DELETE FROM investigationphoto WHERE HCIid = ` + req.params.id)
            fs.mkdir(newPath, (err) => {
                for (let i = 0; i < req.files.length; i++) {
                    newFilePath =  newPath + req.files[i].filename + '.jpg'
                    fs.copyFile(req.files[i].path, newFilePath, (err) => {
                        fs.unlink(req.files[i].path, (err) => {
                            allfile.push(newFilePath)
                            if (allfile.length === req.files.length) {
                                let query = 'INSERT INTO investigationphoto(IPpath, HCIid) VALUES'
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
}