import bcrypt from 'bcrypt';
import User from '../models/user.model.js';
import sendMail from '../utils/mail.js';
import generateToken from '../utils/token.js';

const signUp = async (req, res) => {
  try {
    const { fullName, email, password, mobile, role } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
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

    const user = await User.create({
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

const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'user not found' });
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.resetOtp = otp;
    user.otpExpires = Date.now() + 5 * 60 * 1000;
    user.isOtpVerified = false;
    await user.save();

    await sendMail(user.email, otp);

    return res.status(200).json({ message: 'otp sent successfully ' });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Failed to send OTP ${error.message}` });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'user not found' });
    }
    if (user.resetOtp !== otp) {
      return res.status(400).json({ message: 'invalid OTP' });
    }
    if (user.otpExpires < Date.now()) {
      return res.status(400).json({ message: 'OTP has expired' });
    }

    user.isOtpVerified = true;
    user.resetOtp = undefined;
    user.otpExpires = undefined;
    await user.save();

    return res.status(200).json({ message: 'OTP verified successfully' });
  } catch (error) {
    return res.status(500).json({ message: `verify otp error ${error}` });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'user not found' });
    }
    if (!user.isOtpVerified) {
      return res.status(400).json({ message: 'OTP not verified' });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    user.password = hashPassword;
    user.isOtpVerified = false;

    await user.save();
    return res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Failed to reset password ${error.message}` });
  }
};

const googleAuth = async (req, res) => {
  try {
    const { fullName, email, mobile, role } = req.body;
    let user = await User.findOne({ email });

    if (!user) {
      if (!fullName || !mobile || !role) {
        return res.status(400).json({
          message:
            'Account does not exist. Please sign up first using the Registration page.',
        });
      }

      user = await User.create({
        fullName,
        email,
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
    }

    const token = await generateToken(user._id);
    res.cookie('token', token, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res
      .status(200)
      .json({ message: 'User signed in successfully', user: user, token });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Server side error google auth ${error.message}` });
  }
};

export {
  googleAuth,
  resetPassword,
  sendOtp,
  signIn,
  signOut,
  signUp,
  verifyOtp,
};
