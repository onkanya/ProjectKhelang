var db = require('../config')

module.exports = function(app) {
    app.get('/district/:id', function (req, res) {
        db.query('SELECT Did, Dname_th FROM district WHERE Pid = ' + req.params.id, (err, result, f) => {
            if(err) throw err
            res.send(result)
        })
    })

    app.get('/getdistrict/:id', function (req, res) {
        try {
            db.query(`
                SELECT Dname_th FROM district
                WHERE Did = ` + req.params.id ,
            (err, result, f) => {
                if(err) throw err
                res.send(result)                
            })
        } catch (error) {
            console.log(error)
            return
        }        
    })

}