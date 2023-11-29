const mongoose = require('mongoose')

const db = mongoose.connect(process.env.MONGO_URI)


if(db) {
    console.log('connection successful')
} else {
    console.warn('connection has issues please check')
}