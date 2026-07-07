import jwt from 'jsonwebtoken';

const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(400).json({ message: 'user not authorized' });
    }

    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!verifiedToken) {
      return res.status(400).json({ message: 'user not authorized' });
    }

    req.userId = verifiedToken.id;
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ message: `user not authorized ${error.message}` });
  }
};
export { isAuth };
