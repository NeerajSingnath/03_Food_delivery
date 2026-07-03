import User from '../models/user.model.js';

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

    const createdUser = await User.create({
      fullName,
      email,
      password: hashPassword,
      mobile,
      role,
    });

    const token = generateToken(createdUser._id);

    return res
      .status(201)
      .json({ message: 'User created successfully', user: createdUser, token });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
};

const signIn = async (req, res) => {};

const sendOtp = async (req, res) => {};

const verifyOtp = async (req, res) => {};

const resetPassword = async (req, res) => {};

export default { signUp, signIn, sendOtp, verifyOtp, resetPassword };
