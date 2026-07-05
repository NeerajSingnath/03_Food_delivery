import axios from 'axios';
import { useContext, useState } from 'react';
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

  const handleSendOtp = async () => {
    try {
      setLoading(true);
      const res = await axios.post(`${serverUrl}/api/auth/send-otp`, { email });
      console.log(res);
      setStep(2);
    } catch (error) {
      setErr(error.response.data.message);
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
            <button
              className={`w-full font-semibold py-2 rounded-lg transition duration-200 bg-[${primaryColor}] text-white hover:bg-[#e64323] cursor-pointer`}
              onClick={() => null}
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
              onClick={() => null}
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
