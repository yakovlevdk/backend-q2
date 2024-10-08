const cors = require("cors");
const express = require("express");
const cookieParser = require("cookie-parser");
const chalk = require("chalk");
const path = require("path");
const mongoose = require("mongoose");
const { getRequests, addRequest } = require("./controllers/request-controller");
const { loginUser } = require("./controllers/user-controller");
const port = 3000;
const app = express();
const auth = require("./middlewares/auth");
app.set("view engine", "ejs");
app.set("views", "pages");
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.static(path.resolve(__dirname, "public")));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.post("/user", async (req, res) => {
  const token = await loginUser(req.body.email, req.body.password);
  res.cookie("token", token, {
    httpOnly: true,
  });
  res.status(200).json({ message: "Logged in successfully" });
});

app.post("/requests", async (req, res) => {
  await addRequest(req.body);
});
app.use(auth);

app.get("/requests", async (req, res) => {
  const requests = await getRequests();
  res.json(requests);
});

app.post("/logout", async (req, res) => {
  res.cookie("token", "");
  return res.status(401).json({ message: "Unauthorized" });
});
mongoose
  .connect(
    "mongodb+srv://yakovlevdk39:lasos2281@cluster0.0k8rc.mongodb.net/db?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(async () => {
    app.listen(port, () => {
      console.log(chalk.green(`Server has been started on port ${port}`));
    });
  });
