
const uuid = require("uuid");
const HttpError = require("../model/http-error");
const {validationResult}=require('express-validator')
const dummy_user = [
  {
    id: "u1",
    name: "savitha",
    email: "savithamurthy456@gmail.com",
    password: "test@123",
  },
];

const getUsers = (req, res, next) => {
  res.json({ users: dummy_user });
};
const signUp = (req, res, next) => {
  const errors=validationResult(req);
  if(!errors.isEmpty()){
    console.log(errors);
    throw new HttpError('Invalid input,Please check your data',422)
  }
  const { name, email, password } = req.body;
  const users = {
    id: uuid.v4(),
    name,
    email,
    password,
  };
  dummy_user.push(users);
  res.status(201).json({user:users})
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  const identifyuser = dummy_user.find((u) => u.email === email);
  if (!identifyuser) {
    throw new HttpError("Invalid user", 401);
  }
  res.json({ message: "Logged in" });
};

exports.login = login;
exports.signUp = signUp;
exports.getUsers = getUsers;
