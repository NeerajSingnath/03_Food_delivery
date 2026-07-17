import axios from 'axios';
import { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StoreContext } from '../context/StoreContext';
import { setItemsInMyCity, setLoading } from '../redux/user.slice';

function useGetItemByCity() {
  const { serverUrl } = useContext(StoreContext);
  const { city } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  console.log(city);
  useEffect(() => {
    if (!city) return;
    const fetchShop = async () => {
      console.log('here');
      try {
        dispatch(setLoading(true));
        const result = await axios.get(
          `${serverUrl}/api/item/get-by-city/${city}`,
          {
            withCredentials: true,
          },
        );
        // console.log(result.data);
        if (result.data?.success) {
          console.log(result);
          const allItems = result.data.items || [];
          dispatch(setItemsInMyCity(allItems));
        }
        dispatch(setLoading(false));
      } catch (error) {
        console.log(error);
        dispatch(setLoading(false));
      }
    };

    fetchShop();
  }, [city]);
}

export default useGetItemByCity;
