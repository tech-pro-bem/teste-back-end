const jwt = require('jsonwebtoken');

const SECRET = process.env.SECRET;

exports.checkAuth = async (req, res, next) => {
  const authHeader = req.get('Authorization');
  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).send('Header error');
  }
  try {
    jwt.verify(token, SECRET, (error) => {
      if (error) {
        return res.status(403).send('unauthorized');
      }
      return token;
    });
    return next();
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
