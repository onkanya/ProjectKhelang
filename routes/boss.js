var db = require('../config')

module.exports = function(app) {

    app.get('/boss', function (req, res) {
        db.query('SELECT * FROM boss', (err, result, f) => {
            if(err) throw err
            res.send(result)
        })
    })

}
