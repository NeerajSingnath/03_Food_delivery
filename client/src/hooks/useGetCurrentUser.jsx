import axios from 'axios';
import { useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { StoreContext } from '../context/StoreContext';
import { setLoading, setUserData } from '../redux/user.slice';

function useGetCurrentUser() {
  const { serverUrl } = useContext(StoreContext);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axios.get(
          `${serverUrl}/api/user/get-current-user`,
          {
            withCredentials: true,
          },
        );

        // console.log(result.data);
        dispatch(setUserData(result.data.user));
        dispatch(setLoading(false));
      } catch (error) {
        console.log(error);
        dispatch(setLoading(false));
      }
    };

    fetchUser();
  }, [serverUrl]);
}

export default useGetCurrentUser;
