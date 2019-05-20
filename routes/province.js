var db = require('../config')

module.exports = function(app) {

    app.get('/province', function (req, res) {
        db.query('SELECT Pid, Pname_th FROM province ORDER BY Pname_th', (err, result, f) => {
            if(err) throw err
            res.send(result)
        })
    })

    app.get('/getprovince/:id', function (req, res) {
        try {
            db.query(`
                SELECT Pname_th FROM province
                WHERE Pid = ` + req.params.id ,
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