var db = require('../config')

module.exports = function(app) {
    app.post('/newrequest', function (req, res) {
        try {
            query = `
                INSERT INTO requestlicense
                (
                    RLTid, Cid, RLnorequest,
                    RLdate, Prefixid, RLfname,
                    RLlname, RLage, RLnationality,
                    RLhomeno, RLmoo, RLsoi,
                    RLroad, RLvillage, SDTid,
                    Did, Pid, RLtel,
                    RLemail, RLdetail, Uid
                ) VALUES (
                    '${req.body.RLTid}', '${req.body.Cid}', '${req.body.RLnorequest}',
                    '${req.body.RLdate}', '${req.body.Prefixid}', '${req.body.RLfname}',
                    '${req.body.RLlname}', '${req.body.RLage}', '${req.body.RLnationality}',
                    '${req.body.RLhomeno}', '${req.body.RLmoo}', '${req.body.RLsoi}',
                    '${req.body.RLroad}', '${req.body.RLvillage}', '${req.body.SDTid}',
                    '${req.body.Did}', '${req.body.Pid}', '${req.body.RLtel}',
                    '${req.body.RLemail}', '${req.body.RLdetail}', '${req.body.Uid}'
                )
            `
            db.query(query)
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
            res.send(result)
        })
    })
}