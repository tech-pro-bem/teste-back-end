const bcrypt = require('bcryptjs');

const salt = bcrypt.genSaltSync(10);

const encrypt = (password) => {
  return bcrypt.hashSync(password, salt);
}

const verifyPassword = (password, hash) => {
  return bcrypt.compareSync(password, hash);
}

module.exports = {
  encrypt, verifyPassword
}