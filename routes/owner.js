var db = require('../config')

module.exports = function(app) {
    app.get('/owner', function (req, res) {
        db.query(`SELECT * FROM owner
                LEFT JOIN company ON company.Oid = owner.Oid
                LEFT JOIN requestlicense ON requestlicense.Cid = company.Cid
                LEFT JOIN hazardcompanyinvestigation ON hazardcompanyinvestigation.RLid = requestlicense.RLid
                LEFT JOIN hcisummary ON hcisummary.HCISid = hazardcompanyinvestigation.HCISid
                WHERE hcisummary.HCISresult = 1
                GROUP BY owner.OID`, (err, result, f) => {
            if(err) throw err
            res.send(result)
        })
    })

    app.get('/getocitizenid', function (req, res) {
        try {
            db.query(`SELECT * FROM owner`, (err, result, f) => {
                if(err) throw err
                res.send(result)
            })
        }
        catch (error) {
            console.log(error)
            return
        }
    })
    
    app.get('/getownerbyocitizenid/:id', function (req, res) {
        try {
            db.query(`SELECT * FROM owner WHERE Ocitizenid = ` + req.params.id, (err, result, f) => {
                if(err) throw err
                res.send(result)
            })
        }
        catch (error) {
            console.log(error)
            return
        }
    })
    
    app.post('/getownerbyocitizenid', function (req, res) {
        try {
            db.query(`SELECT * FROM owner WHERE Ocitizenid LIKE '${req.body.Ocitizenid}'`,
            (err, result, f) => {
                if(err) throw err
                if (result.length > 0) {
                    res.send({ status: false })
                } else {
                    res.send({ status: true })
                }
            })
        }
        catch (error) {
            console.log(error)
        }
    })
    
    app.get('/ownerforcompany', function (req, res) {
        db.query(`SELECT Oid, CONCAT(Ofirstname, ' ', Olastname) as Oname FROM owner`, (err, result, f) => {
            if(err) throw err
            res.send(result)
        })
    })

    app.get('/ownergetid/:id', function (req, res) {
        db.query(`SELECT * FROM owner
                INNER JOIN prefix
                ON prefix.Prefixid = owner.Prefixid
                WHERE Oid = ` + req.params.id, (err, result, f) => {
            if(err) throw err
            res.send(result)
        })
    })

    app.post('/newowner', function (req, res) {
        try {
            db.query(`
                INSERT INTO owner 
                (
                    Ocitizenid, Prefixid, Ofirstname, 
                    Olastname, Oage, Onationality, 
                    Ohomeno, Omoo, Osoi, Oroad, 
                    Ovillage, SDTid, Did, 
                    Pid, Otel, Oemail
                )
                VALUES 
                (
                    '${req.body.Ocitizenid}', '${req.body.Prefixid}', '${req.body.Ofirstname}', 
                    '${req.body.Olastname}', '${req.body.Oage}', '${req.body.Onationality}', 
                    '${req.body.Ohomeno}', '${req.body.Omoo}', '${req.body.Osoi}', 
                    '${req.body.Oroad}', '${req.body.Ovillage}', '${req.body.SDTid}', 
                    '${req.body.Did}', '${req.body.Pid}', '${req.body.Otel}', '${req.body.Oemail}'
                )
            `, (err, result, f) => {
                if (err) throw err
                db.query('SELECT LAST_INSERT_ID() as Oid', (err2, result2, f2) => {
                    if (err2) throw err2
                    res.send({
                        Oid: result2[0].Oid,
                        status: 'success'
                    })
                })
            })    
        } catch (error) {
            console.log(error)
        }
    })

    app.post('/updateowner/:id', function (req, res) {
        console.log(req.body)
        db.query(`
            UPDATE owner
            SET 
                Ocitizenid = '${req.body.Ocitizenid}', 
                Prefixid = '${req.body.Prefixid}',
                Ofirstname = '${req.body.Ofirstname}', 
                Olastname = '${req.body.Olastname}',
                Oage = '${req.body.Oage}', 
                Onationality = '${req.body.Onationality}', 
                Ohomeno = '${req.body.Ohomeno}', 
                Omoo = '${req.body.Omoo}', 
                Osoi = '${req.body.Osoi}', 
                Oroad = '${req.body.Oroad}', 
                Ovillage = '${req.body.Ovillage}', 
                SDTid = '${req.body.SDTid}', 
                Did = '${req.body.Did}', 
                Pid = '${req.body.Pid}', 
                Otel = '${req.body.Otel}', 
                Oemail = '${req.body.Oemail}'
            WHERE Oid = ` + req.params.id)        
        res.send({
            status: 'success'
        })
    })

    app.post('/deleteowner/:id', function (req, res) {
        console.log(req.body)
        db.query(`
            DELETE FROM owner
            WHERE Oid = ` + req.params.id)        
        res.send({
            status: 'success'
        })
    })
}