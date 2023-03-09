const mongoose = require('mongoose')
const database = "todoapp"
const connectionString = `mongodb+srv://${process.env.MONGOUSERNAME}:${process.env.MONGOPASSWORD}@mycluster.xasbj2m.mongodb.net/${database}?retryWrites=true&w=majority`
mongoose.set('strictQuery', false);
mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
mongoose.connection.once('open', () => {
    console.log('mongo connected');
})