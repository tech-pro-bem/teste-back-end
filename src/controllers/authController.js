const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const AdminSchema = require('../models/adminSchema');

const SECRET = process.env.SECRET

const login = (req, res) => {
  try {
    const validateLogin = AdminSchema.findOne(
      { email: req.body.email },
      (error, admin) => {
        if (!admin) {
          return res.status(401).json({
            message: 'It was not possible to login',
            details:
              'Check your e-mail and password before trying to login again',
          });
        }
        const validPassword = bcrypt.compareSync(
          req.body.password,
          admin.password,
        );

        if (!validPassword) {
          return res.status(401).json({
            message: 'It was not possible to login',
            details:
              'Check your e-mail and password before trying to login again',
          });
        }
        if (error) {
          res.status(500).json({ message: error.message });
        }
        const token = jwt.sign({ adminEmail: admin.email }, SECRET);

        return res.status(200).json({
          message: 'Login authorized.',
          email: admin.email,
          token,
        });
      },
    );
    return validateLogin;
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  login,
};
