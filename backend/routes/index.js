const express = require("express");
const router = express.Router();

const userRouter = require("./user");
const accountRouter = require("./account");

router.get("/user",userRouter);
router.get("/account", accountRouter);

module.exports = router;