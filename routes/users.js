const router = require('express').Router();
const userCtrl = require('../controllers')
const passport = require('passport');
const user = require('../models/user');
const {
    notAuthenticated,
    authenticated,
} = require('../auth/auth');
const multer = require('multer')

// PROFILE PICTURE UPLOAD USING MULTER
// Defining Storage for Profile Images
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/pfImages');
    },
// Restore file extension
filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
},
})
// Multer Upload Parameters for Profile Image
const upload = multer({
    storage: storage,
    limits: {
        fieldSize:1024*1024 * 5,
    },
})

// ROUTES

// INDEX Profile Page
router.get("/", authenticated, userCtrl.users.userHome);
//Favorite games page
router.get("/favorites/:id", authenticated, userCtrl.users.showFav);
//Add favorites page
router.get("/addfavorites/:id", authenticated, userCtrl.users.editFav);
// LOGIN Login Page
router.get('/login', notAuthenticated, userCtrl.users.loginPage);
// CREATE New User Page
router.get('/create', notAuthenticated, userCtrl.users.newUser);
// LOGIN Post Handling
router.post('/login', notAuthenticated, passport.authenticate("local", {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: 'Wrong Username or Password',
})
);
//Add game to favorites
router.post("/addfavorites/:id", authenticated, userCtrl.users.addFav);
// CREATE New User Post Handling
router.post('/create', notAuthenticated, upload.single('pfImg'), userCtrl.users.createAccount);
//Remove game from favorites
router.delete("/addfavorites/:id", authenticated, userCtrl.users.removeFav);
// LOGOUT User Delete Handling
router.delete('/logout', userCtrl.users.logoutUser);


module.exports = router;
   