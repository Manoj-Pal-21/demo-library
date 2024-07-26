import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getCookie } from '../utils/Cookie';
import { resetRedux } from '../redux/store';

const PrivateRoute = ({ element }) => {
  const token = getCookie("token");
  const navigate = useNavigate();
  const location = useLocation();


  useEffect(() => {
    if (token) {
      if (['/sign-up', '/sign-in']?.includes(location.pathname))
        navigate("/");
    } else {
      resetRedux();
      navigate("/sign-in")
    };
  }, [])

  return element;
}

export default PrivateRoute
