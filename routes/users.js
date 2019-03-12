var db = require('../config')

module.exports = function(app) {

    app.post('/users', function (req, res) {
        db.query(`
            SELECT Uid, 
                Uusername, 
                Upassword, 
                Ufirstname, 
                Ulastname, 
                Ustatus 
            FROM users 
            WHERE Uusername = '${req.body.Uusername}'
            AND   Upassword = '${req.body.Upassword}'`,
            (err, result, f) => {
                if(err) throw err
                console.log(result)
                if (result.length > 0) {
                    obj = {
                        status: true,
                        user: result
                    }
                    res.send(obj)
                } else {
                    obj = {
                        status: false
                    }
                    res.send(obj)
                }
        })
    })

}