import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import useGetCurrentUser from './hooks/useGetCurrentUser';
import ForgotPassword from './pages/ForgotPassword';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

function App() {
  const userData = useSelector((state) => state.user.data);
  useGetCurrentUser();
  return (
    <Routes>
      {userData ? (
        <Route path="/" element={<Home />} />
      ) : (
        <Route path="/" element={<SignIn />} />
      )}
      {!userData && <Route path="/signup" element={<SignUp />} />}
      {!userData && <Route path="/signin" element={<SignIn />} />}
      {!userData && (
        <Route path="/forgot-password" element={<ForgotPassword />} />
      )}
    </Routes>
  );
}

export default App;
