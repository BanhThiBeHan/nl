const config = require("../config");
const User = require("../models/user.models");
const Role = require("../models/role.models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = (req, res, next) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    name: req.body.name,
    password: bcrypt.hashSync(req.body.password, 8),
  });
  user.save((err, user, next) => {
    if (err) {
      return next(
        res.status(500).json({ Message: `${err} ` })
      )
    }
    if (req.body.roles) {
      Role.find({ name: { $in: req.body.roles } }, (err, roles) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        user.roles = roles.map(role => role._id);
        console.log(user.roles);
        user.save(err => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          res.send({ message: "Đăng kí tài khoản thành công!!" });
        });
      }
      );
    } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        user.roles = [role._id];
        user.save(err => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          res.send({ message: "Đăng kí tài khoản thành công!" });
        });
      });
    }
  });
};
exports.signin = (req, res) => {
  User.findOne({
    username: req.body.username
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (!user) {
        return res.status(404).send({ message: "không tìm thấy user!!" });
      }
      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password,
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "mật khẩu không đúng!"
        });
      }
      const token = jwt.sign({ id: user.id }, config.jwt.secret, {
        expiresIn: config.jwt.tokenLife
      });
      const authorities = [];
      for (let i = 0; i < user.roles.length; i++) {
        authorities.push(user.roles[i].name);
      }
      console.log(user);
      res.status(200).send({
        id: user._id,
        name: user.name,
        roles: authorities,
        accessToken: token,
        avatar_Url: user.avatar_Url,
      });
    });
};