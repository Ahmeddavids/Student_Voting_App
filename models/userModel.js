const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    gender: {
        type: String,
        required: true,
        enum: ["Female", "Male"]
    },
    phoneNumber: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String,
        default: null
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    availableVotes: {
        type: Number,
        default: 1
    },
}, { timestamps: true });

userSchema.pre('save', function(next) {
    const user = this;
    
    // Capitalize the first letter of each word in the fullName
    user.fullName = capitalizeEachWord(user.fullName);

    // const today = new Date();
    // const birthDate = new Date(user.dateOfBirth);
    // let age = today.getFullYear() - birthDate.getFullYear();
    // const monthDifference = today.getMonth() - birthDate.getMonth();

    // if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
    //     age--;
    // }

    // if (age < 18) {
    //     const error = new Error('User must be at least 18 years old');
    //     next(error);
    // } else {
        next();
    // }
});

// Function to capitalize the first letter of each word in a string
function capitalizeEachWord(str) {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
}

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;

