var db = require('../config')

module.exports = function(app) {

    app.get('/company', function (req, res) {
        db.query('SELECT * FROM `company` LEFT JOIN owner ON owner.Oid = company.Oid', (err, result, f) => {
            if(err) throw err
            res.send(result)
        })
    })

    // app.get('/companygetid/:id', function (req, res) {
    //     db.query('SELECT * FROM `company` WHERE CompanyCode = ' + req.params.id , (err, result, f) => {
    //         if(err) throw err
    //         res.send(result)
    //     })
    // })

    app.post('/newcompany', function (req, res) {
        console.log(req.body)
        db.query(`
            INSERT INTO company 
            (
                CTid, CTCid, Oid, 
                Cname, Carea, Cmachine, 
                Cemployee, Cstartdate, Chomeno, 
                Cmoo, Csoi, Croad, 
                Cvillage, SDTid, Did, Pid
            ) VALUES (
                '${req.body.CTid}', '${req.body.CTCid}', '${req.body.Oid}', 
                '${req.body.Cname}', '${req.body.Carea}', '${req.body.Cmachine}', 
                '${req.body.Cemployee}', '${req.body.Cstartdate}', '${req.body.Chomeno}', 
                '${req.body.Cmoo}', '${req.body.Csoi}', '${req.body.Croad}', 
                '${req.body.Cvillage}', '${req.body.SDTid}', '${req.body.Did}', '${req.body.Pid}'
            )
        `)        
        res.send({
            status: 'success'
        })
    })

    // app.post('/updatecompany/:id', function (req, res) {
    //     console.log(req.body)
    //     db.query(`
    //         UPDATE company
    //         SET 
    //             CompanyCode = '${req.body.CompanyCode}',
    //             CompanyName = '${req.body.CompanyName}', 
    //             TypeServiceCode = '${req.body.TypeServiceCode}',
    //             TypeServiceDetail = '${req.body.TypeServiceDetail}', 
    //             OwnerID = '${req.body.OwnerID}', 
    //             CompanyNo = '${req.body.CompanyNo}',
    //             CompanyMoo = '${req.body.CompanyMoo}', 
    //             CompanySoi = '${req.body.CompanySoi}', 
    //             CompanyRoad = '${req.body.CompanyRoad}',
    //             CompanyTumbon = '${req.body.CompanyTumbon}', 
    //             CompanyPhone = '${req.body.CompanyPhone}', 
    //             CompanyArea = '${req.body.CompanyArea}',
    //             CompanyMachine = '${req.body.CompanyMachine}', 
    //             CompanyLabor = '${req.body.CompanyLabor}'
    //         WHERE CompanyCode = ` + req.params.id)        
    //     res.send({
    //         status: 'success'
    //     })
    // })

    app.post('/deletecompany/:id', function (req, res) {
        console.log(req.body)
        db.query(`
            DELETE FROM company
            WHERE Cid = ` + req.params.id)        
        res.send({
            status: 'success'
        })
    })
}