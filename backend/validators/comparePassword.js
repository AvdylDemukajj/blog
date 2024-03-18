const bcrypt = require("bcryptjs");

const comparePassword = (pasword, hashedPassword) => {
  return bcrypt.compare(pasword, hashedPassword);
};

module.exports = comparePassword;
