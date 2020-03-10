const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/NASHA_RIHA',{ useNewUrlParser: true, useUnifiedTopology: true,
useCreateIndex: true })
module.exports={mongoose}


