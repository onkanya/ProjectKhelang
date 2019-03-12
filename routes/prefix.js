var db = require('../config')

module.exports = function(app) {

    app.get('/prefix', function (req, res) {
        db.query('SELECT Prefixid, Prefixname FROM prefix', (err, result, f) => {
            if(err) throw err
            res.send(result)
        })
    })

}