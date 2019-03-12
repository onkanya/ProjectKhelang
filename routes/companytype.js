var db = require('../config')

module.exports = function(app) {

    app.get('/getallcompanytype', function (req, res) {
        try {
            db.query(`
                SELECT
                    CT.CTid, CT.CTname, CTC.CTCid, CTC.CTCname, CTCD.CTCDid, CTCD.CTCDname
                FROM companytype CT
                    LEFT JOIN companytypecategories CTC ON CTC.CTid = CT.CTid
                    LEFT JOIN companytypecategoriesdetail CTCD ON CTC.CTCid = CTCD.CTCid
                GROUP BY CT.CTid, CT.CTname, CTC.CTCid, CTC.CTCname, CTCD.CTCDid, CTCD.CTCDname`,
                (err, result, f) => {
                    if(err) throw err
                    res.send(result)
                }
            )
        } catch (error) {
            console.log(error)
            return
        }
    })

    app.get('/getcompanytype', function (req, res) {
        db.query('SELECT * FROM `companytype`', (err, result, f) => {
            if(err) throw err
            res.send(result)
        })
    })
    
    app.post('/addcompanytype', function (req, res) {
        try {
            db.query(`
            INSERT INTO companytype 
                (
                    CTname
                ) VALUES (
                    '${req.body.CTname}'
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
    
    app.get('/getcompanytypecategories/:id', function (req, res) {
        db.query('SELECT * FROM `companytypecategories` WHERE CTid = ' + req.params.id, (err, result, f) => {
            if(err) throw err
            res.send(result)
        })
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
        db.query('SELECT * FROM `companytypecategoriesdetail`', (err, result, f) => {
            if(err) throw err
            res.send(result)
        })
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
}