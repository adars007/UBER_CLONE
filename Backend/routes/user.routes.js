import express from "express";
import { body } from "express-validator";
import { registerUser, logInUser, getUserProfile,logoutUser } from "../controllers/user.controller.js";
import {authUser} from "../middlewares/auth.middleware.js";

const router = express.Router();
router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("First name should be atleast 3 char long"),
    body("fullname.lastname")
      .isLength({ min: 3 })
      .withMessage("First name should be atleast 3 char long"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Passwrd must be greater than 6 long "),
  ],
  registerUser
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password atleast should be of length 6"),
  ],
  logInUser
);

router.get('/profile', authUser, getUserProfile)
router.get('/logout',authUser,logoutUser)

export default router;
