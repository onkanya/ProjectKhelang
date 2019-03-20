var db = require('../config')
var moment = require('moment');

module.exports = function(app) {
    app.post('/newrequest', function (req, res) {
        try {
            db.query(`
                INSERT INTO requestlicense
                (
                    RLTid, Cid, RLnorequest,
                    Prefixid, RLfname,
                    RLlname, RLage, RLnationality,
                    RLhomeno, RLmoo, RLsoi,
                    RLroad, RLvillage, SDTid,
                    Did, Pid, RLtel,
                    RLemail, RLdetail, Uid
                ) VALUES (
                    '${req.body.RLTid}', '${req.body.Cid}', '${req.body.RLnorequest}',
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
            db.query(`
                UPDATE requestlicense
                SET RLTid = '${req.body.RLTid}',
                    Cid = '${req.body.Cid}',
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

    app.get('/getrequest', function (req, res) {
        db.query(`SELECT * FROM requestlicense 
                    LEFT JOIN company ON company.Cid = requestlicense.Cid
                    LEFT JOIN requestlicensetype ON requestlicensetype.RLTid = requestlicense.RLTid`, (err, result, f) => {
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
}