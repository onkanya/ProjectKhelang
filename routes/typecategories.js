var db = require('../config')

module.exports = function(app) {
      
    app.get('/getcompanytypecategories/:id', function (req, res) {
        try {
            db.query('SELECT * FROM `companytypecategories` WHERE CTid = ' + req.params.id, (err, result, f) => {
                if(err) throw err
                res.send(result)
            })
        } catch (error) {
            console.log(error)
            return
        }
    })
    
    app.post('/addtypecategories', function (req, res) {
        try {
            db.query(`
                INSERT INTO companytypecategories 
                (
                    CTid, CTCname
                ) VALUES (
                    '${req.body.CTid}', '${req.body.CTCname}'
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
    
    app.get('/getcompanytypecategoriesdetail', function (req, res) {
        try {
            db.query('SELECT * FROM `companytypecategoriesdetail`', (err, result, f) => {
                if(err) throw err
                res.send(result)
            })
        } catch (error) {
            console.log(error)
            return
        }
    })
    
    app.post('/addtypecategoriesdetail', function (req, res) {
        try {
            db.query(`
                INSERT INTO companytypecategoriesdetail 
                (
                    CTCid, CTCDname
                ) VALUES (
                    '${req.body.CTCid}', '${req.body.CTCDname}'
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
    
    app.post('/getdeleteCTCid/:id', function (req, res) {
        try {
            db.query(`
                DELETE FROM companytypecategories 
                WHERE CTCid = ` + req.params.id)        
            res.send({
                status: 'success'
            })
        } catch (error) {
            console.log(error)
            return
        }
    })
    
    app.post('/getdeleteCTCDid/:id', function (req, res) {
        try {
            db.query(`
                DELETE FROM companytypecategories 
                WHERE CTCid = ` + req.params.id)        
            res.send({
                status: 'success'
            })
        } catch (error) {
            console.log(error)
            return
        }
    })
}