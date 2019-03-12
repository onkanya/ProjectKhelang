var db = require('../config')

module.exports = function(app) {
    app.get('/subdistrict/:id', function (req, res) {
        db.query('SELECT SDTid, SDTname_th FROM subdistrict WHERE Did = ' + req.params.id, (err, result, f) => {
            if(err) throw err
            result.forEach(e => {
                e.SDTid = parseInt(e.SDTid)
            })
            res.send(result)
        })
    })

}