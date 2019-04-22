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
    
    app.get('/getusers', function (req, res) {
        try {
            db.query(`
                SELECT Uid, 
                    Uusername, 
                    Upassword, 
                    Ufirstname, 
                    Ulastname, 
                    Ustatus 
                FROM users `,
            (err, result, f) => {
                if(err) throw err
                res.send(result)                
            })
        } catch (error) {
            console.log(error)
            return
        }        
    })

    app.get('/getusers/:id', function (req, res) {
        try {
            db.query(`
                SELECT Uid, 
                    Uusername, 
                    Upassword,
                    Prefixid, 
                    Ufirstname, 
                    Ulastname, 
                    Ustatus 
                FROM users  WHERE Uid = ` + req.params.id,
            (err, result, f) => {
                if(err) throw err
                res.send(result)                
            })
        } catch (error) {
            console.log(error)
            return
        }
        
    })

    app.post('/addusers', function (req, res) {
        try {
            db.query(`
            INSERT INTO users 
                (
                    Uusername,
                    Upassword,
                    Prefixid,
                    Ufirstname,
                    Ulastname,
                    Ustatus
                ) VALUES (
                    '${req.body.Uusername}',
                    '${req.body.Upassword}',
                    '${req.body.Prefixid}',
                    '${req.body.Ufirstname}',
                    '${req.body.Ulastname}',
                    '${req.body.Ustatus}'
                )
                `)        
            res.send({
                status: 'success'
            })
        } catch (error) {
            console.log(error)
            return
        }
    })

    app.post('/updateusers/:id', function (req, res) {
        try {
            db.query(`
                UPDATE users
                SET Uusername = '${req.body.Uusername}',
                    Upassword = '${req.body.Upassword}',
                    Prefixid = '${req.body.Prefixid}',
                    Ufirstname = '${req.body.Ufirstname}',
                    Ulastname = '${req.body.Ulastname}',
                    Ustatus = '${req.body.Ustatus}'
                WHERE Uid = ` + req.params.id)        
            res.send({
                status: 'success'
            })
        }
        catch (error) {
            console.log(error)
            return
        }
    })

    app.post('/deleteusers/:id', function (req, res) {
        db.query(`
            DELETE FROM users
            WHERE Uid = ` + req.params.id)        
        res.send({
            status: 'success'
        })
    })
}