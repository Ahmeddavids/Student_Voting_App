const candidateModel = require('../models/candidateModel.js');
const userModel = require('../models/userModel');

exports.signup = async (req, res) => {
    try {
        const { fullName, partyName } = req.body;
        
        // Validate required fields
        if (!fullName || !partyName) {
            return res.status(400).json({ message: 'Full name and party name are required.' });
        }

        if (!req.files['partyImage'] || !req.files['candidateImage']) {
            return res.status(400).json({ message: 'Both party image and candidate image are required.' });
        }
        
        // Prepare candidate data
        const candidateData = {
            fullName,
            partyName,
            partyImage: req.files['partyImage'][0].path,
            candidateImage: req.files['candidateImage'][0].path,
        };

        // Create and save the candidate
        const newCandidate = new candidateModel(candidateData);
        await newCandidate.save();
        
        res.status(201).json({ message: 'Candidate registered successfully.', candidate: newCandidate });
            console.log(newCandidate)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: 'An error occurred while registering the candidate.' });
    }
};

// Function to get all candidates
exports.getAllCandidates = async (req, res) => {
    try {
        const candidates = await candidateModel.find();
        res.status(200).json({total: candidates.length, candidates});
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: 'An error occurred while fetching candidates.' });
    }
};

// Function to get all candidates sorted by highest votes
exports.getCandidatesByVotes = async (req, res) => {
    try {
        const candidates = await candidateModel.find().sort({ votes: -1 });
        res.status(200).json(candidates);
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: 'An error occurred while fetching candidates.' });
    }
};


// Function to vote for a candidate
exports.voteCandidate = async (req, res) => {
    try {
        const { userId, candidateId } = req.params;

        // Find user by ID
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Check if user has available votes
        if (user.availableVotes < 1) {
            return res.status(400).json({ message: 'No available votes left.' });
        }

        // Find candidate by ID
        const candidate = await candidateModel.findById(candidateId);
        if (!candidate) {
            return res.status(404).json({ message: 'Candidate not found.' });
        }

        // Increment candidate votes
        candidate.votes += 1;
        await candidate.save();

        // Decrement user available votes
        user.availableVotes -= 1;
        await user.save();

        res.status(200).json({ message: 'Vote cast successfully.', candidate });
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: 'An error occurred while voting.' });
    }
};

// Function to get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find();
        res.status(200).json({ total: users.length, users });
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: 'An error occurred while fetching users.' });
    }
};

// Function to get all users that voted
exports.getUsersThatVoted = async (req, res) => {
    try {
        const users = await userModel.find({ availableVotes: { $lt: 1 } });
        res.status(200).json({ total: users.length, users });
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: 'An error occurred while fetching users that voted.' });
    }
};

// Function to get a users
exports.getAUser = async (req, res) => {
    try {
        const id = req.params.id
        const user = await userModel.findById(id);
        res.status(200).json({ data: user });
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: 'An error occurred while fetching user data.' });
    }
};

// Get one candidate
exports.getOneCandidate = async (req, res) => {
    try {
        const id = req.params.id
        const candidate = await candidateModel.findById(id);
        res.status(200).json({ data: candidate });
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: 'An error occurred while fetching candidate data.' });
    }
};
