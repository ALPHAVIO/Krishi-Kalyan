const express = require('express')
const router = new express.Router()
const User = require('model/farmer') /*Loading user model */

router.get('/register', async (req, res) => {
	res.render('register')
})

router.post("/register", async (req, res) => {
  User.findOne({ username: req.body.username }, async (err, user) => {
    if (user) {
      return res.render("login", {
        message: "Already an existing user"
      });
    } else {
      const user = new User(req.body);
      try {
        await user.save();
        const token = await user.generateAuthToken();
        res.cookie("jwt", token);
        res.redirect("/home");
      } catch (e) {
        console.log(e);
        res.redirect("/register");
      }
    }
  });
});

module.exports = router