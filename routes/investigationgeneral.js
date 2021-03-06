var db = require('../config')

module.exports = function(app) {
    app.post('/newhcig', function(req, res) {
        try {
            db.query(`
            INSERT INTO hcigeneral (HCIGbuilding, HCIGdayopen, HCIGtimeopen, HCIGtimeclose)
            VALUES ('${req.body.HCIGbuilding}', '${req.body.HCIGdayopen}', '${req.body.HCIGtimeopen}', '${req.body.HCIGtimeclose}')
            `, (err, result, f) => {
                if (err) throw err
                db.query('SELECT LAST_INSERT_ID() as HCIGid', (err2, result2, f2) => {
                    if (err2) throw err2
                    res.send({
                        HCIGid: result2[0].HCIGid,
                        status: 'success'
                    })
                })
            })
        } catch (error) {
            console.log(error)
        }
    })

    app.post('/updatehcigeneral/:id', function (req, res) {
        try {
            db.query(`
                UPDATE hcigeneral
                SET HCIGbuilding = '${req.body.HCIGbuilding}', 
                    HCIGdayopen = '${req.body.HCIGdayopen}', 
                    HCIGtimeopen = '${req.body.HCIGtimeopen}', 
                    HCIGtimeclose = '${req.body.HCIGtimeclose}'
                WHERE HCIGid = ` + req.params.id
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