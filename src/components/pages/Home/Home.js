import s from '../Home/Home.module.css';
import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <>
      <h1 className={s.title}>Wellcome to Phonebook service</h1>
      <p className={s.subTitle}>
      please <Link to="/login">login</Link> or{' '}
          <Link to="/registration">register</Link> to use
      </p>
    </>
  );
};