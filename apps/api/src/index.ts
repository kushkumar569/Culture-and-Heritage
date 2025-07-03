require('dotenv').config();
const express = require("express");
const SignupUser = require("./Signup");
const LoginUser = require("./Login");
const verifyEmail = require("./VerifyEmail");
const googleSignup = require("./SignupGoogle");

const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

app.use("api/signup", SignupUser);
app.use("api/login", LoginUser);
app.use("api/verifyEmail", verifyEmail);
app.use("api/googleSignup",googleSignup);

app.listen(process.env.PORT, () => {
    console.log(`APIs is running on http://localhost:${process.env.PORT}`);
});
