const express = require('express');
const { userSignUp, userLogin, signOut, verifyEmail, resendVerificationEmail, changePassword, resetPassword, forgotPassword } = require('../controllers/usercontroller');
const { getAllUsers, getUsersThatVoted, getAUser } = require('../controllers/candidateController');
const router = express.Router();

// Get all users route
router.get('/users', getAllUsers);

// Get all users that voted route
router.get('/users/voted', getUsersThatVoted);


router.route('/sign-up').post(userSignUp)

router.route('/log-in').post(userLogin)

router.route('/user').get(getAUser)

// router.route('/log-out/:userId').post(authenticate, signOut)

router.route("/users/verify-email/:token")
    .get(verifyEmail);

router.route("/users/resend-verification-email")
    .post(resendVerificationEmail);

router.route('/users/change-password/:token')
    .post(changePassword);

router.route('/users/reset-password/:token')
    .post(resetPassword);

router.route('/users/forgot-password')
    .post(forgotPassword);

module.exports = router;
