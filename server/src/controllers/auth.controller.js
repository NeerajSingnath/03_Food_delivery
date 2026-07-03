import bcrypt from 'bcrypt';
import User from '../models/user.model.js';
import generateToken from '../utils/token.js';

const signUp = async (req, res) => {
  try {
    const { fullName, email, password, mobile, role } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'Email and password are required' });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: 'Password must be at least 6 characters long' });
    }

    if (mobile.length !== 10) {
      return res
        .status(400)
        .json({ message: 'Mobile number must be 10 digits long' });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    user = await User.create({
      fullName,
      email,
      password: hashPassword,
      mobile,
      role,
    });

    const token = await generateToken(user._id);

    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res
      .status(201)
      .json({ message: 'User created successfully', user: user, token });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `SignUp failed ${error.message}`, success: false });
  }
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'user does not exist' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'invalid password' });
    }

    const token = await generateToken(user._id);

    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res
      .status(201)
      .json({ message: 'User signed in successfully', user: user, token });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `SignUp failed ${error.message}`, success: false });
  }
};

const signOut = async (req, res) => {
  try {
    res.clearCookie('token');
    return res.status(200).json({ message: 'User signed out successfully' });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `SignOut failed ${error.message}`, success: false });
  }
};

const sendOtp = async (req, res) => {};

const verifyOtp = async (req, res) => {};

const resetPassword = async (req, res) => {};

export { resetPassword, sendOtp, signIn, signOut, signUp, verifyOtp };
