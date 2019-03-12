var db = require('../config')

module.exports = function(app) {
    app.get('/owner', function (req, res) {
        db.query('SELECT * FROM owner', (err, result, f) => {
            if(err) throw err
            res.send(result)
        })
    })
    
    app.get('/ownerforcompany', function (req, res) {
        db.query(`SELECT Oid, CONCAT(Ofirstname, ' ', Olastname) as Oname FROM owner`, (err, result, f) => {
            if(err) throw err
            res.send(result)
        })
    })

    app.get('/ownergetid/:id', function (req, res) {
        db.query('SELECT * FROM `owner` WHERE Oid = ' + req.params.id, (err, result, f) => {
            if(err) throw err
            res.send(result)
        })
    })

    app.post('/newowner', function (req, res) {
        console.log(req.body)
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
        `)                   
        res.send({
            status: 'success'
        })
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