const {connect, connection} = require("mongoose");

connect("mongodb://localhost/developerApplicarions", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = connection; 