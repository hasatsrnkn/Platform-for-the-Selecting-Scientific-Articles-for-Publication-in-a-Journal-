const crypto = require('crypto');
const nodemailer = require('nodemailer');
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

exports.signUp = (req, res, next) => {
  const name = req.body.name;
  const surname = req.body.surname;
  const email = req.body.email;
  const password = req.body.password;
  const username = req.body.username;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(422).json({ message: errors.array()[0].msg });
  }

  bcrypt.hash(password, 12).then((hashedPassword) => {
    User.create({
      name: name,
      surname: surname,
      email: email,
      password: hashedPassword,
      username: username,
    })
      .then((user) => {
        console.log("User created successfully");
        return res
          .status(201)
          .json({ message: "User created!", userId: user.idUser });
      })
      .catch((err) => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
      });
  });
};

exports.login = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  let loadedUser;

  User.findOne({ where: { username: username } })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ message: "No User Found!" });
      }
      loadedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then((isEqual) => {
      if (!isEqual) {
        return res.status(401).json({ message: "Wrong Password!" });
      }
      const token = jwt.sign(
        {
          username: loadedUser.username,
          userId: loadedUser.idUser,
          role: loadedUser.role,
        },
        "somesupersecretsecret",
        { expiresIn: "1h" }
      );
      return res.status(200).json({
        token: token,
        userId: loadedUser.idUser.toString(),
        role: loadedUser.role,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getProfile = (req, res, next) => {
  const userId = req.params.userId;
  console.log(userId);
  User.findByPk(userId)
    .then((user) => {
      if (!user) {
        const error = new Error("Could not find user.");
        error.statusCode = 404;
        throw error;
      }
      console.log(user);
      res.status(200).json({ message: "User fetched.", user: user });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.postReset = (req, res, next) => {   // should be called wnen the button "send email" clicked
  
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
    }
    const token = buffer.toString('hex');
    console.log(token);
    User.findOne({ where: { email: req.body.email } })
      .then(user => {
        if (!user) {
          //req.flash('error', 'No account with that email found.');
        }
        //user.resetToken = token;
       // user.resetTokenExpiration = Date.now() + 3600000;
        user.update({resetToken: token, resetTokenExpiration: Date.now() + 3600000});
        console.log('test');
        res.redirect('/');
        transporter.sendMail({
          to: req.body.email,
          from: 'Review Platform',
          subject: 'Password reset',
          html: `
            <p>You requested a password reset</p>
            <p>Click this <a href="http://localhost:3000/${token}">link</a> to set a new password.</p>
          `
        });
      })
      .catch(err => {
        console.log(err);
      });
  });
};

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
      user: 'admreviewplatform@gmail.com',
      pass: 'jntrenqiiloxsiqa',
  },
  });


  exports.getNewPassword = (req, res, next) => {   // should be followed by the link from the email
    const token = req.params.token;
    User.findOne({ resetToken: token, resetTokenExpiration: { $gt: Date.now() } })
      .then(user => {
        return res.status(200).json({
          userId: user.idUser.toString(),
        });
      })
      .catch(err => {
        console.log(err);
      });
  };


  exports.postNewPassword = (req, res, next) => {  // should be called when "reset" button clicked on page "new password"
    const newPassword = req.body.password; 
    const userId = req.body.idUser;
    const passwordToken = req.body.passwordToken;
    let resetUser;
  
    User.findOne({
      resetToken: passwordToken,
      resetTokenExpiration: { $gt: Date.now() },
      idUser: userId
    })
      .then(user => {
        resetUser = user;
        return bcrypt.hash(newPassword, 12);
      })
      .then(hashedPassword => {
        resetUser.password = hashedPassword;
        resetUser.resetToken = undefined;
        resetUser.resetTokenExpiration = undefined;
        return resetUser.save();
      })
      .then(result => {
        res.redirect('/login');
      })
      .catch(err => {
        console.log(err);
      });
  };