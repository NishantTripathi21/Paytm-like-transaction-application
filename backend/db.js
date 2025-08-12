const mongoose = require("mongoose");
mongoose.connect("");

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: String,
    username: {
        type: String,
        unique: true,
        minLenght: 3,
        maxLenght: 20
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
