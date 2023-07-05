const expres = require("express");
const userController = require("../controller/user-controller");
const router = expres.Router();
const { check } = require("express-validator");

router.get("/", userController.getUsers);

router.post(
  "/signup",
  [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({min:6}),
  ],
  userController.signUp
);

router.post("/login", userController.login);

module.exports = router;
