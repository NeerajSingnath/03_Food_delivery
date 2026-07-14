import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StoreContext } from '../context/StoreContext';
import { setMyShopData } from '../redux/owner.slice';

function useGetMyShop() {
  const [loading, setLoading] = useState(true);
  const { myShopData } = useSelector((state) => state.owner);

  const { serverUrl } = useContext(StoreContext);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchShop = async () => {
      try {
        const result = await axios.get(`${serverUrl}/api/shop/my-shop`, {
          withCredentials: true,
        });

        if (result.data.success) {
          console.log(result.data.shop);
          dispatch(setMyShopData(result.data.shop));
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
