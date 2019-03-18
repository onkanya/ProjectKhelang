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
    
    app.get('/getcompanytype/:id', function (req, res) {
        db.query('SELECT * FROM `companytype` WHERE CTid = ' + req.params.id, (err, result, f) => {
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
    
    app.post('/updatecompanytype/:id', function (req, res) {
        try {
            db.query(`
            UPDATE companytype 
            SET CTname = '${req.body.CTname}' 
            WHERE CTid = ` + req.params.id)        
            res.send({
                status: 'success'
            })
        } catch (error) {
            return
        }
    })

    app.post('/deleteCTid/:id', function (req, res) {
        try {
            db.query(`
            DELETE FROM companytype 
            WHERE CTid = ` + req.params.id)        
            res.send({
                status: 'success'
            })
        } catch (error) {
            return
        }
    })
    
}