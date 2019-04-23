var db = require('../config')

module.exports = function(app) {
    app.post('/newhcis', function(req, res) {
        try {
            db.query(`
            INSERT INTO hcisummary (HCISresult, HCIScomment) VALUES ('${req.body.HCISresult}', '${req.body.HCIScomment}')
            `, (err, result, f) => {
                if (err) throw err
                db.query('SELECT LAST_INSERT_ID() as HCISid', (err2, result2, f2) => {
                    if (err2) throw err2
                    res.send({
                        HCISid: result2[0].HCISid,
                        status: 'success'
                    })
                })
            })
        } catch (error) {
            console.log(error)
        }
    })

    app.post('/updatehcisummary/:id', function (req, res) {
        try {
            db.query(`
                UPDATE hcisummary
                SET HCISresult  = '${req.body.HCISresult}', 
                    HCIScomment = '${req.body.HCIScomment}'
                WHERE HCISid = ` + req.params.id
            )
            res.send({
                status: 'success'
            })
        } catch (error) {
            console.log(error)
            return
        }
    })
}
