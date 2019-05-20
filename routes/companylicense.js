var db = require('../config')
var moment = require('moment');
module.exports = function(app) {

    app.post('/newcompanylicense', function (req, res) {
        try {
            // const expire = moment(req.body.LCstartdate).add(1, 'years').format('YYYY-MM-DD')
            // const expire = moment().add(1, 'years').format('YYYY-MM-DD')
            db.query('SELECT LCnolicense FROM licensecompany ORDER BY LCid desc LIMIT 1',
            (err, result, f) => {
                let strArr = ['']
                let year = ''
                let num = ''
                let currentDate = new Date()
                if (result.length > 0) {
                    strArr = result[0].LCnolicense.split('/')
                    num = strArr[0]
                    year = strArr[1]

                    if (year === String(currentDate.getFullYear() + 543)) {
                        num++
                    } else {
                        num = 1
                    }
                } else {
                    num = 1
                    year = currentDate.getFullYear() + 543
                }
                db.query(`
                    INSERT INTO licensecompany 
                    (
                        LCnolicense, Cid, LCreceiptno, LCreceiptdate, LCexpiredate, BNo
                    )
                    VALUES 
                    (
                        '${num}/${year}', '${req.body.Cid}', '${req.body.LCreceiptno}', '${req.body.LCreceiptdate}',
                        DATE_ADD(CURRENT_TIMESTAMP, INTERVAL 1 YEAR), '${req.body.BNo}'
                    )
                `, (err, result, f) => {
                    console.log(result)
                    if (err) throw err
                    db.query('SELECT LAST_INSERT_ID() as LCid', (err2, result2, f2) => {
                        if (err2) throw err2
                        res.send({
                            LCid: result2[0].LCid,
                            status: 'success'
                        })
                    })
                })
            })
        } catch (error) {
            console.log(error)
        }
    })

    app.post('/renewcompanylicense', function (req, res) {
        try {
            const expire = moment(req.body.LCstartdate).add(1, 'years').format('YYYY-MM-DD')
            db.query('SELECT LCnolicense FROM licensecompany ORDER BY LCid desc LIMIT 1',
            (err, result, f) => {
                let strArr = ['']
                let year = ''
                let num = ''
                let currentDate = new Date()
                if (result.length > 0) {
                    strArr = result[0].LCnolicense.split('/')
                    num = strArr[0]
                    year = strArr[1]

                    if (year === String(currentDate.getFullYear() + 543)) {
                        num++
                    } else {
                        num = 1
                    }
                } else {
                    num = 1
                    year = currentDate.getFullYear() + 543
                }
                db.query(`
                    INSERT INTO licensecompany 
                    (
                        LCnolicense, Cid, LCreceiptno, LCreceiptdate, LCstartdate, LCexpiredate, BNo
                    )
                    VALUES 
                    (
                        '${num}/${year}', '${req.body.Cid}', '${req.body.LCreceiptno}', '${req.body.LCreceiptdate}', '${req.body.LCstartdate}',
                        '${expire}', '${req.body.BNo}'
                    )
                `, (err, result, f) => {
                    if (err) throw err
                    db.query('SELECT LAST_INSERT_ID() as LCid', (err2, result2, f2) => {
                        if (err2) throw err2
                        res.send({
                            LCid: result2[0].LCid,
                            status: 'success'
                        })
                    })
                })
            })
        } catch (error) {
            console.log(error)
        }
    })

    app.get('/getlicense/:id', function (req, res) {
        try {
            db.query(`
                SELECT LCnolicense, LCreceiptno, LCreceiptdate, LCstartdate, LCexpiredate, BName, BPosition, company.Cid,
                companytype.CTname, Cname, Carea, Cmachine, Cemployee, LFname, LFfee, company.Chomeno, company.Cmoo, company.Csoi,
                company.Croad, company.Cvillage, company.SDTid AS CSDTid, company.Did AS CDid, company.Pid AS CPid, Ctel, Cnoted,
                CONCAT(Ofirstname, ' ', Olastname) AS Oname, Onationality, Otel, Ohomeno, Omoo, Osoi, Oroad, Ovillage, owner.SDTid AS OSDTid, owner.Did AS ODid, owner.Pid AS OPid 
                FROM licensecompany
                INNER JOIN boss ON boss.BNo = licensecompany.BNo
                INNER JOIN company ON licensecompany.Cid = company.Cid
                INNER JOIN companytype ON company.CTid = companytype.CTid
                INNER JOIN licensefee ON company.LFid = licensefee.LFid
                INNER JOIN owner ON company.Oid = owner.Oid
                WHERE LCid = ` + req.params.id ,
            (err, result, f) => {
                if(err) throw err
                res.send(result)                
            })
        } catch (error) {
            console.log(error)
            return
        }        
    })
    
    app.get('/getlicensebycompany/:id', function (req, res) {
        try {
            db.query(`
            SELECT LCid, LCnolicense, company.Cid, Cname, LCstartdate, licensecompany.LCexpiredate, LCreceiptno, LCreceiptdate, LFfee 
            FROM licensecompany
            INNER JOIN company ON licensecompany.Cid = company.Cid
            INNER JOIN licensefee ON licensefee.LFid = company.LFid
            WHERE company.Cid = ` + req.params.id + ` ORDER BY LCid desc`,
            (err, result, f) => {
                if(err) throw err
                // console.log(result)
                res.send(result)                
            })
        } catch (error) {
            console.log(error)
            return
        }
    })

    app.get('/getlcbycom/:id', function (req, res) {
        try {
            db.query(`
                SELECT LCid, LCnolicense, LCreceiptno, LCreceiptdate, LCstartdate, LCexpiredate, BName, BPosition, company.Cid,
                companytype.CTname, Cname, Carea, Cmachine, Cemployee, LFname, LFfee, company.Chomeno, company.Cmoo, company.Csoi,
                company.Croad, company.Cvillage, company.SDTid AS CSDTid, company.Did AS CDid, company.Pid AS CPid, Ctel, Cnoted,
                CONCAT(Ofirstname, ' ', Olastname) AS Oname, Onationality, Otel, Ohomeno, Omoo, Osoi, Oroad, Ovillage, owner.SDTid AS OSDTid, owner.Did AS ODid, owner.Pid AS OPid 
                FROM licensecompany
                INNER JOIN boss ON boss.BNo = licensecompany.BNo
                INNER JOIN company ON licensecompany.Cid = company.Cid
                INNER JOIN companytype ON company.CTid = companytype.CTid
                INNER JOIN licensefee ON company.LFid = licensefee.LFid
                INNER JOIN owner ON company.Oid = owner.Oid
                WHERE company.Cid = ` + req.params.id ,
            (err, result, f) => {
                if(err) throw err
                // console.log(result)
                res.send(result)             
            })
        } catch (error) {
            console.log(error)
            return
        }        
    })
    
    app.get('/getlicensecompany', function (req, res) {
        try {
            db.query(`
                SELECT LCid, LCnolicense, company.Cid, Cname, LCstartdate, LCexpiredate, LCreceiptno, LFfee 
                FROM licensecompany
                INNER JOIN company ON licensecompany.Cid = company.Cid
                INNER JOIN licensefee ON licensefee.LFid = company.LFid
                ORDER BY LCid desc`,
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