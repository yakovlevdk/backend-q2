const User = require("../models/User");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "test";
async function loginUser(email, password) {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Пользователь не найден");
  }
  const isPasswordCorrect = password === user.password;
  if (!isPasswordCorrect) {
    throw new Error("Неправильный пароль");
  }
  return jwt.sign({ email }, JWT_SECRET, { expiresIn: "1d" });
}

module.exports = { loginUser };
