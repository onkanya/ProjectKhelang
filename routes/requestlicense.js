var db = require('../config')
var moment = require('moment');

module.exports = function(app) {
    app.post('/newrequest', function (req, res) {
        try {
            db.query(`
                INSERT INTO requestlicense
                (
                    Cid, RLnorequest,
                    Prefixid, RLfname,
                    RLlname, RLage, RLnationality,
                    RLhomeno, RLmoo, RLsoi,
                    RLroad, RLvillage, SDTid,
                    Did, Pid, RLtel,
                    RLemail, RLdetail, Uid
                ) VALUES (
                    '${req.body.Cid}', '${req.body.RLnorequest}',
                    '${req.body.Prefixid}', '${req.body.RLfname}',
                    '${req.body.RLlname}', '${req.body.RLage}', '${req.body.RLnationality}',
                    '${req.body.RLhomeno}', '${req.body.RLmoo}', '${req.body.RLsoi}',
                    '${req.body.RLroad}', '${req.body.RLvillage}', '${req.body.SDTid}',
                    '${req.body.Did}', '${req.body.Pid}', '${req.body.RLtel}',
                    '${req.body.RLemail}', '${req.body.RLdetail}', '${req.body.Uid}'
                )
            `)
            res.send({
                status: 'success'
            })
        } catch (error) {
            console.log(error)
            return
        }
    })
    
    app.post('/updaterequest/:id', function (req, res) {
        try {
            console.log(req.body.RLdate)
            db.query(`
                UPDATE requestlicense
                SET Cid = '${req.body.Cid}',
                    RLnorequest = '${req.body.RLnorequest}',
                    Prefixid = '${req.body.Prefixid}',
                    RLfname = '${req.body.RLfname}',
                    RLlname = '${req.body.RLlname}',
                    RLage = '${req.body.RLage}',
                    RLnationality = '${req.body.RLnationality}',
                    RLhomeno = '${req.body.RLhomeno}',
                    RLmoo = '${req.body.RLmoo}',
                    RLsoi = '${req.body.RLsoi}',
                    RLroad = '${req.body.RLroad}',
                    RLvillage = '${req.body.RLvillage}',
                    SDTid = '${req.body.SDTid}',
                    Did = '${req.body.Did}',
                    Pid = '${req.body.Pid}',
                    RLtel = '${req.body.RLtel}',
                    RLemail = '${req.body.RLemail}',
                    RLdetail = '${req.body.RLdetail}'
                WHERE RLid = ` + req.params.id)
            res.send({
                status: 'success'
            })
        } catch (error) {
            console.log(error)
        }
    })
    
    app.post('/deleterequest/:id', function (req, res) {
        try {
            console.log(req.body)
            db.query(`
                DELETE FROM requestlicense
                WHERE RLid = ` + req.params.id)
            res.send({
                status: 'success'
            })
        } catch (error) {
            console.log(error)
            return
        }
    })
    
    app.post('/confirmrequest/:id', function (req, res) {
        try {
            console.log(req.body)
            db.query(`
                UPDATE requestlicense
                SET RLstatus = '${req.body.RLstatus}',
                    RLnoted = '${req.body.RLnoted}',
                    RLgetlicensedate = '${req.body.RLgetlicensedate}'
                WHERE RLid = ` + req.params.id)
            res.send({
                status: 'success'
            })
        } catch (error) {
            console.log(error)
            return
        }
    })

    app.get('/getrequest', function (req, res) {
        db.query(`SELECT * FROM requestlicense 
                    LEFT JOIN company ON company.Cid = requestlicense.Cid`, (err, result, f) => {
            if(err) throw err
            result.forEach(e => {
                e.RLdate = moment(e.RLdate).format('DD-MM-YYYY')
            })
            res.send(result)
        })
    })
    
    app.get('/getrequest/:id', function (req, res) {
        try {
            db.query(`SELECT * FROM requestlicense WHERE RLid = ` + req.params.id , (err, result, f) => {
                if(err) throw err
                result.forEach(e => {
                    e.RLdate = moment(e.RLdate).format('DD-MM-YYYY')
                    e.RLgetlicensedate = moment(e.RLgetlicensedate).format('DD-MM-YYYY')
                })
                res.send(result)
            })
        }
        catch (error) {
            console.log(error)
            return
        }
    })
    
    app.get('/getrequestforinvestigation', function (req, res) {
        try {
            db.query(`SELECT requestlicense.RLid, RLnorequest, RLgetlicensedate, Cname, RLfname, RLlname, RLstatus,HCISresult
            FROM requestlicense 
            INNER JOIN company ON company.Cid = requestlicense.Cid
            LEFT JOIN hazardcompanyinvestigation ON hazardcompanyinvestigation.RLid = requestlicense.RLid
            LEFT JOIN hcisummary ON hcisummary.HCISid = hazardcompanyinvestigation.HCISid
            WHERE RLstatus > 2` , (err, result, f) => {
                if(err) throw err
                result.forEach(e => {
                    e.RLdate = moment(e.RLdate).format('YYYY-MM-DD')
                })
                res.send(result)
            })
        }
        catch (error) {
            console.log(error)
            return
        }
    })
    
    app.get('/getrequestforlicense', function (req, res) {
        try {
            db.query(`SELECT RLid, RLnorequest, RLgetlicensedate, Cname, RLfname, RLlname, RLstatus
            FROM requestlicense 
            INNER JOIN company
            ON company.Cid = requestlicense.Cid
            WHERE RLstatus > 2` , (err, result, f) => {
                if(err) throw err
                result.forEach(e => {
                    e.RLdate = moment(e.RLdate).format('YYYY-MM-DD')
                })
                res.send(result)
            })
        }
        catch (error) {
            console.log(error)
            return
        }
    })

    app.get('/getRLid/:id', function (req, res) {
        try {
            db.query(`SELECT Cid, CONCAT(RLfname, ' ', RLlname) as RLname FROM requestlicense WHERE RLid = ` + req.params.id , (err, result, f) => {
                if(err) throw err
                res.send(result)
            })
        }
        catch (error) {
            console.log(error)
            return
        }
    })
}