var db = require('../config')

module.exports = function(app) {
    app.get('/district/:id', function (req, res) {
        db.query('SELECT Did, Dname_th FROM district WHERE Pid = ' + req.params.id, (err, result, f) => {
            if(err) throw err
            res.send(result)
        })
    })

}