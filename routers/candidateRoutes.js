const express = require('express');
const router = express.Router();
const upload = require('../middleware/multerConfig');
const candidateController = require('../controllers/candidateController');
const { authenticate } = require('../middleware/authorization');

// Signup route
router.post('/signup', upload.fields([{ name: 'partyImage', maxCount: 1 }, { name: 'candidateImage', maxCount: 1 }]), candidateController.signup);

// Get all candidates route
router.get('/all', candidateController.getAllCandidates);

// Get all candidates sorted by highest votes route
router.get('/by-votes', candidateController.getCandidatesByVotes);

// Vote for a candidate route
router.post('/vote', authenticate, candidateController.voteCandidate);

// Get one candidate route
router.get('/one/:id', candidateController.getOneCandidate);

module.exports = router;
