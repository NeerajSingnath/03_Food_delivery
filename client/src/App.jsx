import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import useGetCity from './hooks/useGetCity';
import useGetCurrentUser from './hooks/useGetCurrentUser';
import useGetMyShop from './hooks/useGetMyShop';
import ForgotPassword from './pages/ForgotPassword';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
function App() {
  const { userData, loading } = useSelector((state) => state.user);
  useGetCurrentUser();
  useGetCity();
  useGetMyShop();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600">
          <ClipLoader />
        </div>
      </div>
    );
  }

  return (
    <Routes>
      <Route
        path="/"
        element={userData ? <Home /> : <Navigate to={'/signin'} />}
      />
      <Route
        path="/signup"
        element={!userData ? <SignUp /> : <Navigate to={'/'} />}
      />
      <Route
        path="/signin"
        element={!userData ? <SignIn /> : <Navigate to={'/'} />}
      />
      <Route
        path="forgot-password"
        element={userData ? <Home /> : <ForgotPassword />}
      />
    </Routes>
  );
}

export default App;
