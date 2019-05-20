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
    
    app.get('/getupdateLF/:id', function (req, res) {
        try {
            db.query('SELECT * FROM `licensefee` WHERE LFid = ' + req.params.id, (err, result, f) => {
                if(err) throw err
                res.send(result)
            })
        } catch (error) {
            console.log(error)
            return
        }
    })

    app.post('/updateLF/:id', function (req, res) {
        try {
            db.query(`
            UPDATE licensefee 
            SET LFname = '${req.body.LFname}',
                LFfee = '${req.body.LFfee}' 
            WHERE LFid = ` + req.params.id)        
            res.send({
                status: 'success'
            })
        } catch (error) {
            return
        }
    })
    
    app.get('/getLFbyCT/:id', function (req, res) {
        try {
            db.query(`SELECT companytype.CTid, CTname, LFid, LFname, LFfee
            FROM licensefee
            LEFT JOIN companytype ON companytype.CTid = licensefee.CTid
            WHERE licensefee.CTid = ` + req.params.id, (err, result, f) => {
                if(err) throw err
                res.send(result)
            })
        } catch (error) {
            console.log(error)
            return
        }
    })

    app.post('/addlicensefee', function (req, res) {
        try {
            db.query(`
            INSERT INTO licensefee 
                (
                    LFname, CTid, LFfee
                ) VALUES (
                    '${req.body.LFname}', '${req.body.CTid}', '${req.body.LFfee}'
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

    app.post('/deleteLF/:id', function (req, res) {
        try {
            db.query(`
            DELETE FROM licensefee 
            WHERE LFid = ` + req.params.id)        
            res.send({
                status: 'success'
            })
        } catch (error) {
            return
        }
    })
}