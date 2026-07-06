import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { StoreContext } from '../context/StoreContext';

function ForgotPassword() {
  const { serverUrl, primaryColor, bgColor, borderColor } =
    useContext(StoreContext);
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [err, setErr] = useState('');
  const [timer, setTimer] = useState(0);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    if (!err) return;
    const timer = setTimeout(() => setErr(''), 5000);
    return () => clearTimeout(timer);
  }, [err]);

  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);

    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    if (!successMsg) return;
    const timer = setTimeout(() => {
      setSuccessMsg('');
      setTimer(60);
    }, 2000);
    return () => clearTimeout(timer);
  }, [successMsg]);

  const handleSendOtp = async () => {
    if (step === 2 && (timer > 0 || successMsg)) return;
    try {
      setLoading(true);
      const res = await axios.post(
        `${serverUrl}/api/auth/send-otp`,
        { email },
        { withCredentials: true },
      );
      console.log(res);

      if (step === 1) {
        setStep(2);
        setTimer(30);
      } else if (step === 2) {
        setSuccessMsg('Otp sent successfully');
      }
    } catch (error) {
      setErr(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${serverUrl}/api/auth/verify-otp`,
        { email, otp },
        { withCredentials: true },
      );
      console.log(res);
      setTimer(0);
      setSuccessMsg('OTP verified successfully');

      setStep(3);
    } catch (error) {
      setErr(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${serverUrl}/api/auth/reset-password`,
        { email, password: newPassword },
        { withCredentials: true },
      );
      console.log(res);

      setStep(1);
      navigate('/signin');
    } catch (error) {
      setErr(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex w-full items-center justify-center min-h-screen p-4"
      style={{ backgroundColor: bgColor }}
    >
      <div
        className="bg-white rounded-xl shadow-lg w-full max-w-md p-8"
        style={{ border: `1px solid ${borderColor}` }}
      >
        <div className="flex items-center  gap-4 mb-4">
          <IoIosArrowRoundBack
            size={30}
            className={`text-[${primaryColor}] cursor-pointer`}
            onClick={() => navigate('/signin')}
          />
          <h1
            className={`text-2xl font-bold text-center text-[${primaryColor}]`}
          >
            Forgot Password
          </h1>
        </div>
        {step == 1 && (
          <div>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-1"
              >
                Email
              </label>
              <input
                type="email"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none  "
                placeholder="Enter your Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
            </div>
            <button
              className={`w-full font-semibold py-2 rounded-lg transition duration-200 bg-[${primaryColor}] text-white hover:bg-[#e64323] cursor-pointer`}
              onClick={handleSendOtp}
              disabled={loading}
            >
              {loading ? <ClipLoader size={20} color="white" /> : 'Send Otp'}
            </button>
            {err && <p className="text-red-500 text-center my-2.5">*{err}</p>}
          </div>
        )}

        {step == 2 && (
          <div>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-1"
              >
                OTP
              </label>
              <input
                type="email"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none  "
                placeholder="Enter OTP"
                onChange={(e) => setOtp(e.target.value)}
                value={otp}
                required
              />
            </div>
            <div className="text-right mb-4">
              {successMsg ? (
                <span className="text-green-600 font-semibold">
                  {successMsg}
                </span>
              ) : timer > 0 ? (
                <span className="text-gray-400 font-medium cursor-not-allowed">
                  Resend Otp {timer}s
                </span>
              ) : (
                <span
                  className="cursor-pointer font-medium hover:underline"
                  style={{ color: primaryColor }}
                  onClick={handleSendOtp}
                >
                  Resend Otp
                </span>
              )}
            </div>
            <button
              className={`w-full font-semibold py-2 rounded-lg transition duration-200 bg-[${primaryColor}] text-white hover:bg-[#e64323] cursor-pointer`}
              onClick={handleVerifyOtp}
              disabled={loading}
            >
              {loading ? <ClipLoader size={20} color="white" /> : 'Verify'}
            </button>
            {err && <p className="text-red-500 text-center my-2.5">*{err}</p>}
          </div>
        )}
        {step == 3 && (
          <div>
            <div className="mb-6">
              <label
                htmlFor="newPassword"
                className="block text-gray-700 font-medium mb-1"
              >
                New Password
              </label>
              <input
                type="email"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none  "
                placeholder="Enter New Password"
                onChange={(e) => setNewPassword(e.target.value)}
                value={newPassword}
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="ConfirmPassword"
                className="block text-gray-700 font-medium mb-1"
              >
                Confirm Password
              </label>
              <input
                type="email"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none  "
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                required
              />
            </div>
            <button
              className={`w-full font-semibold py-2 rounded-lg transition duration-200 bg-[${primaryColor}] text-white hover:bg-[#e64323] cursor-pointer`}
              onClick={handleResetPassword}
              disabled={loading}
            >
              {loading ? (
                <ClipLoader size={20} color="white" />
              ) : (
                'Reset Password'
              )}
            </button>
            {err && <p className="text-red-500 text-center my-2.5">*{err}</p>}
          </div>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
