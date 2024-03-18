const bcrypt = require("bcrypt");

const comparePassword = (pasword, hashedPassword) => {
  return bcrypt.compare(pasword, hashedPassword);
};

module.exports = comparePassword;
