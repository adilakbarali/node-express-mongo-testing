const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost:27017/testDB1", {useNewUrlParser: true},
    function (err) {
        if (err) {
            console.log("Failed to connect to server");
        } else {
            console.log("Successfully connected to MongoDB at " + mongoose.uri);
        }
    });

const movieSchema = new Schema ({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date_released:{
        type: Date,
        required: true
    }
});

module.exports = mongoose.model("Movie", movieSchema);


