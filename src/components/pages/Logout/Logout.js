import { useDispatch } from 'react-redux';
import { logoutUser } from 'redux/auth/operations';
import s from '../Logout/Logout.module.css';

export const Logout = () => {
  const dispatch = useDispatch();

  return (
    <>
      <button
        className={s.btn}
        type="button"
        onClick={() => dispatch(logoutUser())}
      >
        Logout
      </button>
    </>
  );
};