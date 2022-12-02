import { NavLink, Outlet } from 'react-router-dom';
import AuthNav from 'components/AuthNav/AuthNav';
import UserMenu from 'components/UserMenu/UserMenu';
import { useSelector } from 'react-redux';
import s from '../Header/Header.module.css';
import videoLayout from '../../img/preview.mp4';

export const Header = () => {
  const isloggedIn = useSelector(state => state.userSlice.isloggedIn);

  return (
    <>
      <header className={s.header}>
        <NavLink to="/" className={s.home}>
          Home
        </NavLink>
        {isloggedIn ? <UserMenu /> : <AuthNav />}
      </header>
      <main className={s.main}>
        <Outlet />
        <div id="video-bg">
          <video
            className={s.video}
            src={videoLayout}
            autoPlay
            muted
            loop
          ></video>
        </div>
      </main>
    </>
  );
};