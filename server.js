const express = require('express')
const app = express()
const port = 5003
const bodyParser = require('body-parser')
var cors = require('cors')
var Prefix = require('./routes/prefix')
var Province = require('./routes/province')
var District = require('./routes/district')
var SubDistrict = require('./routes/subdistrict')
var Users = require('./routes/users')
var Owners = require('./routes/owner')
var CompanyType = require('./routes/companytype')
var Company = require('./routes/company')

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

Prefix(app)
Province(app)
District(app)
SubDistrict(app)
Users(app)
Owners(app)
CompanyType(app)
Company(app)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))