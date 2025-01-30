const express = require('express');
const { userSignUp, userLogin, signOut, verifyEmail, resendVerificationEmail, changePassword, resetPassword, forgotPassword } = require('../controllers/userController');
const { getAllUsers, getUsersThatVoted, getAUser } = require('../controllers/candidateController');
const { authenticate } = require('../middleware/authorization');
const router = express.Router();

// Get all users route
router.get('/user', getAllUsers);

// Get all users that voted route
router.get('/user/voted', getUsersThatVoted);


router.route('/user/sign-up').post(userSignUp)

router.route('/user/log-in').post(userLogin)

router.route('/user/:id').get(getAUser)

router.route('/log-out/:userId').post(authenticate, signOut)

router.route("/user/verify-email/:token")
    .get(verifyEmail);

router.route("/user/resend-verification-email")
    .post(resendVerificationEmail);

router.route('/user/change-password/:token')
    .post(changePassword);

router.route('/user/reset-password/:token')
    .post(resetPassword);

router.route('/user/forgot-password')
    .post(forgotPassword);

module.exports = router;
