var db = require('../config')

module.exports = function(app) {
	app.get('/getlicensefee/:id', function (req, res) {
        try {
            db.query('SELECT * FROM `licensefee` WHERE CTid = ' + req.params.id, (err, result, f) => {
                if(err) throw err
                res.send(result)
            })
        } catch (error) {
            console.log(error)
            return
        }
    })
}