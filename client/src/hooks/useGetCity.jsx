import axios from 'axios';
import { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StoreContext } from '../context/StoreContext';
import { setCity, setCurrentAddress, setState } from '../redux/user.slice';

function useGetCity() {
  const { serverUrl } = useContext(StoreContext);
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${import.meta.env.VITE_GEO_API_KEY}`;
        const res = await axios.get(url);
        const city = res?.data?.results[0].district;
        const state = res?.data?.results[0]?.state;
        const address = res?.data?.results[0].address_line1;

        dispatch(setCity(city));
        dispatch(setState(state));
        dispatch(setCurrentAddress(address));
      },
      (err) => {
        console.log(err);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    );
  }, [userData]);
}

export default useGetCity;
