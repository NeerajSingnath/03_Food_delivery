import axios from 'axios';
import { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StoreContext } from '../context/StoreContext';
import { setLoading, setShopInMyCity } from '../redux/user.slice';

function useGetShopByCity() {
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
          `${serverUrl}/api/shop/get-shops-by-city/${city}`,
          {
            withCredentials: true,
          },
        );
        // console.log(result.data);
        if (result.data?.success) {
          console.log(result);
          const shops = result.data.shops || [];
          dispatch(setShopInMyCity(shops));
          // Extract all items from shops in my city
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

export default useGetShopByCity;
