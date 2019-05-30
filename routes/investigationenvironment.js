var db = require('../config')

module.exports = function(app) {
    app.post('/newhcie', function (req, res) {
        const reqData = req.body
        console.log(reqData)
        try {
            db.query(`
            INSERT INTO hcienvironment 
                (
                    HCIEbuildprotect,
                    HCIEbuildprotectnoted,
                    HCIEbuilddoor,
                    HCIEbuilddoornoted,
                    HCIEbuildoverview,
                    HCIEbuildoverviewnoted,
                    HCIEsoundprotect,
                    HCIEsoundprotectnoted,
                    HCIEventilate,
                    HCIEventilateenough,
                    HCIEventilateenoughnoted,
                    HCIEventilatesmoking,
                    HCIEventilatesmokingnoted,
                    HCIElightingenough,
                    HCIElightingenoughnoted,
                    HCIElightinglaser,
                    HCIElightinglasernoted,
                    HCIEsecureemergency,
                    HCIEsecureemergencynoted,
                    HCIEsecurealarm,
                    HCIEsecurealarmnoted,
                    HCIEsecurefire,
                    HCIEsecurefirenoted,
                    HCIEsecurecrowded,
                    HCIEsecurecrowdednoted
                ) VALUES (
                    '${boolToIntToString(reqData.HCIEbuildprotect)}',
                    '${reqData.HCIEbuildprotectnoted}',
                    '${boolToIntToString(reqData.HCIEbuilddoor)}',
                    '${reqData.HCIEbuilddoornoted}',
                    '${boolToIntToString(reqData.HCIEbuildoverview)}',
                    '${reqData.HCIEbuildoverviewnoted}',
                    '${boolToIntToString(reqData.HCIEsoundprotect)}',
                    '${reqData.HCIEsoundprotectnoted}',
                    '${reqData.HCIEventilate}',
                    '${boolToIntToString(reqData.HCIEventilateenough)}',
                    '${reqData.HCIEventilateenoughnoted}',
                    '${boolToIntToString(reqData.HCIEventilatesmoking)}',
                    '${reqData.HCIEventilatesmokingnoted}',
                    '${boolToIntToString(reqData.HCIElightingenough)}',
                    '${reqData.HCIElightingenoughnoted}',
                    '${boolToIntToString(reqData.HCIElightinglaser)}',
                    '${reqData.HCIElightinglasernoted}',
                    '${boolToIntToString(reqData.HCIEsecureemergency)}',
                    '${reqData.HCIEsecureemergencynoted}',
                    '${boolToIntToString(reqData.HCIEsecurealarm)}',
                    '${reqData.HCIEsecurealarmnoted}',
                    '${boolToIntToString(reqData.HCIEsecurefire)}',
                    '${reqData.HCIEsecurefirenoted}',
                    '${boolToIntToString(reqData.HCIEsecurecrowded)}',
                    '${reqData.HCIEsecurecrowdednoted}'
                )`, (err, result, f) => {
                    if (err) throw err
                    db.query('SELECT LAST_INSERT_ID() as HCIEid', (err2, result2, f2) => {
                        if (err2) throw err2
                        res.send({
                            HCIEid: result2[0].HCIEid,
                            status: 'success'
                        })
                    })
                })
        } catch (error) {
            console.log(error)
            return
        }
    })

    app.post('/updatehcienvironment/:id', function (req, res) {
        const reqData = req.body
        try {
            db.query(`
                UPDATE hcienvironment
                SET HCIEbuildprotect = '${boolToIntToString(reqData.HCIEbuildprotect)}',
                    HCIEbuildprotectnoted = '${reqData.HCIEbuildprotectnoted}',
                    HCIEbuilddoor = '${boolToIntToString(reqData.HCIEbuilddoor)}',
                    HCIEbuilddoornoted = '${reqData.HCIEbuilddoornoted}',
                    HCIEbuildoverview = '${boolToIntToString(reqData.HCIEbuildoverview)}',
                    HCIEbuildoverviewnoted = '${reqData.HCIEbuildoverviewnoted}',
                    HCIEsoundprotect = '${boolToIntToString(reqData.HCIEsoundprotect)}',
                    HCIEsoundprotectnoted = '${reqData.HCIEsoundprotectnoted}',
                    HCIEventilate = '${reqData.HCIEventilate}',
                    HCIEventilateenough = '${boolToIntToString(reqData.HCIEventilateenough)}',
                    HCIEventilateenoughnoted = '${reqData.HCIEventilateenoughnoted}',
                    HCIEventilatesmoking = '${boolToIntToString(reqData.HCIEventilatesmoking)}',
                    HCIEventilatesmokingnoted = '${reqData.HCIEventilatesmokingnoted}',
                    HCIElightingenough = '${boolToIntToString(reqData.HCIElightingenough)}',
                    HCIElightingenoughnoted = '${reqData.HCIElightingenoughnoted}',
                    HCIElightinglaser = '${boolToIntToString(reqData.HCIElightinglaser)}',
                    HCIElightinglasernoted = '${reqData.HCIElightinglasernoted}',
                    HCIEsecureemergency = '${boolToIntToString(reqData.HCIEsecureemergency)}',
                    HCIEsecureemergencynoted = '${reqData.HCIEsecureemergencynoted}',
                    HCIEsecurealarm = '${boolToIntToString(reqData.HCIEsecurealarm)}',
                    HCIEsecurealarmnoted = '${reqData.HCIEsecurealarmnoted}',
                    HCIEsecurefire = '${boolToIntToString(reqData.HCIEsecurefire)}',
                    HCIEsecurefirenoted = '${reqData.HCIEsecurefirenoted}',
                    HCIEsecurecrowded = '${boolToIntToString(reqData.HCIEsecurecrowded)}',
                    HCIEsecurecrowdednoted = '${reqData.HCIEsecurecrowdednoted}'
                WHERE HCIEid = ` + req.params.id
            )
            res.send({
                status: 'success'
            })
        } catch (error) {
            console.log(error)
            return
        }
    })
}

function boolToIntToString (bool) {
    return bool ? '1' : '0'
}
