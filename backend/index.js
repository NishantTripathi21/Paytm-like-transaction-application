const express = require("express");
const mainRouter = require("./routes/index");
const app = express();

app.use(cors());
app.use(express.json()); 

app.use("/api/v1/user", mainRouter);

app.use("/api/v1/account", mainRouter);

app.listen(3000);