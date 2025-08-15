const mongoose = require("mongoose");
<<<<<<< HEAD
mongoose.connect("mongodb://localhost:27017/PaytmBD");
=======
mongoose.connect("");
>>>>>>> 35ad791dc5b7938bbd96f40192dfae2476c3ddd7

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: String,
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        minLenght: 8,
        required: true
    }
});


const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userDb',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});

const Account = mongoose.model('Account', accountSchema);

const userDb = mongoose.model("users", userSchema);

module.exports={
    userDb,
    Account
}
