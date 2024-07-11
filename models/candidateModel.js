const mongoose = require('mongoose')

const candidateSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    partyName: {
        type: String,
        required: true,
        uppercase: true
    },
    partyImage: {
        type: String,
    },
    candidateImage: {
        type: String,
    },
    votes: {
        type: Number,
        default: 0
    },
}, { timestamps: true });

candidateSchema.pre('save', function(next) {
    const candidate = this;
    
    // Capitalize the first letter of each word in the fullName
    candidate.fullName = capitalizeEachWord(candidate.fullName);

    next();
});

// Function to capitalize the first letter of each word in a string
function capitalizeEachWord(str) {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
}

const candidateModel = mongoose.model('candidate', candidateSchema);

module.exports = candidateModel;

