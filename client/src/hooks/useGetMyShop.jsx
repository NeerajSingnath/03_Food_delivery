import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { StoreContext } from '../context/StoreContext';

function useGetMyShop() {
  const [myShopData, setMyShopData] = useState(null);
  const [loading, setLoading] = useState(true);

  const { serverUrl } = useContext(StoreContext);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchShop = async () => {
      try {
        const result = await axios.get(`${serverUrl}/api/shop/my-shop`, {
          withCredentials: true,
        });

        if (result.data.success) {
          console.log(result);
          dispatch(setMyShopData(result.data));
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchShop();
  }, [serverUrl]);

  return { myShopData, loading };
}

export default useGetMyShop;
