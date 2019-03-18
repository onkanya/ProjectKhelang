var db = require('../config')

module.exports = function(app) {
    app.get('/requestlicensetype/', function (req, res) {
        db.query('SELECT * FROM requestlicensetype', (err, result, f) => {
            if(err) throw err
            res.send(result)
        })
    })

}