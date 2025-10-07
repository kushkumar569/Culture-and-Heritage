require('dotenv').config();
const express = require("express");
const SignupUser = require("./Signup");
const LoginUser = require("./Login");
const verifyEmail = require("./VerifyEmail");
const googleSignup = require("./SignupGoogle");
const googleLogin = require("./LoginGoogle");
const {searchPlaceRouter: searchPlace} = require("./searchPlace");
const profile = require("./Profile");
const registration = require("./registration");
const profileDetail = require("./profileDetails");

const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/signup", SignupUser);
app.use("/api/login", LoginUser);
app.use("/api/verifyEmail", verifyEmail);
app.use("/api/googleSignup",googleSignup);
app.use("/api/googleLogin", googleLogin);
app.use("/api/search", searchPlace);
app.use("/api/user/profile", profile);
app.use("/api/registration", registration);
app.use("/api/user/details", profileDetail);

app.listen(process.env.PORT, () => {
    console.log(`APIs is running on http://localhost:${process.env.PORT}`);
});
